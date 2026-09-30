"use client";

import { Project } from "@/types/project";
import Link from "next/link";
import { useSystemStatus } from "@/lib/hooks/useSystemStatus";

export function ProjectCard({ project }: { project: Project }) {
  const { getStatus, isLoading } = useSystemStatus();
  const health = getStatus(project.slug);
  const isOnline = health ? health.isOnline : true; // default optimistic until probe loads
  return (
    <article className="glow-card border border-zinc-800/90 bg-zinc-950/70 p-6 rounded-xl font-mono backdrop-blur-sm group">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold px-2 py-0.5 bg-emerald-950/50 border border-emerald-800/50 rounded">
            {project.category}
          </span>
          {isOnline ? (
            <span className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              {health?.latencyMs ? `ONLINE • ${health.latencyMs}ms` : "LIVE"}
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[10px] text-amber-400/90 font-mono px-1.5 py-0.2 rounded bg-amber-950/50 border border-amber-600/40">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
              DORMANT (AWS)
            </span>
          )}
        </div>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-zinc-400 hover:text-zinc-100 underline decoration-zinc-700 hover:decoration-zinc-400"
          >
            GitHub ↗
          </a>
        )}
      </div>

      <div className="flex items-start justify-between gap-4 mb-2">
        <h2 className="text-xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
          <Link href={`/systems/${project.slug}`} className="hover:underline">
            {project.title}
          </Link>
        </h2>
        <Link
          href={`/systems/${project.slug}`}
          className="shrink-0 text-xs px-3 py-1 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-300 group-hover:border-emerald-500/50 group-hover:text-emerald-400 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.25)] transition-all"
        >
          Inspect →
        </Link>
      </div>

      <p className="text-zinc-400 text-xs leading-relaxed mb-4">{project.tagline}</p>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-[11px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Verified Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800/80">
        {project.metrics.map((m) => (
          <div key={m.label} className="bg-zinc-900/40 p-2.5 rounded border border-zinc-800/60">
            <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
              <span>{m.label}</span>
              {m.verified && (
                <span className="text-emerald-400 text-[9px] px-1 py-0.2 bg-emerald-950/60 border border-emerald-500/30 rounded">
                  ✓ VERIFIED
                </span>
              )}
            </div>
            <div className="text-base font-bold text-zinc-100">{m.value}</div>
            {m.change && <div className="text-[10px] text-zinc-500 mt-0.5">{m.change}</div>}
          </div>
        ))}
      </div>

      {/* Evidence Footer & Live Demo */}
      <div className="mt-4 pt-3 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-1.5 text-zinc-400">
          <span className="text-zinc-600 font-semibold">PROOF:</span>
          <span className="text-zinc-300">{project.evidenceSummary}</span>
        </div>
        {project.liveUrl && (
          project.slug === "agentic-audit-harness" ? (
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-arun-agent"));
              }}
              className="text-emerald-400 hover:text-emerald-300 font-semibold underline decoration-emerald-800 cursor-pointer"
            >
              Run Live (ARUN.AI) ↗
            </button>
          ) : isOnline ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold underline decoration-emerald-800"
            >
              Live Demo ↗
            </a>
          ) : (
            <Link
              href={`/systems/${project.slug}`}
              title="AWS EC2 instance dormant to conserve cloud credits. Inspect verified architecture & code."
              className="text-amber-400 hover:text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-950/40 border border-amber-500/30 transition-colors"
            >
              Dormant (AWS) → Inspect
            </Link>
          )
        )}
      </div>
    </article>
  );
}
