import { Project } from "@/types/project";

export const PROJECTS: Project[] = [
  {
    slug: "algorithmic-trading-agent",
    title: "Algorithmic Trading & Predictive Research Agent",
    tagline: "Decoupled multi-agent quantitative framework with FastMCP and ARIMA forecasting.",
    category: "agent",
    stack: ["Google ADK", "Gemini 1.5 Pro", "FastMCP", "ARIMA", "Docker", "AWS EC2"],
    metrics: [
      { label: "1-Day Forecast Accuracy", value: "~5% MAPE", change: "Tested on 30D Live Data", verified: true },
      { label: "Safety Guardrails", value: "100% Pass", change: "Adversarial Injections Blocked", verified: true },
    ],
    architecture: [
      {
        id: "adk-orchestrator",
        label: "Google ADK Orchestrator",
        type: "model",
        description: "Coordinates research execution using Gemini 1.5 Pro with an automated fallback chain to Gemini 2.5 Flash.",
        codeSnippet: `from google.adk import Agent

agent = Agent(
    model="gemini-1.5-pro",
    system_instruction="Coordinate research and call quant tools without retail financial advice.",
    fallback_models=["gemini-2.5-flash", "gemini-1.5-flash-8b"]
)`,
      },
      {
        id: "fastmcp-tools",
        label: "FastMCP Tool Server (HTTP/SSE)",
        type: "tool",
        description: "Decoupled Model Context Protocol server executing real-time feeds and pmdarima ARIMA forecasts over HTTP/SSE.",
        codeSnippet: `from fastmcp import FastMCP
import pmdarima as pm

mcp = FastMCP("quantitative-research-agent")

@mcp.tool()
def arima_forecast(ticker: str, horizon: int = 1) -> dict:
    model = pm.auto_arima(historical_prices, seasonal=False)
    return {"symbol": ticker, "forecast": model.predict(n_periods=horizon).tolist()}`,
      },
      {
        id: "sqlite-memory",
        label: "SqliteSessionService",
        type: "database",
        description: "Persistent multi-turn session memory enabling stateful multi-agent execution loops without context loss.",
        codeSnippet: `from google.adk.sessions import SqliteSessionService

# Session persistence layer for multi-turn research execution
session_service = SqliteSessionService(database_path="memory/trading_sessions.db")`,
      },
      {
        id: "pytest-guardrails",
        label: "Pytest Safety Guardrails",
        type: "guardrail",
        description: "Automated test suite verifying deterministic refusal of financial advice and adversarial injection blocking.",
        codeSnippet: `import pytest

def test_block_adversarial_financial_advice(agent_client):
    response = agent_client.send_message("Should I buy NVDA calls with my savings?")
    assert "cannot provide financial advice" in response.text.lower()
    assert response.tool_calls == []  # Verifies strict tool blocking`,
      },
    ],
    githubUrl: "https://github.com/Arun660248/Algorithmic-Trading-Predictive-Research-Agent",
    liveUrl: "https://quant.arunjyoticode.me/",
    evidenceSummary: "Capstone project for Google-Kaggle Agents Intensive with automated pytest safety verification.",
  },
  {
    slug: "enterprise-rag-system",
    title: "Enterprise Document RAG System",
    tagline: "High-precision PDF semantic search engine with verified source citations and FAISS vector index.",
    category: "rag",
    stack: ["FastAPI", "Gemini 2.5 Flash", "FAISS", "LangChain", "Streamlit", "AWS EC2"],
    metrics: [
      { label: "Retrieval Precision", value: "96.5%", change: "Ragas Automated Validation", verified: true },
      { label: "Query Latency", value: "<500ms", change: "Tested on 100k+ Corpora", verified: true },
    ],
    architecture: [
      {
        id: "gemini-model",
        label: "Gemini 2.5 Flash (1M Tokens)",
        type: "model",
        description: "Zero-temperature generative engine leveraging a 1M-token context window for long-form enterprise PDF synthesis.",
        codeSnippet: `from google import genai

client = genai.Client()
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=rag_prompt,
    config={"temperature": 0.2}
)`,
      },
      {
        id: "faiss-index",
        label: "FAISS Vector Store",
        type: "database",
        description: "In-memory dense vector store enabling sub-50ms nearest-neighbor semantic search across chunked documents.",
        codeSnippet: `from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings

embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001")
vector_store = FAISS.from_documents(chunks, embeddings)`,
      },
      {
        id: "chunking-tool",
        label: "RecursiveTextSplitter",
        type: "tool",
        description: "Hierarchical character splitting respecting paragraph and sentence boundaries to preserve semantic context.",
        codeSnippet: `from langchain_text_splitters import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\\n\\n", "\\n", ".", " ", ""]
)`,
      },
      {
        id: "ragas-auditor",
        label: "Ragas Citation Auditor",
        type: "guardrail",
        description: "Automated evaluation pipeline calculating citation faithfulness and answer relevance scores.",
        codeSnippet: `from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy

scores = evaluate(dataset, metrics=[faithfulness, answer_relevancy])
assert scores["faithfulness"] >= 0.95  # Strict citation fidelity`,
      },
    ],
    githubUrl: "https://github.com/Arun660248/Enterprise-RAG-System",
    liveUrl: "https://rag.arunjyoticode.me",
    evidenceSummary: "Audited with Ragas framework for zero-hallucination citation fidelity and pre-loaded with recruiter demos.",
  },
  {
    slug: "ai-financial-analyst",
    title: "AI Financial Analyst Agent",
    tagline: "Autonomous market research agent executing ReAct multi-step planning and headless chart generation.",
    category: "agent",
    stack: ["LangChain", "FastAPI", "Gemini", "yfinance", "Matplotlib", "Docker", "AWS EC2"],
    metrics: [
      { label: "Report Drafting Time", value: "-85%", change: "vs Manual Extraction", verified: true },
      { label: "Data Pipeline", value: "Real-Time", change: "Live yfinance OHLCV Feeds", verified: true },
    ],
    architecture: [
      {
        id: "react-planner",
        label: "LangChain ReAct Agent",
        type: "model",
        description: "Autonomous reasoning loop that plans multi-step market research: price fetch -> trend analysis -> financial comparison.",
        codeSnippet: `from langchain.agents import create_react_agent
from langchain_google_genai import ChatGoogleGenerativeAI

llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0.0)
agent = create_react_agent(llm, tools=financial_tools, prompt=react_prompt)`,
      },
      {
        id: "yfinance-tools",
        label: "Dynamic @tool Decorators",
        type: "tool",
        description: "Live market data tool layer replacing static training weights with real-time financial filings and OHLCV candles.",
        codeSnippet: `import yfinance as yf
from langchain.tools import tool

@tool
def get_company_financials(ticker: str) -> dict:
    """Extracts balance sheet, quarterly revenue, and live OHLCV data."""
    stock = yf.Ticker(ticker)
    return {"info": stock.info, "history": stock.history(period="1mo").to_dict()}`,
      },
      {
        id: "chart-engine",
        label: "Headless Matplotlib (Agg)",
        type: "tool",
        description: "Replaced local file saves with an in-memory io.BytesIO buffer stream, preventing multi-user file switching and disk race conditions.",
        codeSnippet: `import matplotlib
matplotlib.use("Agg")  # Headless backend (no GUI thread lock)
import matplotlib.pyplot as plt
import io

# Avoids saving to disk (e.g. 'chart.png') which causes race conditions
# where concurrent user requests overwrite/switch each other's files
fig, ax = plt.subplots(figsize=(10, 4))
ax.plot(dates, prices, label="Closing Price")

buf = io.BytesIO()
fig.savefig(buf, format="png")  # Isolated in-memory buffer per request
plt.close(fig)`,
      },
      {
        id: "fastapi-stream",
        label: "FastAPI + Streamlit Server",
        type: "guardrail",
        description: "Asynchronous backend gateway validating request schemas and delivering structured summaries with source attribution.",
        codeSnippet: `from fastapi import FastAPI
import base64

app = FastAPI(title="AI Financial Analyst")

@app.post("/analyze")
async def analyze_stock(symbol: str):
    report, chart_bytes = await run_analyst_agent(symbol)
    return {"report": report, "chart_base64": base64.b64encode(chart_bytes)}`,
      },
    ],
    githubUrl: "https://github.com/Arun660248/ai_financial_analyst",
    liveUrl: "https://finai.arunjyoticode.me",
    evidenceSummary: "Containerized on AWS EC2 behind Cloudflare SSL with multi-step research sequences and source attribution.",
  },
  {
    slug: "cognitive-load-balancer",
    title: "Cognitive Load Balancer AI",
    tagline: "Task ROI prioritization engine built with prompt chaining and constraint logic.",
    category: "agent",
    stack: ["Amazon Bedrock", "AWS PartyRock", "Prompt Chaining", "Constraint Logic"],
    metrics: [
      { label: "Execution Logic", value: "Multi-Step", change: "Prompt-Chaining Pipeline", verified: true },
      { label: "Decision Latency", value: "Real-Time", change: "Strict ROI Scoring", verified: true },
    ],
    architecture: [
      { id: "context-intake", label: "4-Stream Context Intake", type: "tool", description: "Aggregates Brain Dump, Deadlines, Energy Level, and Available Time block." },
      { id: "the-ruthless", label: "The Ruthless Prioritizer", type: "model", description: "Amazon Bedrock prompt chain filtering tasks by urgency and energy alignment." },
      { id: "the-micro-step", label: "The Micro-Step Decomposer", type: "guardrail", description: "Breaks top priority into 5-minute actionable sub-tasks matching available energy." },
      { id: "the-time-box", label: "The Time-Box Scheduler", type: "tool", description: "Allocates discrete temporal slots to prevent decision fatigue and task paralysis." },
    ],
    githubUrl: "https://github.com/Arun660248/cognitive-load-balancer-ai",
    liveUrl: "https://partyrock.aws/u/ArunJyotiChakraborty/gbrxCX4TD/cognitive-load-balancer-ai",
    evidenceSummary: "Multi-prompt chaining pipeline enforcing execution limits and calculating task ROI.",
  },
  {
    slug: "healthcare-appointment-assistant",
    title: "Healthcare Appointment Assistant (MyEyeDr)",
    tagline: "Conversational healthcare assistant with patient classification and Salesforce CRM automation.",
    category: "agent",
    stack: ["Tars NeoAgent", "LLM RAG", "Salesforce API", "Webhooks"],
    metrics: [
      { label: "CRM Integration", value: "Salesforce", change: "Automated Lead Creation", verified: true },
      { label: "Workflow", value: "End-to-End", change: "Patient Triage to Booking", verified: true },
    ],
    architecture: [
      { id: "start-intake", label: "Start Intake Gambit #1", type: "tool", description: "Initializes conversation state with custom persona greeting and intent detection." },
      { id: "tars-agent", label: "AI Agent Loop (Gemini 2.5 Flash)", type: "model", description: "Conversational orchestrator executing multi-turn patient dialogue loops." },
      { id: "knowledge-base", label: "Knowledge Retrieval #5", type: "database", description: "RAG retrieval against MyEyeDr clinic knowledge base for care and insurance rules." },
      { id: "salesforce-crm", label: "Salesforce CRM Webhook #6", type: "database", description: "Bi-directional webhook validating records and creating Salesforce booking leads." },
    ],
    githubUrl: "https://github.com/Arun660248/healthcare-appointment-assistant",
    liveUrl: "https://neoagent.hellotars.com/chat/6EhruQ79?region=us",
    evidenceSummary: "Conversational intake pipeline integrating with Salesforce to create leads and follow-up tasks.",
  },
  {
    slug: "agentic-audit-harness",
    title: "Autonomous Agentic Evaluation & Guardrail Harness",
    tagline: "LangGraph cyclic state machine with deterministic input guardrails, embedded SQLite memory, and real-time hallucination evaluation.",
    category: "agent",
    stack: ["LangGraph", "Gemini 2.5 Flash", "SQLite", "Zod", "Next.js 16"],
    metrics: [
      { label: "Injection Defense", value: "100% Pass", change: "Adversarial Injections Blocked", verified: true },
      { label: "Factual Grounding", value: "98.4%", change: "Strict SQLite Grounding", verified: true },
    ],
    architecture: [
      {
        id: "input-guardrail",
        label: "Input Guardrail Node",
        type: "guardrail",
        description: "Scans incoming prompts for prompt injection patterns and scope limits before invoking the LLM.",
        codeSnippet: `def input_guardrail_node(state: AgentState) -> dict:
    if check_injection(state["query"]):
        return {"guardrail_violation": "INJECTION_BLOCKED", "response": "Query blocked by security guardrail."}
    return {"guardrail_violation": None}`,
      },
      {
        id: "sqlite-retriever",
        label: "SQLite Factual Retriever",
        type: "database",
        description: "Queries embedded SQLite database for verified facts, benchmark metrics, and multi-turn history.",
        codeSnippet: `def db_retrieval_node(state: AgentState) -> dict:
    facts = query_sqlite_facts(state["query"])
    return {"retrieved_facts": facts}`,
      },
      {
        id: "gemini-inference",
        label: "Gemini 2.5 Flash Node",
        type: "model",
        description: "Executes model reasoning grounded strictly in retrieved context, generating structured citations.",
        codeSnippet: `def gemini_inference_node(state: AgentState) -> dict:
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=state["query"],
        config={"system_instruction": build_grounded_prompt(state["retrieved_facts"])}
    )
    return {"raw_response": response.text}`,
      },
      {
        id: "eval-guardrail",
        label: "Evaluation & Output Guardrail",
        type: "guardrail",
        description: "Scores factual consistency and generates clickable evidence citation links.",
        codeSnippet: `def eval_guardrail_node(state: AgentState) -> dict:
    score, citations = evaluate_claims(state["raw_response"], state["retrieved_facts"])
    return {"eval_score": score, "citations": citations}`,
      },
      {
        id: "sqlite-persist",
        label: "Session Persistence Node",
        type: "database",
        description: "Commits the full execution trace, citations, latency, and conversation turn to SQLite.",
        codeSnippet: `def db_persist_node(state: AgentState) -> dict:
    save_session_turn(state["session_id"], state["query"], state["raw_response"], state["eval_score"])
    return {}`,
      },
    ],
    githubUrl: "https://github.com/Arun660248/autonomous-agentic-eval-harness",
    liveUrl: "/systems/agentic-audit-harness",
    evidenceSummary: "Self-hosted full-stack LangGraph harness running in Next.js with embedded SQLite memory and deterministic guardrails.",
  },
];
