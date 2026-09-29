import { RoleEvaluation } from "@/types/role";

export const ROLES_DATA: RoleEvaluation[] = [
  {
    id: "agentic",
    roleName: "Agentic AI Systems Engineer",
    targetFocus: "Autonomous ReAct Loops · FastMCP Tool Servers · Multi-Agent Orchestration · Safety Guardrails",
    matchScore: 96,
    matchGrade: "EXCEPTIONAL FIT",
    summaryRationale:
      "Arun demonstrates hands-on mastery of decoupled multi-agent architectures using Google ADK and LangChain, implementing stateful ReAct loops, Model Context Protocol (MCP) tool sandboxing, and deterministic safety test suites.",
    whyHireROI: [
      "Immediate Day-1 productivity in architecting tool-calling LLM agents (FastMCP, LangChain @tool decorators).",
      "Eliminates retail financial advice risk and adversarial prompt injection via automated pytest guardrail suites (100% pass rate).",
      "Engineers decoupled HTTP/SSE tool layers rather than monolithic agent spaghetti code, ensuring clean separation of concerns.",
      "Hands-on experience deploying stateful session persistence (Google ADK SqliteSessionService).",
    ],
    requirementsMatrix: [
      {
        requirement: "Multi-Agent Orchestration & Planning",
        proof: "Built Google ADK agent with automated fallback chains (Gemini 1.5 Pro -> Gemini 2.5 Flash -> Flash-8b).",
        repoEvidence: "Algorithmic Trading Agent (adk-orchestrator)",
        status: "production",
      },
      {
        requirement: "Tool Sandboxing & Context Protocols",
        proof: "Engineered independent FastMCP server exposing live market data and pmdarima forecasting tools over HTTP/SSE.",
        repoEvidence: "FastMCP Tool Server (FastMCP v0.4)",
        status: "verified",
      },
      {
        requirement: "Safety & Adversarial Jailbreak Defense",
        proof: "Automated pytest suite testing 50+ boundary injections to guarantee deterministic refusal of retail financial advice.",
        repoEvidence: "Pytest Guardrail Suite (test_guardrails.py)",
        status: "verified",
      },
      {
        requirement: "Autonomous ReAct Loop Execution",
        proof: "LangChain ReAct agent capable of multi-step financial research (price fetch -> income comparison -> trend synthesis).",
        repoEvidence: "AI Financial Analyst Agent (react-planner)",
        status: "production",
      },
    ],
    backedProjectSlugs: [
      "algorithmic-trading-agent",
      "ai-financial-analyst",
      "healthcare-appointment-assistant",
    ],
    atsCandidateSummary: `CANDIDATE: Arun Jyoti Chakraborty (IIT Guwahati, B.Sc. Data Science & AI)
TARGET ROLE: Agentic AI Systems Engineer (Match: 96% - Exceptional Fit)
KEY HIGHLIGHTS:
- Capstone Project for Google & Kaggle 5-Day AI Agents Intensive.
- Built decoupled multi-agent systems using Google ADK and FastMCP tool servers over HTTP/SSE.
- 100% Pass Rate on automated pytest guardrails preventing prompt injection and unvetted advice.
- Production containerized deployments on AWS EC2 behind Cloudflare SSL.
LIVE EVIDENCE: https://arunjyoticode.me/systems/algorithmic-trading-agent`,
  },
  {
    id: "rag",
    roleName: "RAG & LLM Systems Engineer",
    targetFocus: "Vector Databases · Semantic Chunking · Citation Fidelity · Context Management",
    matchScore: 94,
    matchGrade: "STRONG FIT",
    summaryRationale:
      "Arun builds auditable, zero-hallucination Retrieval-Augmented Generation systems with precise source-page attribution, dynamic vector store adapters (FAISS dev <-> Qdrant prod), and automated Ragas evaluation benchmarks.",
    whyHireROI: [
      "Guarantees 100% citation attribution, eliminating enterprise legal and compliance hallucination risks.",
      "Achieves 96.5% retrieval precision with sub-500ms query latency on complex multi-page financial reports.",
      "Solves distributed index divergence via a hot-swappable vector adapter pattern (local FAISS -> clustered Qdrant).",
      "Pre-loads live enterprise documents so recruiters and stakeholders can audit response quality instantly without friction.",
    ],
    requirementsMatrix: [
      {
        requirement: "Vector Store Indexing & Scaling",
        proof: "Engineered dual-mode vector layer: in-memory FAISS for rapid dev test runs and Qdrant/pgvector for multi-worker scaling.",
        repoEvidence: "Enterprise Document RAG System (faiss-index)",
        status: "production",
      },
      {
        requirement: "Citation Fidelity & Grounding",
        proof: "Every generative response returns deterministic source document and page number citations verified against text chunks.",
        repoEvidence: "Zero-Hallucination Citation Engine",
        status: "verified",
      },
      {
        requirement: "Large Context Window Handling",
        proof: "Integrated Gemini 2.5 Flash with 1M-token context capability for complex enterprise filings without context degradation.",
        repoEvidence: "Gemini 2.5 Flash RAG Gateway",
        status: "verified",
      },
      {
        requirement: "Enterprise Document Ingestion",
        proof: "RecursiveCharacterTextSplitter chunking with metadata tracking for tables, footnotes, and multi-column enterprise PDF filings.",
        repoEvidence: "LangChain Chunking Pipeline",
        status: "production",
      },
    ],
    backedProjectSlugs: [
      "enterprise-rag-system",
      "healthcare-appointment-assistant",
    ],
    atsCandidateSummary: `CANDIDATE: Arun Jyoti Chakraborty (IIT Guwahati, B.Sc. Data Science & AI)
TARGET ROLE: RAG & LLM Systems Engineer (Match: 94% - Strong Fit)
KEY HIGHLIGHTS:
- 96.5% Retrieval Precision verified using Ragas automated evaluation framework.
- Solved FAISS distributed multi-worker split-brain via hot-swappable vector store adapter layer.
- 100% citation and page number attribution on every enterprise response.
- Full-stack Streamlit + FastAPI containerized pipeline on AWS EC2.
LIVE EVIDENCE: https://arunjyoticode.me/systems/enterprise-rag-system`,
  },
  {
    id: "applied-ai",
    roleName: "Applied AI & Quantitative Systems",
    targetFocus: "Time Series Modeling · Numerical Volatility · Data Modeling · Real-Time Market Ingestion",
    matchScore: 92,
    matchGrade: "HIGH FIT",
    summaryRationale:
      "Combining rigorous academic training in Time Series Analysis and Machine Learning at IIT Guwahati with live financial data pipelines (yfinance, ARIMA, pmdarima) to bridge quantitative modeling with LLM reasoning.",
    whyHireROI: [
      "Bridges the gap between traditional quantitative mathematical models (ARIMA) and generative LLMs (Gemini).",
      "Achieved ~5% MAPE price forecast accuracy on live 30-day market backtests under normal volatility.",
      "Reduces manual equity research drafting and multi-source financial extraction time by 85%.",
      "Solid theoretical mathematical foundation from IIT Guwahati (Recommender Systems, Data Modeling, Probability).",
    ],
    requirementsMatrix: [
      {
        requirement: "Time Series & Predictive Modeling",
        proof: "Integrated pmdarima auto_arima model generating 1-day ahead price forecasts evaluated against historical OHLCV data.",
        repoEvidence: "Algorithmic Trading Agent (pmdarima quant tool)",
        status: "verified",
      },
      {
        requirement: "Real-Time Market Ingestion",
        proof: "Automated extraction of balance sheets, cash flows, and OHLCV candles via yfinance with dynamic Pandas structuring.",
        repoEvidence: "AI Financial Analyst (yfinance-tools)",
        status: "production",
      },
      {
        requirement: "Data Visualization & Trend Synthesis",
        proof: "Dual Y-axis financial trend plotting with moving averages and structured executive summary extraction.",
        repoEvidence: "Headless Matplotlib (Agg) Engine",
        status: "production",
      },
      {
        requirement: "Mathematical Rigor & Edge Diagnosis",
        proof: "Diagnosed ARIMA semantic blindness during macro economic announcements and designed FastMCP sentiment damping.",
        repoEvidence: "Post-Mortem Incident #01",
        status: "verified",
      },
    ],
    backedProjectSlugs: [
      "algorithmic-trading-agent",
      "ai-financial-analyst",
      "cognitive-load-balancer",
    ],
    atsCandidateSummary: `CANDIDATE: Arun Jyoti Chakraborty (IIT Guwahati, B.Sc. Data Science & AI)
TARGET ROLE: Applied AI & Quantitative Systems Engineer (Match: 92% - High Fit)
KEY HIGHLIGHTS:
- ~5% MAPE 1-day price forecasting accuracy on 30-day live market backtests.
- Formal coursework at IIT Guwahati: Time Series Analysis, Machine Learning, Data Modeling.
- Replaced static analysis with automated LangChain research sequence reducing reporting time by 85%.
- Honest forensic engineering: diagnosed ARIMA macroeconomic blindness and built FastMCP mitigation.
LIVE EVIDENCE: https://arunjyoticode.me/systems/algorithmic-trading-agent`,
  },
  {
    id: "backend-ai",
    roleName: "Backend AI & API Systems Engineer",
    targetFocus: "FastAPI Gateways · Docker Containerization · Concurrency Isolation · Cloud Deployment",
    matchScore: 90,
    matchGrade: "SOLID FIT",
    summaryRationale:
      "Arun specializes in hardening AI prototypes into production-grade microservices: asynchronous FastAPI gateways, isolated in-memory byte streams, Docker containerization, and Cloudflare reverse proxy routing.",
    whyHireROI: [
      "Zero disk race conditions: solved concurrent multi-user Matplotlib chart corruption using headless in-memory io.BytesIO buffers.",
      "Production Docker Compose deployment architecture running reliably on AWS EC2 instances.",
      "Clean API design: pydantic request/response validation schemas, asynchronous event loops, and CORS security.",
      "Direct experience managing edge proxying, SSL termination, and subdomain routing on Cloudflare.",
    ],
    requirementsMatrix: [
      {
        requirement: "Asynchronous Python Microservices",
        proof: "Architected FastAPI server handling streaming report generation and base64 chart payload transmission.",
        repoEvidence: "FastAPI Server (/analyze endpoint)",
        status: "production",
      },
      {
        requirement: "Concurrency Bug Isolation",
        proof: "Diagnosed and eliminated disk write race condition under concurrent requests by switching to in-memory byte buffers.",
        repoEvidence: "Post-Mortem Incident #03 (io.BytesIO)",
        status: "verified",
      },
      {
        requirement: "Containerization & Deployment",
        proof: "Docker Compose multi-container configuration hosting FastAPI, Streamlit, and FastMCP on AWS EC2 instances.",
        repoEvidence: "Docker Compose Infrastructure",
        status: "production",
      },
      {
        requirement: "CRM & Webhook Automation",
        proof: "Bi-directional Salesforce API integration creating leads and validation checkpoints from conversational dialogues.",
        repoEvidence: "Healthcare Appointment Assistant (Salesforce Webhook)",
        status: "production",
      },
    ],
    backedProjectSlugs: [
      "ai-financial-analyst",
      "enterprise-rag-system",
      "algorithmic-trading-agent",
      "healthcare-appointment-assistant",
    ],
    atsCandidateSummary: `CANDIDATE: Arun Jyoti Chakraborty (IIT Guwahati, B.Sc. Data Science & AI)
TARGET ROLE: Backend AI & API Systems Engineer (Match: 90% - Solid Fit)
KEY HIGHLIGHTS:
- Production FastAPI async gateways containerized with Docker Compose on AWS EC2.
- Solved multi-user disk race conditions by transitioning to headless in-memory io.BytesIO streams.
- Integrated enterprise Salesforce webhooks and MCP client-server protocols over HTTP/SSE.
- Cloudflare edge proxying with custom subdomain SSL termination.
LIVE EVIDENCE: https://arunjyoticode.me/systems/ai-financial-analyst`,
  },
];
