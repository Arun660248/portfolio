# ARUN.SYS — Comprehensive Profile, Projects & Certifications Knowledge Base

This file stores all verified information, live deployment subdomains, GitHub repositories, certifications, technical architectures, and evidence data for **Arun Jyoti Chakraborty**.

---

## 1. Profile & Verified Links

- **Name:** Arun Jyoti Chakraborty
- **Role:** Applied AI Engineer · RAG & Agentic AI Developer
- **Location:** West Bengal, India
- **Education:** B.Sc. Data Science & Artificial Intelligence · Indian Institute of Technology Guwahati (IITG) (2024 – Present, 2nd Year)
  - *Coursework:* Recommender Systems, Machine Learning, Time Series Analysis, Data Modeling & Visualization
- **GitHub:** [https://github.com/Arun660248](https://github.com/Arun660248)
- **LinkedIn:** [https://www.linkedin.com/in/arun-jyoti-chakraborty-407826322/](https://www.linkedin.com/in/arun-jyoti-chakraborty-407826322/)
- **Custom Domain:** [https://arunjyoticode.me](https://arunjyoticode.me)
- **Email:** `arunjyotichakraborty18@gmail.com`
- **Phone / WhatsApp:** `+91 7439524613` ([https://wa.me/917439524613](https://wa.me/917439524613))
- **Availability:** Fully available for remote full-time or internship roles immediately.

---

## 2. Production AI Systems (With Live Subdomains & Evidence)

### 1. Algorithmic Trading & Predictive Research Agent
- **Category:** Agentic AI / Quantitative Systems
- **Live Demo:** [https://quant.arunjyoticode.me/](https://quant.arunjyoticode.me/)
- **GitHub:** [https://github.com/Arun660248/Algorithmic-Trading-Predictive-Research-Agent](https://github.com/Arun660248/Algorithmic-Trading-Predictive-Research-Agent)
- **Deployment:** Docker Compose on AWS EC2 behind Cloudflare with SSL
- **Credential / Honor:** Capstone Project for Google–Kaggle 5-Day AI Agents Intensive
- **Tech Stack:** Python, Google ADK, Gemini 1.5 Pro / 2.5 Flash, FastMCP, ARIMA (pmdarima), SQLite, Docker, AWS EC2
- **Architecture & Technical Highlights:**
  - **Decoupled Architecture:** Gemini orchestrator (Google ADK) coordinates research while an independent FastMCP tool server executes market data retrieval and ARIMA forecasting over HTTP/SSE.
  - **Persistent Session Memory:** Implemented via ADK's `SqliteSessionService`.
  - **Safety & Guardrails:** Automated `pytest` guardrail suite verifying refusal of financial advice and tool-call blocking under adversarial prompt-injection attacks.
  - **Empirical Metric:** Backtested ARIMA module against 30 days of live market data, achieving **~5% MAPE on 1-day-ahead price forecasts** under normal volatility.
  - **Honest Limitation:** Documented performance degradation during news-driven shocks; motivates a sentiment-aware news tool layer for v2.

### 2. AI Financial Analyst Agent
- **Category:** Agentic AI / Market Analysis
- **Live Demo:** [https://finai.arunjyoticode.me](https://finai.arunjyoticode.me)
- **GitHub:** [https://github.com/Arun660248/ai_financial_analyst](https://github.com/Arun660248/ai_financial_analyst)
- **Deployment:** FastAPI Backend + Streamlit UI, Docker containerized on AWS EC2 behind Cloudflare SSL
- **Tech Stack:** Python, LangChain, FastAPI, Streamlit, Gemini, yfinance, Headless Matplotlib, Docker, AWS EC2
- **Architecture & Technical Highlights:**
  - **Tool-Calling Architecture:** Built with LangChain `@tool` decorators to dynamically fetch live stock prices, OHLCV data, and income statements via yfinance API.
  - **ReAct Agent Loop:** Autonomous agent plans multi-step research sequences (price fetch $\to$ trend analysis $\to$ income comparison).
  - **Visual Artifact Generation:** Generates dual Y-axis time-series visualizations via headless matplotlib (`Agg` backend) and returns structured financial summaries with source attribution.
  - **Empirical Metric:** Reduces equity report drafting and data extraction time by **85%**.

### 3. Enterprise Document RAG System
- **Category:** Retrieval-Augmented Generation (RAG)
- **Live Demo:** [https://rag.arunjyoticode.me](https://rag.arunjyoticode.me)
- **GitHub:** [https://github.com/Arun660248/Enterprise-RAG-System](https://github.com/Arun660248/Enterprise-RAG-System)
- **Deployment:** Streamlit + FastAPI on AWS EC2 behind Cloudflare SSL
- **Tech Stack:** Python, LangChain, FAISS, Gemini 2.5-flash, FastAPI, Streamlit, AWS EC2
- **Architecture & Technical Highlights:**
  - **Deterministic Chunking & Retrieval:** PDFs are chunked via `RecursiveCharacterTextSplitter`, embedded into FAISS, and semantically retrieved at query time.
  - **Auditability & Zero-Hallucination:** Automatic source-and-page citations on every response.
  - **Zero-Friction Recruiter Demo:** Pre-loaded with enterprise financial reports so recruiters can test queries immediately without uploading files.
  - **Model Selection:** Powered by Gemini 2.5-flash for its 1M-token context window.

### 4. Cognitive Load Balancer
- **Category:** Prioritization AI / Prompt Chaining
- **Live Demo:** Live on AWS PartyRock
- **GitHub:** [https://github.com/Arun660248/cognitive-load-balancer-ai](https://github.com/Arun660248/cognitive-load-balancer-ai)
- **Tech Stack:** Amazon Bedrock, AWS PartyRock, Multi-Prompt Chaining
- **Architecture & Technical Highlights:**
  - Multi-step prompt-chaining pipeline functioning as a ruthless prioritization engine.
  - Calculates task ROI scores, enforces strict execution limits, and eliminates decision paralysis via structured constraint logic.

### 5. Healthcare Appointment Assistant
- **Category:** Conversational AI / CRM Automation
- **Live Demo:** [https://neoagent.hellotars.com/chat/6EhruQ79?region=us](https://neoagent.hellotars.com/chat/6EhruQ79?region=us)
- **GitHub:** [https://github.com/Arun660248/healthcare-appointment-assistant](https://github.com/Arun660248/healthcare-appointment-assistant)
- **Client / Case Study:** MyEyeDr
- **Tech Stack:** Tars NeoAgent, LLM RAG, Salesforce API, Webhooks
- **Highlights:** Identifies new vs. existing patients, collects appointment details conversationally, and creates qualified leads and follow-ups in Salesforce.

### 6. Multi-Agent MCP System
- **Category:** Model Context Protocol & Tool Sandboxing
- **GitHub:** [https://github.com/Arun660248/multi-agent-mcp](https://github.com/Arun660248/multi-agent-mcp)
- **Tech Stack:** Model Context Protocol (MCP), Node.js, Docker, gRPC, Python
- **Highlights:** Connects LLM agents to local developer resources with sub-15ms inter-agent overhead and handles 50+ concurrent tool loops.

### 7. AI Data Analyst Agent
- **Category:** Natural Language to SQL
- **GitHub:** [https://github.com/Arun660248/ai-data-analyst-agent](https://github.com/Arun660248/ai-data-analyst-agent)
- **Tech Stack:** Python, Pandas, SQLAlchemy, Streamlit, OpenAI / Gemini
- **Highlights:** Natural language to SQL with self-correcting execution loops (catches SQL syntax exceptions and auto-corrects).

---

## 3. Verified Certifications & Programs

| Certification / Program | Issuing Body | Date | Credential / Details | Local Asset |
| :--- | :--- | :--- | :--- | :--- |
| **Microsoft Azure (25hr)** | Microsoft Elevate × AICTE | Feb–Mar 2026 | 4-week internship, Emerging Tech | `/certificates/microsoft-azure.jpg` |
| **Cloud Admin & Engineering (40hr)** | Microsoft Elevate × AICTE | Feb–Mar 2026 | Same cohort | `/certificates/cloud-administration.jpg` |
| **Google 5-Day AI Agents Intensive** | Google & Kaggle | 2026 | Multi-agent systems, MCP, Capstone | `/certificates/kaggle-intensive.jpg` |
| **AWS AI & ML Scholars Program** | AWS & Udacity | 2026 | Challenge Phase selected, Bedrock | `/certificates/aws-scholars.jpg` |
