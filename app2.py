import streamlit as st
import os
from groq import Groq

# --- PAGE CONFIGURATION ---
st.set_page_config(
    page_title="Startup Evolution Engine",
    page_icon="🧬",
    layout="wide",
    initial_sidebar_state="expanded"
)

# --- CUSTOM CSS FOR AGENT STYLING ---
st.markdown("""
<style>
    .agent-box {
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 20px;
        color: white; 
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .concept { background-color: #3498DB; border-left: 8px solid #21618C; } /* Blue - Concept */
    .market { background-color: #E67E22; border-left: 8px solid #A04000; } /* Orange - Market */
    .competitor { background-color: #8E44AD; border-left: 8px solid #5B2C6F; } /* Purple - Competitor */
    .risk { background-color: #C0392B; border-left: 8px solid #7B241C; } /* Red - Risk */
    .referee { background-color: #27AE60; border-left: 8px solid #145A32; } /* Green - Final Evolution */
    
    .header-text { 
        font-size: 22px; 
        font-weight: bold; 
        margin-bottom: 15px;
        text-transform: uppercase;
        letter-spacing: 1px;
        border-bottom: 1px solid rgba(255,255,255,0.3);
        padding-bottom: 5px;
    }
</style>
""", unsafe_allow_html=True)

# --- SIDEBAR: SETUP ---
with st.sidebar:
    st.image("https://cdn-icons-png.flaticon.com/512/1087/1087815.png", width=80)
    st.title("Evolution Controls")
    
    # API Key Input
    api_key = st.text_input("Enter Groq API Key:", type="password", placeholder="gsk_...")
    
    st.markdown("---")
    st.markdown("### 🧬 The Pipeline")
    st.info("**1. Concept Expansion**\n*llama-3.1-8b-instant*\nFleshes out the raw idea.")
    st.warning("**2. Market Analyst**\n*llama-3.1-8b-instant*\nIdentifies size & trends.")
    st.info("**3. Competitor Scout**\n*llama-3.1-8b-instant*\nFinds rivals & gaps.") # Changed from st.secondary to st.info
    st.error("**4. Risk Assessor**\n*llama-3.1-8b-instant*\nFinds the breaking points.")
    st.success("**5. The Referee**\n*llama-3.1-8b-instant*\nEvolves the idea based on data.")

# --- HELPER FUNCTION: CALL GROQ ---
def get_groq_response(client, model, role_instruction, user_input):
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": role_instruction,
                },
                {
                    "role": "user",
                    "content": user_input,
                }
            ],
            model=model,
            temperature=0.6, 
            max_tokens=1500,
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"Error: {str(e)}"

# --- MAIN APP UI ---
st.title("🧬 Startup Idea Evolution Engine")
st.markdown("#### Enter a raw concept. We will analyze it, find the flaws, and the **Referee** will evolve it into a better version.")

# Input Section
idea = st.text_area("Enter your raw idea:", height=100, placeholder="e.g., A tinder for finding roommates in Bangalore.")
start_btn = st.button("🚀 Run Evolution Loop", type="primary", use_container_width=True)

if start_btn:
    if not api_key:
        st.warning("⚠️ Please enter your Groq API Key in the sidebar to proceed.")
        st.stop()
    
    if not idea:
        st.warning("⚠️ Please enter a startup idea.")
        st.stop()

    client = Groq(api_key=api_key)
    
    # We use the same model for everything as requested
    SELECTED_MODEL = "llama-3.1-8b-instant"
    
    st.markdown("---")

    # --- STEP 1: CONCEPT EXPANSION ---
    with st.spinner("Expanding the raw concept..."):
        concept_prompt = """
        You are a Product Visionary. 
        Take this raw idea and expand it into a clear 1-paragraph elevator pitch. 
        Focus on what it does and who it is for.
        """
        concept_output = get_groq_response(client, SELECTED_MODEL, concept_prompt, idea)
    
    st.markdown(f"""
    <div class="agent-box concept">
        <div class="header-text">1. Concept Expansion</div>
        {concept_output}
    </div>
    """, unsafe_allow_html=True)
    
    # --- STEP 2: MARKET ANALYSIS ---
    with st.spinner("Analyzing the market..."):
        market_prompt = """
        You are a Market Research Analyst. 
        Analyze the market for this idea.
        Focus on:
        1. Market Size (Is it niche or mass?)
        2. Key Trends helping this idea.
        3. Target Audience profile.
        Keep it concise.
        """
        market_output = get_groq_response(client, SELECTED_MODEL, market_prompt, concept_output)

    st.markdown(f"""
    <div class="agent-box market">
        <div class="header-text">2. Market Analysis</div>
        {market_output}
    </div>
    """, unsafe_allow_html=True)

    # --- STEP 3: COMPETITOR ANALYSIS ---
    with st.spinner("Scouting competitors..."):
        competitor_prompt = """
        You are a Competitive Intelligence Scout.
        Identify the likely competition for this idea.
        Focus on:
        1. Direct Competitors (Who is already doing this?)
        2. Indirect Competitors (Substitutes).
        3. The Gap (What are they missing?)
        Keep it concise.
        """
        competitor_output = get_groq_response(client, SELECTED_MODEL, competitor_prompt, concept_output)

    st.markdown(f"""
    <div class="agent-box competitor">
        <div class="header-text">3. Competitor Analysis</div>
        {competitor_output}
    </div>
    """, unsafe_allow_html=True)

    # --- STEP 4: RISK ASSESSMENT ---
    with st.spinner("Assessing risks..."):
        risk_prompt = """
        You are a Risk Assessment Officer.
        Identify the top 3 ways this startup could FAIL.
        Focus on:
        1. Operational risks.
        2. Financial risks.
        3. Regulatory/Legal risks.
        Be harsh and realistic.
        """
        risk_output = get_groq_response(client, SELECTED_MODEL, risk_prompt, concept_output)

    st.markdown(f"""
    <div class="agent-box risk">
        <div class="header-text">4. Risk Assessment</div>
        {risk_output}
    </div>
    """, unsafe_allow_html=True)

    # --- STEP 5: THE REFEREE (SYNTHESIS & EVOLUTION) ---
    with st.spinner("The Referee is evolving the idea..."):
        referee_prompt = """
        You are the Master Referee and Startup Pivot Expert.
        
        Your Goal: Take the Original Concept and MODIFY it to solve the problems found in the analysis.
        
        Inputs:
        - Original Concept: {concept}
        - Market Data: {market}
        - Competition: {competitors}
        - Risks: {risks}
        
        Task:
        1. Acknowledge the critical risks found.
        2. EVOLVE the idea. (e.g., if competition is too high B2C, pivot to B2B. If risks are legal, change the feature set).
        3. Present the FINAL PIVOTED IDEA.
        
        Output Format:
        - 🚨 **Major Issue Identified:** [What was the biggest risk?]
        - 🔄 **The Pivot:** [How did you change the idea to fix it?]
        - ✨ **Final Evolved Concept:** [The new, better version of the startup]
        """
        # Format the prompt with previous outputs
        formatted_referee_prompt = referee_prompt.format(
            concept=concept_output,
            market=market_output,
            competitors=competitor_output,
            risks=risk_output
        )
        
        referee_output = get_groq_response(client, SELECTED_MODEL, formatted_referee_prompt, "Evolve this startup.")

    st.markdown(f"""
    <div class="agent-box referee">
        <div class="header-text">⚖️ The Referee (Final Verdict)</div>
        {referee_output}
    </div>
    """, unsafe_allow_html=True)

    st.success("Evolution Complete. Your idea has been stress-tested and improved.")