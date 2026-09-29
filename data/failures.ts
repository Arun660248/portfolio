import { FailureAnalysis } from "@/types/failure";

export const SYSTEM_FAILURES: FailureAnalysis[] = [
  {
    projectSlug: "algorithmic-trading-agent",
    triggerEvent: "High-impact macro economic news shocks (e.g., CPI / Fed rate announcements)",
    observedFailure: "Forecast error spikes beyond 5% MAPE baseline, lagging during rapid trend reversals.",
    rootCause: "ARIMA quantitative models operate strictly on historical numerical price series, blind to semantic news sentiment.",
    mitigationEngineered: "Architected a decoupled FastMCP sentiment tool layer that scans live feeds and dynamically dampens quantitative weights during breaking news.",
    status: "mitigated",
  },
  {
    projectSlug: "enterprise-rag-system",
    triggerEvent: "Multi-worker horizontal scaling under concurrent enterprise query load",
    observedFailure: "Local in-memory FAISS index divergence across distributed worker instances without shared state synchronization.",
    rootCause: "FAISS is an embedded in-process library lacking native network replication and transactional clustering.",
    mitigationEngineered: "Engineered a vector store adapter layer supporting hot-swappable local FAISS for rapid dev testing and distributed Qdrant/pgvector for production multi-node deployments.",
    status: "mitigated",
  },
  {
    projectSlug: "ai-financial-analyst",
    triggerEvent: "Concurrent multi-user requests querying stock tickers simultaneously",
    observedFailure: "Charts failed to appear properly or showed swapped ticker data: saving to a static local file caused concurrent requests to switch/overwrite the file before the previous response finished streaming.",
    rootCause: "Writing to a shared local server file creates race conditions across asynchronous FastAPI workers, breaking multi-user request isolation.",
    mitigationEngineered: "Eliminated local disk persistence completely. Configured headless Matplotlib ('Agg') to render directly into isolated in-memory io.BytesIO byte streams returned via base64.",
    status: "mitigated",
  },
  {
    projectSlug: "cognitive-load-balancer",
    triggerEvent: "Deep task-dependency trees with high token volume and nested sub-chains",
    observedFailure: "Sequential multi-prompt chaining created cumulative latency bottlenecks exceeding 8 seconds per task graph.",
    rootCause: "Synchronous linear chaining blocked execution while waiting for non-dependent intermediate sub-tasks to resolve.",
    mitigationEngineered: "Restructured task graph with prompt-level concurrency limits, executing independent task branches in parallel before final ROI synthesis.",
    status: "mitigated",
  },
  {
    projectSlug: "healthcare-appointment-assistant",
    triggerEvent: "Ambiguous patient conversational phrasing during time-slot selection (e.g., 'next Tuesday morning')",
    observedFailure: "LLM hallucinated non-existent clinic calendar slots, risking double-booked practitioner schedules.",
    rootCause: "Over-reliance on LLM generative outputs without deterministic calendar API slot validation.",
    mitigationEngineered: "Inserted a strict deterministic guardrail: conversational slot suggestions must pass an automated real-time Salesforce schedule verification checkpoint before booking confirmation.",
    status: "mitigated",
  },
  {
    projectSlug: "agentic-audit-harness",
    triggerEvent: "Adversarial circular prompting designed to trigger recursive reflection loops",
    observedFailure: "Unbounded graph recursion cycles consuming excessive LLM tokens and causing execution timeouts.",
    rootCause: "Cyclic state graphs without hard iteration bounds can loop indefinitely when refinement conditions fail to converge.",
    mitigationEngineered: "Engineered a deterministic recursion limiter (max_iterations=3) and an automated fallback refusal gate triggering when factual evaluation score remains below 0.85 after two cycles.",
    status: "mitigated",
  },
];
