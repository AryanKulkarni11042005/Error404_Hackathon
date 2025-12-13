import os
import json
import re
import asyncio
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# --- CONFIGURATION ---
BASE_URL = "https://openrouter.ai/api/v1/chat/completions"

# Keys for load balancing
API_KEY_1 = os.getenv("key_1")
API_KEY_2 = os.getenv("key_2")
REF_KEY = os.getenv("ref_key")

# Models
SMART_MODEL = "meta-llama/llama-3.3-70b-instruct:free" 
REFEREE_MODEL = "openai/gpt-oss-20b:free"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DATA MODELS ---

class CompetitionRequest(BaseModel):
    prompt: str
    model_1: str
    model_2: str

class CampaignRequest(BaseModel):
    name: str
    founder: str
    email: str
    industry: str
    stage: str
    description: str
    askAmount: str
    equity: float

# --- HELPERS ---

def clean_json_text(text):
    """Robustly extracts JSON object or array from text."""
    if not text: return "{}"
    text = re.sub(r"^```[a-zA-Z]*\n", "", text.strip())
    text = re.sub(r"\n```$", "", text)
    
    match_obj = re.search(r"(\{.*\})", text, re.DOTALL)
    match_arr = re.search(r"(\[.*\])", text, re.DOTALL)
    
    if match_obj: return match_obj.group(1)
    if match_arr: return match_arr.group(1)
    return text

async def fetch_with_key(client, api_key, model, messages, retries=3):
    """
    Fetches data using a specific API Key with AGGRESSIVE backoff.
    """
    # Debug: Show which key is being used (last 4 chars)
    key_suffix = api_key[-4:] if api_key else "None"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "IdeaForge"
    }
    payload = {
        "model": model,
        "messages": messages,
        "temperature": 0.7,
    }

    for i in range(retries):
        try:
            print(f"🔄 [Key ...{key_suffix}] Calling {model} (Attempt {i+1})...")
            response = await client.post(BASE_URL, headers=headers, json=payload, timeout=90.0)
            
            if response.status_code == 200:
                data = response.json()
                if "choices" in data and data["choices"]:
                    print(f"✅ [Key ...{key_suffix}] Success: {model}")
                    return data["choices"][0]["message"]["content"]
                return "Error: Empty response."
            
            elif response.status_code == 429:
                # --- RESTORED: THE 20s TIMER ---
                wait_time = (i + 1) * 20  # Waits 20s, 40s, 60s
                print(f"⚠️ Rate limit (429) on [Key ...{key_suffix}]. Cooling down for {wait_time}s...")
                await asyncio.sleep(wait_time)
                continue
            
            else:
                print(f"❌ HTTP Error {response.status_code}: {response.text}")
                return f"Error HTTP {response.status_code}: {response.text}"

        except Exception as e:
            print(f"❌ Connection Error: {e}")
            await asyncio.sleep(5)
    
    return "Error: Request failed after max retries."

# --- ROUTES ---

@app.post("/run-competition")
async def run_competition(request: CompetitionRequest):
    if not API_KEY_1 or not API_KEY_2 or not REF_KEY:
        raise HTTPException(status_code=500, detail="Missing API keys in .env (key_1, key_2, ref_key)")

    async with httpx.AsyncClient() as client:
        print(f"\n🚀 STARTING COMP: {request.model_1} vs {request.model_2}")

        # --- Step 1: Model 1 (Key 1) ---
        res1 = await fetch_with_key(client, API_KEY_1, request.model_1, [{"role": "user", "content": request.prompt}])
        
        # Fallback Check
        if res1.startswith("Error"):
            print(f"⚠️ Model 1 Failed. Using fallback text.")
            res1 = "Could not generate idea due to API error."

        # Safety Buffer between models
        print("⏳ Waiting 5s buffer...")
        await asyncio.sleep(5)

        # --- Step 2: Model 2 (Key 2) ---
        res2 = await fetch_with_key(client, API_KEY_2, request.model_2, [{"role": "user", "content": request.prompt}])
        
        if res2.startswith("Error"):
            print(f"⚠️ Model 2 Failed. Using fallback text.")
            res2 = "Could not generate idea due to API error."

        # Safety Buffer before Referee
        print("⏳ Waiting 5s buffer...")
        await asyncio.sleep(5)

        # --- Step 3: Referee (Ref Key) ---
        ref_prompt = f"""
        Act as a Venture Capitalist Judge. 
        Evaluate these two startup pitches based on the User Prompt: "{request.prompt}"

        === PITCH 1 ({request.model_1}) ===
        {res1[:3000]}

        === PITCH 2 ({request.model_2}) ===
        {res2[:3000]}

        INSTRUCTIONS:
        1. Compare them on Innovation, Market Potential, and Feasibility.
        2. Assign scores (0-10).
        3. Pick a winner.
        4. Output ONLY valid JSON.

        JSON Structure:
        {{
            "evaluations": {{
                "{request.model_1}": {{ "scores": {{ "innovation": 0, "market": 0, "feasibility": 0 }}, "total_score": 0, "justification": "Short summary" }},
                "{request.model_2}": {{ "scores": {{ "innovation": 0, "market": 0, "feasibility": 0 }}, "total_score": 0, "justification": "Short summary" }}
            }},
            "winner_model": "{request.model_1}"
        }}
        """
        
        print(f"⚖️ Referee ({REFEREE_MODEL}) is Judging...")
        ref_raw = await fetch_with_key(client, REF_KEY, REFEREE_MODEL, [{"role": "user", "content": ref_prompt}])
        
        try:
            if ref_raw.startswith("Error"):
                raise Exception("Referee API Error")
            clean_json = clean_json_text(ref_raw)
            ref_data = json.loads(clean_json)
            print("✅ Referee JSON Parsed Successfully")
        except Exception as e:
            print(f"❌ Referee Logic Failed: {e}")
            ref_data = {
                "evaluations": {}, 
                "winner_model": "Unknown (Referee Error)", 
                "raw_output": ref_raw
            }

    return {
        "contestant_outputs": [
            {"model": request.model_1, "idea": res1, "market": "", "competitor": "", "risk": ""},
            {"model": request.model_2, "idea": res2, "market": "", "competitor": "", "risk": ""}
        ],
        "referee": ref_data
    }

# --- CAMPAIGN ROUTES ---

@app.post("/generate-deck")
async def generate_deck(campaign: CampaignRequest):
    if not API_KEY_1:
        raise HTTPException(status_code=500, detail="Missing API_KEY_1")

    prompt = f"""
    Act as a professional startup consultant. 
    Create a 10-slide Pitch Deck Outline for: {campaign.name} ({campaign.industry}).
    Description: {campaign.description}
    Ask: {campaign.askAmount} for {campaign.equity}% equity.

    Provide 3 bullet points per slide. Format as clear text.
    """

    async with httpx.AsyncClient() as client:
        deck_content = await fetch_with_key(client, API_KEY_1, SMART_MODEL, [{"role": "user", "content": prompt}])

    import base64
    encoded_deck = base64.b64encode(deck_content.encode('utf-8')).decode('utf-8')
    data_uri = f"data:text/plain;charset=utf-8;base64,{encoded_deck}"

    return {"deckUrl": data_uri, "rawContent": deck_content}

@app.post("/match-investors")
async def match_investors(campaign: CampaignRequest):
    if not API_KEY_2:
        raise HTTPException(status_code=500, detail="Missing API_KEY_2")

    prompt = f"""
    Act as an Investment Banker. 
    Identify 5 VC firms (real or realistic fictional personas) for this startup:
    Name: {campaign.name}, Industry: {campaign.industry}, Ask: {campaign.askAmount}.

    Return a JSON object containing an array "investors".
    Each investor needs: "id", "name", "industry", "location", "description", "fitScore" (60-99), "ticketMin", "ticketMax", "reasons" (array of 2 strings).
    Output ONLY valid JSON.
    """

    async with httpx.AsyncClient() as client:
        raw_response = await fetch_with_key(client, API_KEY_2, SMART_MODEL, [{"role": "user", "content": prompt}])

    try:
        clean_json = clean_json_text(raw_response)
        data = json.loads(clean_json)
        investors = data.get("investors", data) if isinstance(data, dict) else data
        return investors
    except Exception as e:
        print(f"❌ Match JSON Failed: {e}")
        return []