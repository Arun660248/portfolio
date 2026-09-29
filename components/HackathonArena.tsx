"use client";

import { useState } from "react";
import { HACKATHONS } from "@/data/hackathons";
import Link from "next/link";

export default function HackathonArena() {
  const [activeFilter, setActiveFilter] = useState<"all" | "agent" | "data">("all");

  const filtered = HACKATHONS.filter((h) => {
    if (activeFilter === "agent") return h.id !== "deloitte-data-analytics-2025";
    if (activeFilter === "data") return h.id === "deloitte-data-analytics-2025";
    return true;
  });

  return (
    <section className="border border-zinc-800 bg-zinc-950/70 p-6 rounded-xl font-mono space-y-5 glow-card">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-900 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-zinc-500 font-bold">&gt;_</span>
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <span>COMPETITIVE HACKATHONS &amp; INDUSTRY SIMULATIONS</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                100% VERIFIED SUBMISSIONS
              </span>
            </h3>
          </div>
          <p className="text-[11px] text-zinc-500">
            Competitive AI capstones and audited industry simulations with reproducible code &amp; credentials.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
              activeFilter === "all"
                ? "bg-zinc-800 text-emerald-400 font-bold border border-zinc-700"
                : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
            }`}
          >
            ALL ({HACKATHONS.length})
          </button>
          <button
            onClick={() => setActiveFilter("agent")}
            className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
              activeFilter === "agent"
                ? "bg-zinc-800 text-emerald-400 font-bold border border-zinc-700"
                : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
            }`}
          >
            AI AGENTS (2)
          </button>
          <button
            onClick={() => setActiveFilter("data")}
            className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
              activeFilter === "data"
                ? "bg-zinc-800 text-emerald-400 font-bold border border-zinc-700"
                : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
            }`}
          >
            DATA &amp; FORENSICS (1)
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((h) => (
          <div
            key={h.id}
            className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/90 space-y-3 flex flex-col justify-between hover:border-zinc-700 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                    h.status === "completed"
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-800/50"
                      : "bg-cyan-950 text-cyan-400 border border-cyan-800/50"
                  }`}
                >
                  {h.badge}
                </span>
                <span className="text-[10px] text-zinc-500">{h.date}</span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-zinc-200">{h.title}</h4>
                <div className="text-[11px] text-zinc-400 mt-0.5">{h.organizer} // {h.track}</div>
              </div>

              <div className="p-2.5 rounded bg-zinc-950/60 border border-zinc-800/80 text-[11px] text-zinc-300 leading-relaxed">
                <span className="text-zinc-500 font-bold block text-[9px] uppercase mb-0.5">PROBLEM STATEMENT</span>
                {h.problemStatement}
              </div>

              <div className="p-2.5 rounded bg-zinc-950/60 border border-zinc-800/80 text-[11px] text-zinc-300 leading-relaxed">
                <span className="text-emerald-400 font-bold block text-[9px] uppercase mb-0.5">ENGINEERED ARCHITECTURE</span>
                {h.architectureSummary}
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-900 space-y-3">
              <div className="flex flex-wrap gap-1">
                {h.stack.map((s) => (
                  <span key={s} className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                {h.projectSlug ? (
                  <Link
                    href={`/systems/${h.projectSlug}`}
                    className="text-emerald-400 hover:text-emerald-300 text-[11px] font-bold transition-colors"
                  >
                    INSPECT ARCHITECTURE →
                  </Link>
                ) : (
                  <span className="text-[10px] text-zinc-500">PROTOTYPING IN PROGRESS</span>
                )}
                {h.submissionUrl && (
                  <a
                    href={h.submissionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-400 hover:text-white text-[11px] transition-colors"
                  >
                    SUBMISSION / REPO ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
