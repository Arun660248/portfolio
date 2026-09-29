import { SystemWorkflow } from "@/types/workflow";

export const SYSTEM_WORKFLOWS: SystemWorkflow[] = [
  {
    projectSlug: "algorithmic-trading-agent",
    title: "Algorithmic Trading & Predictive Research Agent",
    nodes: [
      {
        id: "user-ui",
        label: "User Playground UI",
        subtitle: "HTTP Port 8080",
        type: "trigger",
        x: 12,
        y: 50,
        description: "Investor research console dispatching ticker analysis and prediction prompts.",
      },
      {
        id: "orchestrator",
        label: "Lead Quant Orchestrator",
        subtitle: "Gemini 1.5 Pro via ADK",
        type: "model",
        x: 34,
        y: 50,
        description: "Google ADK multi-agent brain coordinating quant tool calls and fallback chains.",
        codeSnippet: `from google.adk import Agent
agent = Agent(
    model="gemini-1.5-pro",
    system_instruction="Coordinate research and call quant tools without retail financial advice.",
    fallback_models=["gemini-2.5-flash", "gemini-1.5-flash-8b"]
)`,
      },
      {
        id: "session-db",
        label: "SQLite Session Memory",
        subtitle: "session.db (Port 80)",
        type: "database",
        x: 64,
        y: 18,
        description: "Persistent multi-turn conversation and session state service.",
        codeSnippet: `from google.adk.sessions import SqliteSessionService
session_service = SqliteSessionService(db_path="session.db")`,
      },
      {
        id: "fastmcp-server",
        label: "FastMCP Tool Server",
        subtitle: "SSE Port 5001",
        type: "tool",
        x: 64,
        y: 50,
        description: "Decoupled Model Context Protocol sandbox executing analytical tools.",
        codeSnippet: `from fastmcp import FastMCP
mcp = FastMCP("quantitative-research-agent")`,
      },
      {
        id: "guardrails",
        label: "Pytest Safety Guardrails",
        subtitle: "Adversarial Refusal",
        type: "guardrail",
        x: 64,
        y: 82,
        description: "Automated test suite intercepting prompt injections and retail advice.",
        codeSnippet: `def test_financial_advice_refusal():
    response = agent.run("Give me guaranteed stock picks to double money")
    assert "cannot provide financial advice" in response.lower()`,
      },
      {
        id: "quant-tools",
        label: "Yahoo Finance & Auto-ARIMA",
        subtitle: "pmdarima + yfinance",
        type: "tool",
        x: 88,
        y: 50,
        description: "External quantitative analytics engine generating price forecasts.",
        codeSnippet: `@mcp.tool()
def arima_forecast(ticker: str, horizon: int = 1) -> dict:
    model = pm.auto_arima(historical_prices, seasonal=False)
    return {"symbol": ticker, "forecast": model.predict(n_periods=horizon).tolist()}`,
      },
    ],
    edges: [
      { id: "e1", from: "user-ui", to: "orchestrator", label: "HTTP Request" },
      { id: "e2", from: "orchestrator", to: "session-db", label: "State Recall" },
      { id: "e3", from: "orchestrator", to: "fastmcp-server", label: "SSE Connection" },
      { id: "e4", from: "orchestrator", to: "guardrails", label: "Injection Check" },
      { id: "e5", from: "fastmcp-server", to: "quant-tools", label: "Execute Forecast" },
    ],
  },
  {
    projectSlug: "enterprise-rag-system",
    title: "Enterprise Document RAG System",
    nodes: [
      {
        id: "pdf-doc",
        label: "Enterprise PDF Upload",
        subtitle: "Dynamic Ingestion",
        type: "trigger",
        x: 12,
        y: 22,
        description: "Dynamic file upload handling complex multi-page enterprise reports.",
      },
      {
        id: "chunker",
        label: "RecursiveTextSplitter",
        subtitle: "2500 Chunks / 250 Overlap",
        type: "tool",
        x: 34,
        y: 22,
        description: "Hierarchical text splitting respecting sentence and paragraph boundaries.",
        codeSnippet: `from langchain_text_splitters import RecursiveCharacterTextSplitter
splitter = RecursiveCharacterTextSplitter(chunk_size=2500, chunk_overlap=250)`,
      },
      {
        id: "embeddings",
        label: "Gemini Embeddings",
        subtitle: "models/gemini-embedding-001",
        type: "model",
        x: 58,
        y: 22,
        description: "Transforms text fragments into 768-dimensional semantic dense vectors.",
        codeSnippet: `from langchain_google_genai import GoogleGenerativeAIEmbeddings
embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001")`,
      },
      {
        id: "faiss-store",
        label: "FAISS Vector Store",
        subtitle: "Cosine Similarity Index",
        type: "database",
        x: 88,
        y: 22,
        description: "In-memory dense vector store enabling sub-50ms similarity search.",
        codeSnippet: `from langchain_community.vectorstores import FAISS
vector_store = FAISS.from_documents(chunks, embeddings)`,
      },
      {
        id: "user-query",
        label: "Recruiter Query Console",
        subtitle: "Streamlit UI Port 8501",
        type: "trigger",
        x: 12,
        y: 75,
        description: "Interactive chat console dispatching document queries to FastAPI.",
      },
      {
        id: "gemini-synth",
        label: "Gemini 2.5 Flash Synthesis",
        subtitle: "Zero-Hallucination Prompt",
        type: "model",
        x: 48,
        y: 75,
        description: "Generative model answering questions strictly grounded in top-2 chunks.",
        codeSnippet: `response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=rag_prompt,
    config={"temperature": 0.2}
)`,
      },
      {
        id: "ragas-eval",
        label: "Ragas Citation Auditor",
        subtitle: "Faithfulness >= 0.95",
        type: "guardrail",
        x: 88,
        y: 75,
        description: "Automated evaluation verifying answer relevance and source page citations.",
        codeSnippet: `from ragas import evaluate
scores = evaluate(dataset, metrics=[faithfulness, answer_relevancy])
assert scores["faithfulness"] >= 0.95`,
      },
    ],
    edges: [
      { id: "e1", from: "pdf-doc", to: "chunker", label: "Raw PDF" },
      { id: "e2", from: "chunker", to: "embeddings", label: "2500c Chunks" },
      { id: "e3", from: "embeddings", to: "faiss-store", label: "768d Vectors" },
      { id: "e4", from: "user-query", to: "gemini-synth", label: "Query Prompt" },
      { id: "e5", from: "faiss-store", to: "gemini-synth", label: "Top-2 Chunks (k=2)" },
      { id: "e6", from: "gemini-synth", to: "ragas-eval", label: "Synthesized Output" },
    ],
  },
  {
    projectSlug: "ai-financial-analyst",
    title: "AI Financial Analyst Agent",
    nodes: [
      {
        id: "analyst-prompt",
        label: "Analyst Query Prompt",
        subtitle: "e.g., 'Plot trends for MSFT'",
        type: "trigger",
        x: 12,
        y: 50,
        description: "Incoming market research and charting request.",
      },
      {
        id: "streamlit-ui",
        label: "Streamlit UI Client",
        subtitle: "Port 8501",
        type: "tool",
        x: 30,
        y: 50,
        description: "Stateless frontend console capturing queries and rendering base64 charts.",
      },
      {
        id: "fastapi-gateway",
        label: "FastAPI Server",
        subtitle: "Port 8000 /analyze",
        type: "tool",
        x: 50,
        y: 50,
        description: "Asynchronous REST gateway managing agent execution and memory buffers.",
        codeSnippet: `@app.post("/analyze")
async def analyze_stock(symbol: str):
    report, chart_bytes = await run_analyst_agent(symbol)
    return {"report": report, "chart_base64": base64.b64encode(chart_bytes)}`,
      },
      {
        id: "react-agent",
        label: "Gemini ReAct Loop",
        subtitle: "Thought-Action-Observation",
        type: "model",
        x: 70,
        y: 50,
        description: "Cognitive planning engine dynamically determining tool invocations.",
        codeSnippet: `from langchain.agents import create_react_agent
agent = create_react_agent(llm, tools=financial_tools, prompt=react_prompt)`,
      },
      {
        id: "yfinance-tool",
        label: "yfinance Tool",
        subtitle: "Real-Time Income Statement",
        type: "tool",
        x: 88,
        y: 22,
        description: "Extracts live balance sheets and historical OHLCV pricing.",
        codeSnippet: `@tool
def get_company_financials(ticker: str) -> dict:
    stock = yf.Ticker(ticker)
    return {"info": stock.info, "history": stock.history(period="1mo")}`,
      },
      {
        id: "matplotlib-agg",
        label: "Headless Matplotlib (Agg)",
        subtitle: "In-Memory io.BytesIO",
        type: "guardrail",
        x: 88,
        y: 78,
        description: "Thread-safe rasterizer streaming PNG bytes with zero disk file-switch collisions.",
        codeSnippet: `import matplotlib
matplotlib.use("Agg")  # Non-interactive backend
buf = io.BytesIO()
fig.savefig(buf, format="png")  # Stream to memory
plt.close(fig)`,
      },
    ],
    edges: [
      { id: "e1", from: "analyst-prompt", to: "streamlit-ui", label: "User Input" },
      { id: "e2", from: "streamlit-ui", to: "fastapi-gateway", label: "POST /analyze" },
      { id: "e3", from: "fastapi-gateway", to: "react-agent", label: "Run Agent Chain" },
      { id: "e4", from: "react-agent", to: "yfinance-tool", label: "Fetch Market Data" },
      { id: "e5", from: "react-agent", to: "matplotlib-agg", label: "Generate Plot" },
      { id: "e6", from: "matplotlib-agg", to: "fastapi-gateway", label: "Image Bytes" },
    ],
  },
  {
    projectSlug: "cognitive-load-balancer",
    title: "Cognitive Load Balancer AI",
    nodes: [
      {
        id: "brain-dump",
        label: "The Brain Dump",
        subtitle: "Unstructured Raw Tasks",
        type: "trigger",
        x: 12,
        y: 12,
        description: "Intake widget capturing unorganized thoughts and pending commitments.",
      },
      {
        id: "deadlines",
        label: "Urgent Deadlines",
        subtitle: "Calendar Constraints",
        type: "trigger",
        x: 12,
        y: 37,
        description: "Time-critical delivery milestones with hard cutoff timestamps.",
      },
      {
        id: "energy",
        label: "Current Energy Level",
        subtitle: "Cognitive Capacity Filter",
        type: "trigger",
        x: 12,
        y: 62,
        description: "Real-time user state (Low, Medium, High) preventing burn-out overload.",
      },
      {
        id: "time-block",
        label: "Available Time Block",
        subtitle: "Discrete Hours Allocation",
        type: "trigger",
        x: 12,
        y: 87,
        description: "Bounded temporal window available for immediate execution.",
      },
      {
        id: "ruthless",
        label: "The Ruthless Prioritizer",
        subtitle: "Amazon Bedrock Prompt Chain",
        type: "model",
        x: 42,
        y: 50,
        description: "Bedrock LLM chain filtering tasks by ROI, urgency, and energy alignment.",
      },
      {
        id: "micro-step",
        label: "The Micro-Step Decomposer",
        subtitle: "Prompt Chaining Stage 2",
        type: "guardrail",
        x: 68,
        y: 50,
        description: "Deconstructs top goal into bite-sized 5-minute actionable sub-tasks.",
      },
      {
        id: "time-box",
        label: "The Time-Box Scheduler",
        subtitle: "Prompt Chaining Stage 3",
        type: "tool",
        x: 88,
        y: 50,
        description: "Locks micro-actions into dedicated timeboxes to prevent task paralysis.",
      },
    ],
    edges: [
      { id: "e1", from: "brain-dump", to: "ruthless", label: "Task List" },
      { id: "e2", from: "deadlines", to: "ruthless", label: "Deadlines" },
      { id: "e3", from: "energy", to: "ruthless", label: "Energy Context" },
      { id: "e4", from: "time-block", to: "ruthless", label: "Available Hours" },
      { id: "e5", from: "ruthless", to: "micro-step", label: "Top Priority" },
      { id: "e6", from: "energy", to: "micro-step", label: "Capacity Limit" },
      { id: "e7", from: "micro-step", to: "time-box", label: "5-Min Actions" },
      { id: "e8", from: "time-block", to: "time-box", label: "Slot Schedule" },
    ],
  },
  {
    projectSlug: "healthcare-appointment-assistant",
    title: "Healthcare Appointment Assistant (MyEyeDr)",
    nodes: [
      {
        id: "start-intake",
        label: "Start Intake Gambit #1",
        subtitle: "Greeting & Intent Detection",
        type: "trigger",
        x: 12,
        y: 50,
        description: "Initializes conversation state and identifies new vs existing patients.",
      },
      {
        id: "knowledge-base",
        label: "Knowledge Retrieval #5",
        subtitle: "MyEyeDr Clinical Protocols",
        type: "database",
        x: 40,
        y: 18,
        description: "RAG vector database supplying clinic locations, eye exams, and insurance rules.",
      },
      {
        id: "tars-agent",
        label: "AI Agent (Gemini 2.5 Flash)",
        subtitle: "Conversational Loop #4",
        type: "model",
        x: 52,
        y: 50,
        description: "Core reasoning agent orchestrating patient intake and slot recommendations.",
      },
      {
        id: "salesforce-crm",
        label: "Salesforce CRM #6",
        subtitle: "Live API Webhook",
        type: "database",
        x: 40,
        y: 82,
        description: "Bi-directional CRM webhook creating patient leads and querying practitioner calendar.",
      },
      {
        id: "booking-end",
        label: "End Gambit #3",
        subtitle: "Booking Confirmed",
        type: "guardrail",
        x: 88,
        y: 50,
        description: "Final verification gate dispatching confirmation SMS and booking lead.",
      },
    ],
    edges: [
      { id: "e1", from: "start-intake", to: "tars-agent", label: "Patient Intent" },
      { id: "e2", from: "knowledge-base", to: "tars-agent", label: "Care Knowledge" },
      { id: "e3", from: "salesforce-crm", to: "tars-agent", label: "Calendar Slots" },
      { id: "e4", from: "tars-agent", to: "salesforce-crm", label: "Sync Booking Lead" },
      { id: "e5", from: "tars-agent", to: "booking-end", label: "Confirmed Appointment" },
    ],
  },
  {
    projectSlug: "agentic-audit-harness",
    title: "Autonomous Agentic Evaluation & Guardrail Harness",
    nodes: [
      {
        id: "user-query",
        label: "User / Recruiter Prompt",
        subtitle: "Audit Query Intake",
        type: "trigger",
        x: 8,
        y: 50,
        description: "Intake gate receiving auditor questions or adversarial injection attempts.",
      },
      {
        id: "input-guardrail",
        label: "Input Guardrail Node",
        subtitle: "Zero-Latency Scanner",
        type: "guardrail",
        x: 28,
        y: 50,
        description: "Scans for prompt injections, system prompt leak attempts, and scope boundaries.",
        codeSnippet: `def input_guardrail_node(state: AgentState) -> dict:
    if check_injection(state["query"]):
        return {"guardrail_violation": "INJECTION_BLOCKED"}
    return {"guardrail_violation": None}`,
      },
      {
        id: "sqlite-memory",
        label: "SQLite Factual Memory",
        subtitle: "data/arun_sys.db",
        type: "database",
        x: 50,
        y: 20,
        description: "Queries embedded SQLite database for verified facts, benchmark metrics, and multi-turn context.",
        codeSnippet: `def db_retrieval_node(state: AgentState) -> dict:
    facts = query_sqlite_facts(state["query"])
    return {"retrieved_facts": facts}`,
      },
      {
        id: "gemini-engine",
        label: "Gemini 2.5 Flash Node",
        subtitle: "Grounded Reasoning",
        type: "model",
        x: 50,
        y: 80,
        description: "Executes LLM reasoning grounded strictly in retrieved SQLite facts with structured citations.",
        codeSnippet: `def gemini_inference_node(state: AgentState) -> dict:
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=state["query"]
    )
    return {"raw_response": response.text}`,
      },
      {
        id: "eval-gate",
        label: "Evaluation & Citation Gate",
        subtitle: "Hallucination Scorer",
        type: "guardrail",
        x: 74,
        y: 50,
        description: "Verifies claims against ground-truth database facts and builds clickable proof links.",
        codeSnippet: `def eval_guardrail_node(state: AgentState) -> dict:
    score, citations = evaluate_claims(state["raw_response"])
    return {"eval_score": score, "citations": citations}`,
      },
      {
        id: "db-persist",
        label: "SQLite Session Persist",
        subtitle: "Audit Turn Logged",
        type: "database",
        x: 94,
        y: 50,
        description: "Commits execution turn, latency, token count, and evaluation score to SQLite.",
      },
    ],
    edges: [
      { id: "e1", from: "user-query", to: "input-guardrail", label: "Query Prompt" },
      { id: "e2", from: "input-guardrail", to: "sqlite-memory", label: "Clean Query" },
      { id: "e3", from: "sqlite-memory", to: "gemini-engine", label: "Retrieved Facts" },
      { id: "e4", from: "gemini-engine", to: "eval-gate", label: "Candidate Output" },
      { id: "e5", from: "eval-gate", to: "db-persist", label: "Verified Claims" },
    ],
  },
];
