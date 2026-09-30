"use client";

import { useState } from "react";
import { Project } from "@/types/project";
import { FailureAnalysis } from "@/types/failure";
import { SystemWorkflow } from "@/types/workflow";
import { WorkflowCanvas } from "@/components/WorkflowCanvas";
import InteractiveHarnessDemo from "@/components/InteractiveHarnessDemo";
import StudioAudioPlayer from "@/components/StudioAudioPlayer";
import InteractiveQuantSimulator from "@/components/InteractiveQuantSimulator";
import { useSystemStatus } from "@/lib/hooks/useSystemStatus";
import Link from "next/link";

interface SystemDetailCockpitProps {
  project: Project;
  failure?: FailureAnalysis;
  workflow?: SystemWorkflow;
  slug: string;
}

type TabType = "architecture" | "metrics" | "failure" | "demo";

export default function SystemDetailCockpit({
  project,
  failure,
  workflow,
  slug,
}: SystemDetailCockpitProps) {
  const [activeTab, setActiveTab] = useState<TabType>("architecture");
  const { getStatus } = useSystemStatus();
  const health = getStatus(project.slug);
  const isOnline = health ? health.isOnline : true;

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="border-b border-zinc-800 pb-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xs uppercase text-emerald-400 font-semibold px-2 py-0.5 bg-emerald-950/50 border border-emerald-800/50 rounded">
              {project.category}
            </span>
            {isOnline ? (
              <span className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                SYSTEM_ID: {project.slug}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-[10px] text-amber-400/90 font-mono px-2 py-0.5 rounded bg-amber-950/50 border border-amber-600/40">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                OFFLINE // DORMANT TO CONSERVE AWS COMPUTE
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              slug === "agentic-audit-harness" ? (
                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("open-arun-agent"));
                  }}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded transition-colors cursor-pointer"
                >
                  ⚡ RUN LIVE (ARUN.AI) ↗
                </button>
              ) : isOnline ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded transition-colors"
                >
                  ⚡ RUN LIVE ↗
                </a>
              ) : (
                <div className="relative group">
                  <span className="px-3 py-1.5 bg-zinc-900 border border-amber-500/40 text-amber-400 font-semibold text-xs rounded cursor-help inline-flex items-center gap-1.5">
                    <span>💤 DORMANT (AWS)</span>
                  </span>
                  <div className="absolute right-0 top-full mt-2 w-72 p-2.5 bg-zinc-950 border border-amber-500/40 rounded-lg text-[11px] text-zinc-300 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 font-mono leading-relaxed">
                    <span className="text-amber-400 font-bold block mb-1">AWS EC2 COMPUTE DORMANT</span>
                    {health?.reason || "EC2 instance stopped to conserve AWS credits. Inspect verified architecture and test suites below."}
                  </div>
                </div>
              )
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs rounded transition-colors"
              >
                SOURCE ↗
              </a>
            )}
          </div>
        </div>

        {!isOnline && (
          <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300/90 flex items-start gap-2.5 font-mono">
            <span className="text-base">⚠️</span>
            <div>
              <span className="font-bold text-amber-400">AWS Cloud Cost Optimization:</span> EC2 instance is currently dormant to conserve student cloud credits. You can inspect the complete verified architecture diagram, pytest guardrail suites, and source code below.
            </div>
          </div>
        )}

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">{project.title}</h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 leading-relaxed">{project.tagline}</p>
        </div>

        {/* Mounted Studio Audio Player */}
        <div className="pt-2">
          <StudioAudioPlayer
            audioSrc={`/audio/${project.slug}.mp3`}
            title={`${project.title} // Audio Briefing`}
            durationLabel="0:45"
            className="w-full"
          />
        </div>
      </div>

      {/* 4-Tab Mission Control Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-900 pb-3 text-xs">
        <button
          onClick={() => setActiveTab("architecture")}
          className={`px-3 py-1.5 rounded font-mono transition-all ${
            activeTab === "architecture"
              ? "bg-emerald-950/60 text-emerald-400 font-bold border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
              : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
          }`}
        >
          📐 ARCHITECTURE WORKFLOW
        </button>

        <button
          onClick={() => setActiveTab("metrics")}
          className={`px-3 py-1.5 rounded font-mono transition-all ${
            activeTab === "metrics"
              ? "bg-emerald-950/60 text-emerald-400 font-bold border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
              : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
          }`}
        >
          📊 VERIFIED METRICS &amp; CODE
        </button>

        <button
          onClick={() => setActiveTab("failure")}
          className={`px-3 py-1.5 rounded font-mono transition-all ${
            activeTab === "failure"
              ? "bg-amber-950/60 text-amber-400 font-bold border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
              : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
          }`}
        >
          🛠️ INCIDENT POST-MORTEM
        </button>

        <button
          onClick={() => setActiveTab("demo")}
          className={`px-3 py-1.5 rounded font-mono transition-all ${
            activeTab === "demo"
              ? "bg-cyan-950/60 text-cyan-400 font-bold border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
          }`}
        >
          🎙️ DEMO &amp; STUDIO
        </button>
      </div>

      {/* Tab 1: Architecture Workflow Canvas */}
      {activeTab === "architecture" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {workflow ? (
            <WorkflowCanvas workflow={workflow} />
          ) : (
            <div className="p-8 rounded-lg border border-zinc-800 bg-zinc-950/40 text-center text-zinc-500 text-xs">
              ARCHITECTURE WORKFLOW DIAGRAM INITIALIZING...
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Verified Metrics & Code */}
      {activeTab === "metrics" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Live Quant Simulator for Project #1 */}
          {slug === "algorithmic-trading-agent" && <InteractiveQuantSimulator />}

          {/* Empirical Benchmarks */}
          <div className="border border-zinc-800 bg-zinc-950/60 p-5 rounded-lg space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-900 pb-2">
              <span className="font-bold text-zinc-200">VERIFIED METRICS &amp; EMPIRICAL BENCHMARKS</span>
              <span className="text-[10px] text-emerald-400 font-semibold">STATUS: AUDITED</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.metrics.map((m) => (
                <div key={m.label} className="p-4 rounded bg-zinc-900/40 border border-zinc-800/80">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                    <span>{m.label}</span>
                    {m.verified && (
                      <span className="text-emerald-400 text-[10px] px-1.5 py-0.5 bg-emerald-950/60 border border-emerald-500/30 rounded">
                        ✓ VERIFIED TEST SUITE
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-zinc-100 mt-1">{m.value}</div>
                  {m.change && <div className="text-xs text-zinc-500 mt-1">{m.change}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Code Snippets */}
          {project.architecture && project.architecture.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                CORE SYSTEM IMPLEMENTATION SNIPPETS
              </h3>
              <div className="grid gap-3">
                {project.architecture.map((node) => (
                  <div key={node.id} className="p-4 rounded-lg bg-zinc-950/70 border border-zinc-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-zinc-200">{node.label}</span>
                      <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                        {node.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">{node.description}</p>
                    {node.codeSnippet && (
                      <pre className="p-3 rounded bg-black border border-zinc-900 text-[11px] text-emerald-400/90 overflow-x-auto font-mono">
                        <code>{node.codeSnippet}</code>
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Incident Post-Mortem */}
      {activeTab === "failure" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {failure ? (
            <div className="border border-amber-500/30 bg-amber-950/10 p-5 rounded-lg space-y-4 font-mono">
              <div className="flex items-center justify-between text-xs border-b border-amber-500/20 pb-2">
                <span className="font-bold text-amber-400">HONEST ENGINEERING // INCIDENT ANALYSIS</span>
                <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                  STATUS: {failure.status}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded bg-zinc-900/60 border border-zinc-800 space-y-1">
                  <span className="text-[10px] text-amber-400 font-bold uppercase block">01. TRIGGER CONDITION</span>
                  <p className="text-zinc-300 text-[11px] leading-relaxed">{failure.triggerEvent}</p>
                </div>
                <div className="p-3 rounded bg-rose-950/20 border border-rose-900/30 space-y-1">
                  <span className="text-[10px] text-rose-400 font-bold uppercase block">02. OBSERVED FAILURE</span>
                  <p className="text-zinc-300 text-[11px] leading-relaxed">{failure.observedFailure}</p>
                </div>
                <div className="p-3 rounded bg-zinc-900/60 border border-zinc-800 space-y-1">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase block">03. TECHNICAL ROOT CAUSE</span>
                  <p className="text-zinc-300 text-[11px] leading-relaxed">{failure.rootCause}</p>
                </div>
                <div className="p-3 rounded bg-emerald-950/20 border border-emerald-900/40 space-y-1">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase block">04. ENGINEERED MITIGATION</span>
                  <p className="text-zinc-200 text-[11px] leading-relaxed">{failure.mitigationEngineered}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
                <Link href="/failures" className="text-amber-400 hover:text-amber-300 transition-colors">
                  VIEW GLOBAL INCIDENT DIRECTORY [ 5 CASES ] →
                </Link>
                <Link href="/evidence" className="text-zinc-400 hover:text-white transition-colors">
                  CLAIM-TO-EVIDENCE LEDGER ↗
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-lg border border-zinc-800 bg-zinc-950/40 text-center text-zinc-500 text-xs">
              NO OBSERVED SYSTEM FAILURES REGISTERED FOR THIS COMPONENT.
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Demo & Studio */}
      {activeTab === "demo" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {slug === "agentic-audit-harness" && <InteractiveHarnessDemo />}

          {/* Video Walkthrough Player Container */}
          <div className="border border-zinc-800 bg-zinc-950/60 p-5 rounded-lg space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-900 pb-2">
              <span className="font-bold text-zinc-200">60-SECOND ARCHITECTURAL VIDEO DEMO</span>
              <span className="text-[10px] text-cyan-400 font-semibold">STATUS: STUDIO CONTAINER READY</span>
            </div>

            <div className="aspect-video rounded-lg bg-zinc-900/40 border border-dashed border-zinc-800 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 text-xl font-bold">
                ▶
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-200">AWAITING ARUN&apos;S 60-SECOND RECORDING</h4>
                <p className="text-xs text-zinc-500 max-w-md mt-1">
                  Once recorded, this container streams Arun&apos;s live screen walkthrough with picture-in-picture narration.
                </p>
              </div>
              {project.liveUrl && (
                slug === "agentic-audit-harness" ? (
                  <button
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent("open-arun-agent"));
                    }}
                    className="px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-colors cursor-pointer"
                  >
                    LAUNCH ARUN.AI AGENT IN BROWSER ↗
                  </button>
                ) : (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-colors inline-block"
                  >
                    TRY LIVE SYSTEM IN BROWSER ↗
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
