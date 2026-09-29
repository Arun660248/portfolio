import { StateGraph, START, END } from "@langchain/langgraph";
import { GoogleGenAI } from "@google/genai";
import { AgentStateAnnotation, AgentState } from "./state";
import { detectPromptInjection, evaluateOutputFaithfulness } from "./guardrails";
import { searchKnowledgeBase, saveAuditTurn, getAuditHistory } from "@/lib/db/retriever";

// Node 1: Input Guardrail Scanner
async function inputGuardrailNode(state: AgentState): Promise<Partial<AgentState>> {
  const start = Date.now();
  const isInjection = detectPromptInjection(state.query);
  const latencyMs = Date.now() - start;

  if (isInjection) {
    return {
      guardrailViolation: "ADVERSARIAL_INJECTION_BLOCKED",
      finalAnswer:
        "SECURITY GUARDRAIL TRIGGERED: Query was flagged as an adversarial prompt injection or system override attempt. Request safely refused.",
      evalScore: 1.0,
      citations: [],
      trace: [...(state.trace || []), { node: "input_guardrail", latencyMs }],
    };
  }

  return {
    guardrailViolation: null,
    trace: [...(state.trace || []), { node: "input_guardrail", latencyMs }],
  };
}

// Node 2: SQLite Factual & Context Retrieval
async function dbRetrievalNode(state: AgentState): Promise<Partial<AgentState>> {
  const start = Date.now();
  const history = await getAuditHistory(state.sessionId);
  const retrievedFacts = await searchKnowledgeBase(state.query, state.pathname);
  const latencyMs = Date.now() - start;

  return {
    history,
    retrievedFacts,
    trace: [...(state.trace || []), { node: "db_retrieval", latencyMs }],
  };
}

// Node 3: Grounded Gemini 2.5 Flash Inference
async function geminiInferenceNode(state: AgentState): Promise<Partial<AgentState>> {
  const start = Date.now();
  const apiKey = state.apiKey || process.env.GEMINI_API_KEY;

  const factsText = state.retrievedFacts
    .map((f) => `- [${f.entity} (${f.category})]: ${f.content} (Metric: ${f.claimMetric})`)
    .join("\n");

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const pageInfo = state.pathname ? `CURRENT PAGE LOCATION: User is viewing "${state.pathname}". If they ask "what is this" or about this page, explain this specific system or section.\n` : "";
      const prompt = `You are ARUN.AI, an expert technical auditor representing Arun Jyoti Chakraborty (B.Sc. Data Science & AI at IIT Guwahati).
${pageInfo}STRICT ANTI-HALLUCINATION RULE: Cite ONLY the exact technologies, metrics, and architecture explicitly present in the VERIFIED GROUND TRUTH below. NEVER invent unlisted frameworks or tools (e.g. do not invent Python, Flask, spaCy, or PostgreSQL unless explicitly in ground truth). If a system uses Tars NeoAgent or Salesforce CRM, cite those specifically.
Keep your response CONCISE (strictly 2 to 3 sentences, ~50-75 words).

VERIFIED GROUND TRUTH:
${factsText}

USER QUERY:
${state.query}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const rawResponse = response.text || "No response generated.";
      const latencyMs = Date.now() - start;
      return {
        rawResponse,
        finalAnswer: rawResponse,
        trace: [...(state.trace || []), { node: "gemini_inference", latencyMs }],
      };
    } catch {
      // Fallback to grounded synthesis if API error occurs
    }
  }

  // Intelligent Grounded Synthesis Fallback (Tailored when API key is not configured)
  const q = state.query.toLowerCase();
  const path = (state.pathname || "/").toLowerCase();
  let synthesis = "Arun Jyoti Chakraborty builds and deploys production AI systems on AWS EC2.";

  if (q.includes("what is this") || q.includes("explain this") || q.includes("where am i") || q.includes("current page")) {
    if (path.includes("algorithmic-trading")) {
      synthesis = "You are currently inspecting Arun's Algorithmic Trading & Predictive Research Agent. It couples FastMCP tool calling with ARIMA/GARCH forecasting, evaluated at ~5% MAPE on live 30-day market data with automated sub-35ms stop-loss execution.";
    } else if (path.includes("enterprise-rag")) {
      synthesis = "You are inspecting Arun's Enterprise Document RAG System on AWS EC2. It features hybrid BM25 + FAISS dense retrieval and incorporates an asynchronous lock coordinator that mitigated reader-writer contention, reducing research latency by 85%.";
    } else if (path.includes("about")) {
      synthesis = "You are on Arun's About page, showcasing his background as a 2nd-year B.Sc. Data Science & AI student at IIT Guwahati, his 14 completed technical courses (like DA 210 Time Series and DA 261 ML), and his terminal-first engineering philosophy.";
    } else if (path.includes("healthcare")) {
      synthesis = "You are inspecting Arun's Healthcare Appointment Assistant (MyEyeDr). It integrates Tars NeoAgent conversational triage with live bi-directional Salesforce CRM webhooks for automated lead booking and patient intake.";
    } else if (path.includes("financial") || path.includes("finai")) {
      synthesis = "You are viewing Arun's AI Financial Analyst, an autonomous agent auditing SEC 10-K filings paired with live Yahoo Finance feeds and mathematical balance sheet checks.";
    } else if (path.includes("load-balancer") || path.includes("cognitive")) {
      synthesis = "You are inspecting the Cognitive Load Balancer AI on Amazon Bedrock and AWS Partyrock, chaining prompts to prioritize high-ROI tasks and eliminate decision fatigue.";
    } else if (path.includes("harness")) {
      synthesis = "You are testing the Autonomous Agentic Evaluation & Guardrail Harness itself — a LangGraph cyclic state machine enforcing zero-latency input guardrails and SQLite memory.";
    } else if (path.includes("failures")) {
      synthesis = "You are viewing the Honest Engineering Incident Directory, detailing real post-mortems and root-cause fixes across Arun's deployed AWS EC2 systems.";
    } else {
      synthesis = "You are on the ARUN.SYS main console, featuring 6 audited production AI systems deployed across AWS EC2, complete with live benchmarks and verifiable architectural workflows.";
    }
  } else if (q.includes("arima") || q.includes("trading") || q.includes("quant")) {
    synthesis = "Arun's quantitative modeling expertise is proven in his Algorithmic Trading Agent deployed on AWS EC2. Rather than theoretical exercises, Arun combined ARIMA time-series forecasting with GARCH(1,1) volatility modeling to achieve ~5% MAPE on live 30-day market data, backed by automated stop-loss safety guardrails operating at a verified 31.8ms decision latency.";
  } else if (q.includes("faiss") || q.includes("rag") || q.includes("concurrency")) {
    synthesis = "In his Enterprise Document RAG system, Arun engineered a hybrid retrieval pipeline pairing BM25 keyword search with FAISS dense vector embeddings. During production horizontal scaling, he isolated and mitigated a critical reader-writer index lock contention failure by building an asynchronous lock coordinator, reducing research latency by 85%.";
  } else if (q.includes("iit") || q.includes("course") || q.includes("education") || q.includes("study")) {
    synthesis = "Arun is a 2nd-year B.Sc. (Hons.) Data Science & AI student at IIT Guwahati. He has completed 14 rigorous academic courses including Time Series Analysis (DA 210), Machine Learning (DA 261), Optimization (DA 203), and Algorithms (DA 111), directly applying theoretical mathematical models into containerized production services.";
  } else if (q.includes("hire") || q.includes("why") || q.includes("role") || q.includes("candidate")) {
    synthesis = "Arun is a terminal-first builder who takes full ownership of the hardest half of AI engineering: deployment, deterministic guardrails, database concurrency, and sub-second p95 latency. He has deployed 4 systems live on AWS EC2 and is immediately available for remote AI engineering roles.";
  } else if (state.retrievedFacts.length > 0) {
    const primary = state.retrievedFacts[0];
    synthesis = `Regarding ${primary.entity}: ${primary.content} This system is verified in production with a benchmark of ${primary.claimMetric}.`;
  }
  const latencyMs = Date.now() - start;

  return {
    rawResponse: synthesis,
    finalAnswer: synthesis,
    trace: [...(state.trace || []), { node: "gemini_inference", latencyMs }],
  };
}

// Node 4: Output Evaluation & Citation Generation
async function evalGuardrailNode(state: AgentState): Promise<Partial<AgentState>> {
  const start = Date.now();
  const { score, citations } = evaluateOutputFaithfulness(
    state.rawResponse || state.finalAnswer,
    state.retrievedFacts || []
  );
  const latencyMs = Date.now() - start;

  return {
    evalScore: score,
    citations,
    trace: [...(state.trace || []), { node: "eval_guardrail", latencyMs }],
  };
}

// Node 5: SQLite Turn Persistence
async function dbPersistNode(state: AgentState): Promise<Partial<AgentState>> {
  const start = Date.now();
  const totalLatency = (state.trace || []).reduce((sum, t) => sum + t.latencyMs, 0);

  await saveAuditTurn(
    state.sessionId,
    state.query,
    state.finalAnswer,
    state.citations || [],
    state.evalScore || 1.0,
    totalLatency
  );
  const latencyMs = Date.now() - start;

  return {
    trace: [...(state.trace || []), { node: "db_persist", latencyMs }],
  };
}

// Conditional Routing Logic
function routeGuardrail(state: AgentState): "db_persist" | "db_retrieval" {
  return state.guardrailViolation ? "db_persist" : "db_retrieval";
}

// Compile LangGraph State Machine
const workflow = new StateGraph(AgentStateAnnotation)
  .addNode("input_guardrail", inputGuardrailNode)
  .addNode("db_retrieval", dbRetrievalNode)
  .addNode("gemini_inference", geminiInferenceNode)
  .addNode("eval_guardrail", evalGuardrailNode)
  .addNode("db_persist", dbPersistNode)
  .addEdge(START, "input_guardrail")
  .addConditionalEdges("input_guardrail", routeGuardrail)
  .addEdge("db_retrieval", "gemini_inference")
  .addEdge("gemini_inference", "eval_guardrail")
  .addEdge("eval_guardrail", "db_persist")
  .addEdge("db_persist", END);

export const agentGraph = workflow.compile();
