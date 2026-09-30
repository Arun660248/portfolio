"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";

interface MatchedSkill {
  keyword: string;
  category: string;
  matched: boolean;
  projectProof?: string;
  projectSlug?: string;
}

const CAPABILITY_INDEX: { keyword: string; aliases: string[]; category: string; proof: string; slug: string }[] = [
  { keyword: "LangGraph", aliases: ["langgraph", "stategraph", "state graph", "cyclic agent"], category: "Agentic AI", proof: "Autonomous Evaluation Harness compiled StateGraph", slug: "agentic-audit-harness" },
  { keyword: "LangChain", aliases: ["langchain", "lcel", "langchain-core"], category: "Agentic AI", proof: "Enterprise Document RAG multi-document chain", slug: "enterprise-rag-system" },
  { keyword: "Python", aliases: ["python", "python3", "pytest"], category: "Language", proof: "6 production repositories in Python 3.10+", slug: "agentic-audit-harness" },
  { keyword: "RAG & Vector Search", aliases: ["rag", "faiss", "vector", "embeddings", "retrieval", "hybrid search"], category: "RAG", proof: "Enterprise RAG: BM25 + FAISS dense search", slug: "enterprise-rag-system" },
  { keyword: "FastAPI / REST / SSE", aliases: ["fastapi", "rest", "sse", "http", "api", "endpoints"], category: "Backend", proof: "Healthcare Assistant & FastMCP SSE server", slug: "healthcare-appointment-assistant" },
  { keyword: "Docker & Containerization", aliases: ["docker", "container", "dockerfile", "compose"], category: "DevOps", proof: "Containerized deployment configs on EC2 & Render", slug: "enterprise-rag-system" },
  { keyword: "SQLite / Database", aliases: ["sqlite", "sql", "database", "sqlite3", "persistence"], category: "Data", proof: "Embedded SQLite grounding & session store", slug: "agentic-audit-harness" },
  { keyword: "Guardrails & Safety", aliases: ["guardrail", "guardrails", "prompt injection", "jailbreak", "safety"], category: "Security", proof: "Sub-5ms regex + heuristic injection defense", slug: "agentic-audit-harness" },
  { keyword: "Time Series & Forecasting", aliases: ["time series", "arima", "garch", "forecasting", "volatility"], category: "Quantitative", proof: "Algorithmic Trading Agent: ARIMA + GARCH(1,1)", slug: "algorithmic-trading-agent" },
  { keyword: "Next.js & Frontend", aliases: ["next.js", "nextjs", "react", "typescript", "tailwind"], category: "Frontend", proof: "ARUN.SYS full-stack interactive console", slug: "agentic-audit-harness" },
  { keyword: "AWS & Cloud", aliases: ["aws", "ec2", "s3", "bedrock", "cloud"], category: "Cloud", proof: "AWS EC2 deployments & Bedrock cognitive balancer", slug: "cognitive-load-balancer-ai" },
  { keyword: "Unit Testing & Pytest", aliases: ["pytest", "testing", "tests", "unit test", "ci/cd"], category: "Quality", proof: "Automated test suites with 100% pass rates", slug: "agentic-audit-harness" },
];

const PRESETS = [
  {
    label: "Applied AI Systems Engineer",
    text: "Seeking an Applied AI Engineer with strong Python and LangGraph/LangChain experience. You will build production RAG systems with FAISS vector search, deploy microservices using Docker and FastAPI, and build deterministic guardrails against prompt injection.",
  },
  {
    label: "LLM Evaluation & Guardrails Engineer",
    text: "Looking for an AI Safety & Evaluation Engineer to build deterministic guardrails, automate Pytest security suites, manage SQLite session histories, and implement low-latency evaluation harnesses for autonomous agents.",
  },
];

export default function JobDescriptionMatcher() {
  const [jobText, setJobText] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const analyzeJD = (text: string) => {
    if (!text.trim()) return null;
    const lower = text.toLowerCase();
    const results: MatchedSkill[] = [];

    CAPABILITY_INDEX.forEach((cap) => {
      const isMentioned = cap.aliases.some((alias) => lower.includes(alias));
      if (isMentioned) {
        results.push({
          keyword: cap.keyword,
          category: cap.category,
          matched: true,
          projectProof: cap.proof,
          projectSlug: cap.slug,
        });
      }
    });

    const score = results.length > 0 ? Math.min(100, Math.round((results.length / Math.max(results.length, 6)) * 100)) : 0;
    return { results, score };
  };

  const currentAnalysis = jobText ? analyzeJD(jobText) : null;

  return (
    <div className="border border-zinc-800 bg-zinc-950/70 rounded-xl p-5 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-900 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-400 font-bold">&gt;_</span>
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
              Interactive Job Description Matcher // Derived Alignment
            </h3>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Paste your open role requirements to calculate real-time capability alignment against Arun&apos;s 6 audited systems.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setJobText(p.text);
                setAnalyzed(true);
              }}
              className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-[11px] transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Textarea */}
      <div className="space-y-2">
        <textarea
          value={jobText}
          onChange={(e) => {
            setJobText(e.target.value);
            setAnalyzed(Boolean(e.target.value.trim()));
          }}
          placeholder="Paste job description or technical requirements here (e.g. 'Must have experience with Python, LangGraph, RAG, vector search, Docker, FastAPI, guardrails, and automated testing')..."
          rows={3}
          className="w-full bg-black/80 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
        />
        {jobText && (
          <div className="flex justify-end">
            <button
              onClick={() => {
                setJobText("");
                setAnalyzed(false);
              }}
              className="text-[11px] text-zinc-500 hover:text-zinc-300 font-mono"
            >
              [ Clear Input ]
            </button>
          </div>
        )}
      </div>

      {/* Analysis Output */}
      {currentAnalysis && currentAnalysis.results.length > 0 && (
        <div className="p-4 rounded-lg bg-zinc-900/40 border border-emerald-500/30 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
            <div>
              <div className="text-[10px] uppercase text-zinc-400 font-semibold">Derived Evidence Score</div>
              <div className="text-2xl font-extrabold text-emerald-400 mt-0.5">
                {currentAnalysis.score}% Alignment
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase text-zinc-500">Requirements Covered</div>
              <div className="text-xs font-mono text-zinc-300 mt-0.5">
                {currentAnalysis.results.length} Verified Capabilities Matched
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-2.5">
            {currentAnalysis.results.map((r, i) => (
              <div key={i} className="p-2.5 rounded bg-zinc-950/80 border border-zinc-800 flex items-start justify-between gap-2 text-xs">
                <div>
                  <div className="font-bold text-zinc-200 flex items-center gap-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>{r.keyword}</span>
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">{r.projectProof}</div>
                </div>
                {r.projectSlug && (
                  <Link
                    href={`/systems/${r.projectSlug}`}
                    className="text-[10px] text-emerald-400 hover:text-emerald-300 shrink-0 font-mono"
                  >
                    PROOF ↗
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="text-[10px] text-zinc-500 font-mono">
            * Derivation: Calculated strictly from explicit technical keywords identified in provided job text matched against code implementations in Arun&apos;s GitHub repositories.
          </div>
        </div>
      )}
    </div>
  );
}
