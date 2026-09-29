"use client";

import { useState } from "react";
import Link from "next/link";
import { ROLES_DATA } from "@/data/roles";
import { PROJECTS } from "@/data/projects";

export default function EvaluatePage() {
  const [selectedRoleId, setSelectedRoleId] = useState<string>("agentic");
  const [copied, setCopied] = useState(false);

  const activeRole = ROLES_DATA.find((r) => r.id === selectedRoleId) || ROLES_DATA[0];

  // Resolve projects backing this role
  const backedProjects = activeRole.backedProjectSlugs
    .map((slug) => PROJECTS.find((p) => p.slug === slug))
    .filter(Boolean);

  const handleCopyATS = () => {
    navigator.clipboard.writeText(activeRole.atsCandidateSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 sm:p-8 font-mono">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Telemetry Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 rounded">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            RECRUITER LENS // CANDIDATE EVALUATION DOSSIER
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
            Role Fit Evaluation <span className="text-zinc-500 font-normal">// Evidence Matcher</span>
          </h1>

          <p className="text-zinc-400 text-sm max-w-3xl leading-relaxed">
            Evaluate Arun Jyoti Chakraborty against your specific open requirements. Transparent evidence match 
            scores, direct repository proofs, and 1-click ATS summary notes formatted for hiring managers.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="space-y-2">
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
            Select Hiring Focus Lens:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {ROLES_DATA.map((role) => {
              const isSelected = role.id === selectedRoleId;
              return (
                <button
                  key={role.id}
                  id={`role-btn-${role.id}`}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? "bg-zinc-900 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                      : "bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className={`font-bold ${isSelected ? "text-emerald-400" : "text-zinc-200"}`}>
                      {role.matchScore}%
                    </span>
                    <span className="text-[9px] text-zinc-500 uppercase">MATCH</span>
                  </div>
                  <div className="text-xs font-semibold text-zinc-100 line-clamp-1">
                    {role.roleName}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Role Dossier */}
        <div className="border border-zinc-800 bg-zinc-950/80 rounded-xl p-6 sm:p-7 space-y-7 shadow-2xl">
          {/* Header & Match Score Ribbon */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-800 pb-5">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/40">
                  {activeRole.matchGrade}
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  SCORE: {activeRole.matchScore} / 100
                </span>
              </div>
              <h2 className="text-2xl font-bold text-zinc-100">
                {activeRole.roleName}
              </h2>
              <div className="text-xs text-zinc-400 font-mono leading-relaxed">
                {activeRole.targetFocus}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed pt-1">
                {activeRole.summaryRationale}
              </p>
            </div>

            {/* Match Dial Box */}
            <div className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 text-center shrink-0 min-w-[120px]">
              <div className="text-[10px] uppercase text-zinc-500 font-semibold">Evidence Match</div>
              <div className="text-3xl font-extrabold text-emerald-400 mt-1">
                {activeRole.matchScore}%
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">Verified Proofs</div>
            </div>
          </div>

          {/* 01. Why Hire Arun ROI */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                01. &quot;Why Hire Arun?&quot; // Business ROI & Tangible Impact
              </h3>
              <span className="text-[10px] text-zinc-500">FOR HIRING MANAGERS</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              {activeRole.whyHireROI.map((bullet, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 flex items-start gap-2.5"
                >
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <p className="text-zinc-300 leading-relaxed">{bullet}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 02. Requirement to Proof Matrix */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                02. Role Requirement to Repository Proof Matrix
              </h3>
              <span className="text-[10px] text-zinc-500">EMPIRICAL BENCHMARKS</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              {activeRole.requirementsMatrix.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-zinc-900/50 border border-zinc-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-zinc-200">
                      {item.requirement}
                    </span>
                    <span className="text-[9px] uppercase font-semibold px-1.5 py-0.5 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-500/30">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed text-[11px]">
                    {item.proof}
                  </p>
                  <div className="text-[10px] text-zinc-500 font-mono pt-1 border-t border-zinc-800/60">
                    Repo Proof: <span className="text-zinc-400">{item.repoEvidence}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 03. Backed Systems */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                03. Verified Production Systems Backing This Role
              </h3>
              <span className="text-[10px] text-zinc-500">INTERACTIVE INSPECTOR</span>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              {backedProjects.map((project) => project && (
                <Link
                  key={project.slug}
                  href={`/systems/${project.slug}`}
                  className="p-3 rounded-lg bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 transition-all group space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase text-zinc-500 font-semibold">
                      {project.category}
                    </span>
                    <span className="text-emerald-400 text-xs group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </div>
                  <div className="font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {project.title}
                  </div>
                  <div className="text-[10px] text-zinc-500 line-clamp-1">
                    {project.tagline}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 04. 1-Click ATS Candidate Summary */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                04. 1-Click ATS Candidate Summary for Hiring Manager / Slack
              </h3>
              <span className="text-[10px] text-zinc-500">PRE-FORMATTED NOTES</span>
            </div>

            <div className="p-4 rounded-lg bg-black/90 border border-zinc-800 space-y-3 font-mono text-xs">
              <pre className="text-zinc-300 text-[11px] leading-relaxed whitespace-pre-wrap">
                {activeRole.atsCandidateSummary}
              </pre>

              <button
                id="copy-ats-btn"
                onClick={handleCopyATS}
                className={`w-full py-2.5 px-4 rounded font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  copied
                    ? "bg-emerald-400 text-black shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                    : "bg-emerald-500 hover:bg-emerald-400 text-black"
                }`}
              >
                <span>{copied ? "COPIED TO CLIPBOARD ✓" : "COPY CANDIDATE NOTES FOR SLACK / ATS"}</span>
                <span>{copied ? "✓" : "📋"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
