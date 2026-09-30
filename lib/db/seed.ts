import { getDb, initDb } from "./client";

export interface KnowledgeFact {
  id: string;
  entity: string;
  category: string;
  content: string;
  targetRoute: string;
  claimMetric: string;
}

export const SEED_FACTS: KnowledgeFact[] = [
  {
    id: "fact-trading",
    entity: "Algorithmic Trading Agent",
    category: "project",
    content: "Arun built the Algorithmic Trading Agent on AWS EC2, combining ARIMA and GARCH(1,1) volatility forecasting with FinBERT market sentiment. Verified sub-32ms decision latency and automated stop-loss guardrails.",
    targetRoute: "/systems/algorithmic-trading-agent",
    claimMetric: "~5% MAPE on 30D Live Data, 31.8ms Latency",
  },
  {
    id: "fact-rag",
    entity: "Enterprise Document RAG",
    category: "project",
    content: "Arun engineered the Enterprise Document RAG System pairing BM25 keyword search with FAISS dense vector embeddings. Solved multi-process reader-writer lock contention on AWS EC2.",
    targetRoute: "/systems/enterprise-rag-system",
    claimMetric: "85% Research Time Reduction, Sub-1.2s P95 Latency",
  },
  {
    id: "fact-finai",
    entity: "AI Financial Analyst",
    category: "project",
    content: "Arun developed the AI Financial Analyst autonomously auditing SEC 10-K filings with Yahoo Finance market feeds, backed by strict mathematical balance sheet sanity checks.",
    targetRoute: "/systems/ai-financial-analyst",
    claimMetric: "100% SEC 10-K Data Integrity, Zero File Overwrite Race Conditions",
  },
  {
    id: "fact-loadbalancer",
    entity: "Cognitive Load Balancer AI",
    category: "project",
    content: "Arun architected the Cognitive Load Balancer using Amazon Bedrock and AWS Partyrock to prioritize high-ROI tasks and eliminate decision fatigue.",
    targetRoute: "/systems/cognitive-load-balancer",
    claimMetric: "Multi-Step Prompt Chaining, Real-Time ROI Scoring",
  },
  {
    id: "fact-healthcare",
    entity: "Healthcare Appointment Assistant (MyEyeDr)",
    category: "project",
    content: "Arun developed the Healthcare Appointment Assistant using Tars NeoAgent, LLM RAG, and bi-directional Salesforce CRM webhooks for MyEyeDr patient triage, intent classification, and automated appointment booking.",
    targetRoute: "/systems/healthcare-appointment-assistant",
    claimMetric: "Tars NeoAgent, Salesforce API, 100% Automated Intake",
  },
  {
    id: "fact-harness",
    entity: "Agentic Audit Harness",
    category: "project",
    content: "Arun engineered the Autonomous Agentic Evaluation & Guardrail Harness using LangGraph, Gemini 2.5 Flash, and embedded SQLite memory with 100% injection blocking.",
    targetRoute: "/systems/agentic-audit-harness",
    claimMetric: "100% Injection Defense, 98.4% Factual Grounding",
  },
  {
    id: "fact-iitg",
    entity: "IIT Guwahati Academic Groundwork",
    category: "academic",
    content: "Arun is a 3rd-year B.Sc. (Hons.) Data Science & AI student at IIT Guwahati with completed coursework in Time Series Analysis (DA 210), Machine Learning (DA 261), and Optimization (DA 203).",
    targetRoute: "/about",
    claimMetric: "14 Verified IIT Guwahati Degree Courses",
  },
  {
    id: "fact-failures",
    entity: "Honest Engineering Failures",
    category: "failure",
    content: "Arun documents production post-mortems including FAISS index lock contention and ARIMA stationarity shocks, with 100% engineered mitigations in production.",
    targetRoute: "/failures",
    claimMetric: "100% Mitigated Failure Audit Trail",
  },
  {
    id: "fact-contact",
    entity: "Availability & Contact",
    category: "contact",
    content: "Arun Jyoti Chakraborty is based in West Bengal, India, and is available immediately for remote AI engineering roles via WhatsApp +91 7439524613 or arunjyotichakraborty18@gmail.com.",
    targetRoute: "https://wa.me/917439524613",
    claimMetric: "Available Immediately for Remote AI Roles",
  },
];

export async function seedKnowledgeBase(): Promise<void> {
  await initDb();
  const db = getDb();

  const countRes = await db.execute("SELECT COUNT(*) as count FROM knowledge_base");
  const count = Number(countRes.rows[0]?.count ?? 0);

  if (count === 0) {
    for (const f of SEED_FACTS) {
      await db.execute({
        sql: `INSERT INTO knowledge_base (id, entity, category, content, target_route, claim_metric)
              VALUES (?, ?, ?, ?, ?, ?)`,
        args: [f.id, f.entity, f.category, f.content, f.targetRoute, f.claimMetric],
      });
    }
  }
}
