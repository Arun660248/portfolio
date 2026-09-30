"use client";

import { useState } from "react";
import Link from "next/link";
import { SYSTEM_FAILURES } from "@/data/failures";
import { PROJECTS } from "@/data/projects";

export default function FailuresPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Map each failure to its parent project for rich metadata
  const failuresWithProjects = SYSTEM_FAILURES.map((failure) => {
    const project = PROJECTS.find((p) => p.slug === failure.projectSlug);
    return {
      ...failure,
      projectTitle: project?.title || failure.projectSlug,
      category: project?.category || "agent",
      githubUrl: project?.githubUrl,
      liveUrl: project?.liveUrl,
    };
  });

  const categories = [
    "all",
    ...Array.from(new Set(failuresWithProjects.map((f) => f.category))),
  ];

  const filteredFailures =
    selectedCategory === "all"
      ? failuresWithProjects
      : failuresWithProjects.filter((f) => f.category === selectedCategory);

  return (
    <main className="min-h-screen bg-black text-white p-6 sm:p-8 font-mono">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Telemetry Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs border border-amber-500/40 bg-amber-950/30 text-amber-400 rounded">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            INCIDENT TELEMETRY // HONEST ENGINEERING LOGS
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
            System Post-Mortems <span className="text-zinc-500 font-normal">// Failure Diagnostics</span>
          </h1>

          <p className="text-zinc-400 text-sm max-w-3xl leading-relaxed">
            Real production AI systems do not fail gracefully by default. True engineering credibility
            is demonstrated by diagnosing edge-case failures, identifying exact root causes, and deploying
            deterministic architectural mitigations.
          </p>
        </div>

        {/* Global Audit Metric Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border border-zinc-800 bg-zinc-950/60 p-4 rounded-lg text-xs">
          <div>
            <div className="text-zinc-500 uppercase text-[10px]">Documented Incidents</div>
            <div className="text-lg font-bold text-zinc-200 mt-0.5">
              {String(failuresWithProjects.length).padStart(2, "0")} Cases
            </div>
          </div>
          <div>
            <div className="text-zinc-500 uppercase text-[10px]">Mitigation Rate</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">100% Resolved</div>
          </div>
          <div>
            <div className="text-zinc-500 uppercase text-[10px]">Blast Radius</div>
            <div className="text-lg font-bold text-zinc-200 mt-0.5">Isolated</div>
          </div>
          <div>
            <div className="text-zinc-500 uppercase text-[10px]">Verification Scope</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">4 Live · 2 Dormant/Replay</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 uppercase mr-1">Filter:</span>
            {categories.map((cat) => {
              const count =
                cat === "all"
                  ? failuresWithProjects.length
                  : failuresWithProjects.filter((f) => f.category === cat).length;
              return (
                <button
                  key={cat}
                  id={`filter-btn-${cat}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-2.5 py-1 rounded transition-colors uppercase ${
                    selectedCategory === cat
                      ? "bg-zinc-800 text-emerald-400 font-bold border border-zinc-700"
                      : "text-zinc-400 hover:text-zinc-200 bg-zinc-900/50 hover:bg-zinc-900"
                  }`}
                >
                  {cat} [{count}]
                </button>
              );
            })}
          </div>
          <span className="text-[10px] text-zinc-500 hidden sm:inline">
            SHOWING {filteredFailures.length} OF {SYSTEM_FAILURES.length}
          </span>
        </div>

        {/* Post-Mortem Cards */}
        <div className="grid gap-6">
          {filteredFailures.map((failure, idx) => (
            <article
              key={failure.projectSlug}
              id={`failure-card-${failure.projectSlug}`}
              className="border border-zinc-800 hover:border-zinc-700 bg-zinc-950/70 rounded-lg p-5 sm:p-6 space-y-4 transition-colors"
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                    INCIDENT #{String(idx + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-base font-bold text-zinc-100">
                    {failure.projectTitle}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                    {failure.category}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/40">
                    STATUS: {failure.status}
                  </span>
                </div>
              </div>

              {/* Forensic Breakdown Grid */}
              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                {/* 01. Trigger */}
                <div className="p-3 rounded bg-zinc-900/50 border border-zinc-800/60 space-y-1">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    01. Trigger Condition
                  </div>
                  <p className="text-zinc-300 leading-relaxed">
                    {failure.triggerEvent}
                  </p>
                </div>

                {/* 02. Observed Failure */}
                <div className="p-3 rounded bg-rose-950/20 border border-rose-900/30 space-y-1">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    02. Observed Failure
                  </div>
                  <p className="text-zinc-300 leading-relaxed">
                    {failure.observedFailure}
                  </p>
                </div>

                {/* 03. Root Cause */}
                <div className="p-3 rounded bg-zinc-900/50 border border-zinc-800/60 space-y-1">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                    03. Technical Root Cause
                  </div>
                  <p className="text-zinc-300 leading-relaxed font-mono text-[11px]">
                    {failure.rootCause}
                  </p>
                </div>

                {/* 04. Mitigation */}
                <div className="p-3 rounded bg-emerald-950/20 border border-emerald-900/40 space-y-1">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    04. Engineered Mitigation
                  </div>
                  <p className="text-zinc-300 leading-relaxed">
                    {failure.mitigationEngineered}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-900 text-xs">
                <Link
                  href={`/systems/${failure.projectSlug}`}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 group"
                >
                  <span>INSPECT SYSTEM ARCHITECTURE</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </Link>

                {failure.githubUrl && (
                  <a
                    href={failure.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    GitHub Repo ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
