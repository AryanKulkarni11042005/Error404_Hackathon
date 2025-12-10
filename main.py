import streamlit as st
import os
import json
import requests
import time
import re

# --- CONFIGURATION ---

# Constants
BASE_URL = "https://openrouter.ai/api/v1/chat/completions"

# 1. VERIFIED Free Model IDs (Updated for reliability)
CONTESTANT_MODELS = [
    "meta-llama/llama-3.3-70b-instruct:free",
    "google/gemma-3-27b-it:free",              # Verified ID for Gemma 2
    "meta-llama/llama-3.3-70b-instruct:free", # Reliable Llama variant
    "openai/gpt-oss-20b:free" # Reliable Microsoft model
]

# 2. The Referee
REFEREE_MODEL = "meta-llama/llama-3.3-70b-instruct:free"

# --- BACKEND LOGIC ---

def clean_json_response(raw_content):
    """Cleans markdown formatting from the LLM response."""
    if not raw_content:
        return "{}"
    content = raw_content.strip()
    # Remove markdown code blocks if present
    content = re.sub(r"^```[a-zA-Z]*\n", "", content)
    content = re.sub(r"\n```$", "", content)
    return content.strip()

def retry_request(payload, headers, max_retries=3):
    """
    Sends a request with retry logic for 429 (Rate Limit) errors.
    """
    for attempt in range(max_retries):
        try:
            response = requests.post(BASE_URL, headers=headers, json=payload)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.HTTPError as e:
            if response.status_code == 429:
                wait_time = (attempt + 1) * 5  # Wait 5s, 10s, 15s
                st.warning(f"⚠️ Rate limit hit. Retrying in {wait_time} seconds... (Attempt {attempt+1}/{max_retries})")
                time.sleep(wait_time)
            else:
                # If it's not a rate limit error (e.g. 400 or 500), fail immediately
                raise e
        except Exception as e:
            raise e
    return None

def call_model(api_key, model_name, prompt, temperature=0.7):
    """Sends a prompt to OpenRouter with retries."""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:8501", 
        "X-Title": "LLM Referee System"
    }
    payload = {
        "model": model_name,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": temperature,
    }
    try:
        data = retry_request(payload, headers)
        if data and "choices" in data and len(data["choices"]) > 0:
            return data["choices"][0]["message"]["content"]
    except Exception as e:
        return f"Error: {str(e)}"
    return "Error: No content returned."

def evaluate_responses(api_key, original_prompt, model_responses):
    """
    Sends responses to the Referee for grading.
    Uses Aliases (Candidate_1, Candidate_2) to prevent JSON key errors.
    """
    aliases = {}
    candidates_text = ""
    
    # Map models to aliases (Candidate_1, Candidate_2)
    for idx, (model_name, response_text) in enumerate(model_responses.items()):
        alias = f"Candidate_{idx+1}"
        aliases[alias] = model_name 
        short_name = model_name.split("/")[1].replace(":free", "")
        candidates_text += f"\n=== {alias} (Model: {short_name}) ===\nRESPONSE:\n{response_text}\n"

    system_instructions = (
        "You are an expert Venture Capitalist acting as a Judge. "
        "Evaluate the startup ideas provided by the candidates. "
        "You MUST return the output strictly as valid JSON."
    )
    
    alias_keys = list(aliases.keys())
    
    rubric_text = f"""
    RUBRIC (0-10 scale): Innovation, Market_Potential, Feasibility, Clarity.
    
    INSTRUCTIONS:
    1. Read the user prompt and the candidate responses.
    2. Score each candidate based on the rubric.
    3. Pick a winner.
    
    REQUIRED OUTPUT JSON FORMAT:
    {{
      "evaluations": {{
        "{alias_keys[0]}": {{
          "scores": {{ "innovation": int, "market_potential": int, "feasibility": int, "clarity": int }},
          "total_score": int,
          "justification": "Short explanation."
        }},
        "{alias_keys[1]}": {{ ... }}
      }},
      "winner_alias": "{alias_keys[0]}" 
    }}
    """
    
    full_prompt = (
        f"Original User Prompt: '{original_prompt}'\n\n"
        f"CANDIDATE RESPONSES:\n{candidates_text}\n\n"
        f"{rubric_text}"
    )

    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    payload = {
        "model": REFEREE_MODEL,
        "messages": [
            {"role": "system", "content": system_instructions},
            {"role": "user", "content": full_prompt}
        ],
        "temperature": 0.2,
        "response_format": {"type": "json_object"} 
    }

    try:
        data = retry_request(payload, headers)
        if data:
            raw_content = data["choices"][0]["message"]["content"]
            cleaned_json = clean_json_response(raw_content)
            evaluation_data = json.loads(cleaned_json)
            
            # Inject real names back into results
            evaluation_data["mapped_results"] = {}
            for alias, result in evaluation_data.get("evaluations", {}).items():
                if alias in aliases:
                    real_name = aliases[alias]
                    evaluation_data["mapped_results"][real_name] = result
            
            # Map winner
            winner_alias = evaluation_data.get("winner_alias", "")
            evaluation_data["winner_real_name"] = aliases.get(winner_alias, "Unknown")
            
            return evaluation_data
    except Exception as e:
        st.error(f"Referee Parsing Error: {e}")
        return {}
    return {}

# --- FRONTEND UI (STREAMLIT) ---

st.set_page_config(page_title="LLM Referee (Free Edition)", page_icon="⚖️", layout="wide")

st.title("⚖️ LLM Referee System (Free Tier)")
st.markdown("Compare startup ideas from **Open-Source Models**, judged by **Gemini 2.0 Flash**.")

# Sidebar
with st.sidebar:
    st.header("Configuration")
    api_key_input = st.text_input("OpenRouter API Key", type="password", value=os.getenv("OPENROUTER_API_KEY", ""))
    st.info("Get your key from [OpenRouter.ai](https://openrouter.ai/)")
    
    st.markdown("### Contestants (Free Tier)")
    for m in CONTESTANT_MODELS:
        st.caption(m)

# Main Input
user_prompt = st.text_area(
    "Enter your Startup Idea Prompt:", 
    value="Give me a SaaS idea for AI-powered urban gardening.",
    height=100
)

if st.button("🚀 Run Competition", type="primary"):
    if not api_key_input:
        st.error("Please enter your OpenRouter API Key in the sidebar.")
    else:
        # 1. Collect Responses
        responses = {}
        progress_bar = st.progress(0)
        status_text = st.empty()
        
        cols = st.columns(len(CONTESTANT_MODELS))
        result_placeholders = {model: st.empty() for model in CONTESTANT_MODELS}

        # Step 1: Query Contestants
        for i, model in enumerate(CONTESTANT_MODELS):
            short_name = model.split("/")[1].replace(":free", "")
            status_text.text(f"Querying {short_name}...")
            
            # API Call
            resp = call_model(api_key_input, model, user_prompt)
            responses[model] = resp
            
            # Update UI
            progress = (i + 1) / (len(CONTESTANT_MODELS) + 1)
            progress_bar.progress(progress)
            
            with result_placeholders[model].container():
                if "Error" in resp:
                    st.error(f"❌ {short_name} failed\n\n{resp}")
                else:
                    st.success(f"✅ {short_name} done")
            
            # Sleep slightly to avoid hitting rate limits instantly between calls
            time.sleep(1.5) 

        # Step 2: Referee Evaluation
        status_text.text(f"⚖️ The Referee ({REFEREE_MODEL.split('/')[1]}) is deliberating...")
        evaluation = evaluate_responses(api_key_input, user_prompt, responses)
        
        progress_bar.progress(100)
        status_text.empty()
        
        # Step 3: Display Results
        if evaluation:
            winner_model = evaluation.get("winner_real_name", "Unknown")
            winner_short = winner_model.split("/")[1].replace(":free", "") if "/" in winner_model else winner_model
            
            st.divider()
            st.markdown(f"### 🏆 The Winner is: **{winner_short}**")
            
            mapped_results = evaluation.get("mapped_results", {})
            
            if mapped_results:
                grid_cols = st.columns(2)
                sorted_results = sorted(
                    mapped_results.items(), 
                    key=lambda x: x[1].get('total_score', 0), 
                    reverse=True
                )

                for idx, (model_key, data) in enumerate(sorted_results):
                    col = grid_cols[idx % 2]
                    short_name = model_key.split("/")[1].replace(":free", "")
                    
                    with col:
                        if model_key == winner_model:
                            st.markdown("#### 🥇 " + short_name)
                        else:
                            st.markdown("#### " + short_name)
                            
                        with st.container(border=True):
                            st.metric("Total Score", f"{data.get('total_score', 0)} / 40")
                            st.caption(f"_{data.get('justification')}_")
                            scores = data.get("scores", {})
                            st.dataframe(scores, use_container_width=True)
                            
                            with st.expander("See Generated Idea"):
                                st.write(responses.get(model_key, "No response found."))
            else:
                st.warning("Referee returned an empty evaluation.")