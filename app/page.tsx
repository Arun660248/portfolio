import { PROJECTS } from "@/data/projects";
import { SystemDirectory } from "@/components/SystemDirectory";
import HackathonArena from "@/components/HackathonArena";
import GithubTelemetryWidget from "@/components/GithubTelemetryWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8 font-mono">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 rounded">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          SYSTEM STATUS: ONLINE (LOCAL DEV)
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
          ARUN.SYS <span className="text-zinc-500 font-normal">// Applied AI Systems</span>
        </h1>

        <p className="text-zinc-400 text-sm max-w-xl leading-relaxed">
          Production AI systems built with verifiable metrics, deterministic guardrails, 
          and reproducible benchmark traces.
        </p>

        <div className="pt-4">
          <SystemDirectory projects={PROJECTS} />
        </div>

        <div className="pt-2">
          <HackathonArena />
        </div>

        <div className="pt-2">
          <GithubTelemetryWidget />
        </div>
      </div>
    </main>
  );
}
