import os
from crewai import Agent, Task, Crew, Process
from crewai.tools import BaseTool
from langchain_community.tools import DuckDuckGoSearchRun

# --- 1. CONFIGURATION ---
os.environ["OPENAI_API_BASE"] = "https://api.groq.com/openai/v1"
os.environ["OPENAI_MODEL_NAME"] = "llama-3.3-70b-versatile"
os.environ["OPENAI_API_KEY"] = "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" # <--- PASTE KEY HERE

# --- 2. TOOLS ---
class SearchTool(BaseTool):
    name: str = "Search"
    description: str = "Useful for search-based queries. Use this to find current information about markets, companies, and trends."

    def _run(self, query: str) -> str:
        try:
            tool = DuckDuckGoSearchRun()
            return tool.run(query)
        except Exception as e:
            return f"Error searching: {str(e)}"

search_tool = SearchTool()

# --- 3. AGENTS ---

# 1. Idea Generator
idea_agent = Agent(
    role='Visionary Founder',
    goal='Generate a unique, high-potential startup idea based on a topic',
    backstory="You are a creative genius who sees opportunities where others see problems. You focus on innovation and user value.",
    verbose=True,
    allow_delegation=False
)

# 2. Market Research Agent
market_agent = Agent(
    role='Market Analyst',
    goal='Analyze the market size, trends, and target audience',
    backstory="You are a data-driven analyst. You don't care about feelings, only numbers and market demand.",
    verbose=True,
    tools=[search_tool],
    allow_delegation=False
)

# 3. Competition Analyzer Agent
competitor_agent = Agent(
    role='Corporate Spy',
    goal='Find existing competitors and list their strengths/weaknesses',
    backstory="You are an expert at competitive intelligence. You dig deep to find who else is doing this and why they might win.",
    verbose=True,
    tools=[search_tool],
    allow_delegation=False
)

# 4. Risk Analyzer Agent
risk_agent = Agent(
    role='Risk Manager',
    goal='Identify legal, financial, and operational risks',
    backstory="You are a pessimist. You look for reasons why the company will get sued, go bankrupt, or fail technologically.",
    verbose=True,
    tools=[search_tool],
    allow_delegation=False
)

# 5. Referee & Strategy Agent
referee_agent = Agent(
    role='Chief Strategy Officer',
    goal='Synthesize all reports and decide if we should invest',
    backstory="You are the decision maker. You read the market, competition, and risk reports. You decide: Do we take 2% equity or reject?",
    verbose=True,
    allow_delegation=False
)

# --- 4. TASKS ---

# Task 1: Generate
task_idea = Task(
    description='Generate a detailed startup idea for "AI in Career Guidance". Describe the problem, solution, and revenue model.',
    agent=idea_agent,
    expected_output='A clear 2-paragraph business pitch.'
)

# Task 2: Market Check
task_market = Task(
    description='Search for the market size of AI-powered career guidance and career counseling services. Who are the target users (students, job seekers, professionals)? What is the willingness to pay?',
    agent=market_agent,
    context=[task_idea], # Needs to know the idea
    expected_output='A market report with estimated market size, target demographics, and pricing potential.'
)

# Task 3: Competitor Check
task_competitor = Task(
    description='Search for existing startups doing "AI career guidance" or "AI career coaching". List 3 names, what they do, and their business model.',
    agent=competitor_agent,
    context=[task_idea],
    expected_output='A list of 3 competitors, their features, and competitive advantages.'
)

# Task 4: Risk Check
task_risk = Task(
    description='Analyze the risks: data privacy concerns (storing career/educational data), accuracy risks (AI giving wrong career advice), regulatory risks (career counseling licensing), and technical risks (AI bias).',
    agent=risk_agent,
    context=[task_idea],
    expected_output='A list of the top 3 critical risks and mitigation strategies.'
)

# Task 5: Final Verdict
task_referee = Task(
    description='Read all previous reports. Give a final score (0-100). Decide: "INVEST" or "REJECT". Explain your strategy.',
    agent=referee_agent,
    context=[task_idea, task_market, task_competitor, task_risk], # Reads EVERYTHING
    expected_output='Final Verdict: INVEST/REJECT, Score, and a 3-bullet execution strategy.'
)

# --- 5. EXECUTION ---
crew = Crew(
    agents=[idea_agent, market_agent, competitor_agent, risk_agent, referee_agent],
    tasks=[task_idea, task_market, task_competitor, task_risk, task_referee],
    process=Process.sequential, # Runs one after another
    verbose=True
)

print("### STARTING 5-AGENT STARTUP PIPELINE ###")
result = crew.kickoff()
print("\n\n########################")
print("## FINAL STRATEGY ##")
print(result)