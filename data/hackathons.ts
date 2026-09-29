import { HackathonEntry } from "@/types/hackathon";

export const HACKATHONS: HackathonEntry[] = [
  {
    id: "google-kaggle-agents-2025",
    title: "Google-Kaggle AI Agents Intensive Capstone",
    organizer: "Google & Kaggle",
    date: "December 2025",
    status: "completed",
    track: "Multi-Agent Orchestration & Protocol Tools",
    problemStatement:
      "Design an autonomous research agent capable of retrieving live quantitative market data and executing mathematical forecasts without hallucination.",
    architectureSummary:
      "Decoupled Google ADK with FastMCP tool server over HTTP/SSE, executing pmdarima ARIMA forecasts with strict Pytest refusal guardrails.",
    stack: ["Google ADK", "Gemini 1.5 Pro", "FastMCP", "ARIMA", "Docker"],
    projectSlug: "algorithmic-trading-agent",
    submissionUrl: "https://github.com/Arun660248/Algorithmic-Trading-Predictive-Research-Agent",
    badge: "COMPLETED // CAPSTONE",
  },
  {
    id: "aws-partyrock-genai-2025",
    title: "AWS PartyRock Generative AI Challenge",
    organizer: "Amazon Web Services (AWS)",
    date: "October 2025",
    status: "completed",
    track: "Cognitive Productivity & Workflow Automation",
    problemStatement:
      "Mitigate context-switching cognitive fatigue by automatically triaging unstructured brain-dumps into high-ROI time-boxed actions.",
    architectureSummary:
      "4-stream prompt chaining engine on Amazon Bedrock decomposing high-stress deadlines into discrete 5-minute actionable micro-steps.",
    stack: ["Amazon Bedrock", "AWS PartyRock", "Prompt Chaining", "Constraint Logic"],
    projectSlug: "cognitive-load-balancer",
    submissionUrl: "https://partyrock.aws/u/ArunJyotiChakraborty/gbrxCX4TD/cognitive-load-balancer-ai",
    badge: "VERIFIED SUBMISSION",
  },
  {
    id: "deloitte-data-analytics-2025",
    title: "Deloitte Data Analytics & Forensic Simulation",
    organizer: "Deloitte (Forage)",
    date: "November 2025",
    status: "completed",
    track: "Forensic Technology & Telemetry Analytics",
    problemStatement:
      "Detect forensic data anomalies and financial telemetry irregularities across enterprise audit records.",
    architectureSummary:
      "Exploratory forensic analysis isolating statistical outliers and transaction anomalies. Verified by credential nk9tsHxtvMgmcQY2a.",
    stack: ["Python", "Forensic Analytics", "Data Modeling", "Tableau"],
    submissionUrl: "https://www.theforage.com/simulations/deloitte/data-analytics-eyjh",
    badge: "VERIFIED SIMULATION",
  },
];
