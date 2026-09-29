import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import CertificateGallery from "@/components/CertificateGallery";

export default function EvidencePage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 sm:p-8 font-mono">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Telemetry Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 rounded">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            EMPIRICAL AUDIT // CLAIM-TO-EVIDENCE LEDGER
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
            Evidence Matrix <span className="text-zinc-500 font-normal">// Empirical Verification</span>
          </h1>

          <p className="text-zinc-400 text-sm max-w-3xl leading-relaxed">
            Applied AI engineering requires moving beyond subjective claims. Every metric, latency 
            figure, and safety assertion in my systems is anchored to reproducible test suites, live benchmarks, 
            or production event logs.
          </p>
        </div>

        {/* Global Verification Telemetry Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border border-zinc-800 bg-zinc-950/60 p-4 rounded-lg text-xs">
          <div>
            <div className="text-zinc-500 uppercase text-[10px]">Audited Systems</div>
            <div className="text-lg font-bold text-zinc-200 mt-0.5">{PROJECTS.length} Systems</div>
          </div>
          <div>
            <div className="text-zinc-500 uppercase text-[10px]">Verified Metrics</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">100% Backed</div>
          </div>
          <div>
            <div className="text-zinc-500 uppercase text-[10px]">Test Coverage</div>
            <div className="text-lg font-bold text-zinc-200 mt-0.5">Pytest + Live Telemetry</div>
          </div>
          <div>
            <div className="text-zinc-500 uppercase text-[10px]">Methodology</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">Deterministic</div>
          </div>
        </div>

        {/* Claim-to-Evidence Matrix */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              01. System Claim-to-Evidence Matrix [ {PROJECTS.length} ]
            </h2>
            <span className="text-[10px] text-zinc-500">AUDIT PROTOCOL: EMPIRICAL</span>
          </div>

          <div className="grid gap-6">
            {PROJECTS.map((project, idx) => (
              <div
                key={project.slug}
                id={`evidence-row-${project.slug}`}
                className="border border-zinc-800 bg-zinc-950/70 rounded-lg p-5 sm:p-6 space-y-4 hover:border-zinc-700 transition-colors"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                      SPEC #{String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base font-bold text-zinc-100">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                      {project.category}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/40">
                      ✓ EMPIRICAL PROOF
                    </span>
                  </div>
                </div>

                {/* Evidence & Metrics Grid */}
                <div className="grid sm:grid-cols-3 gap-4 text-xs">
                  {/* Quantitative Metrics */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase text-zinc-500 font-semibold tracking-wider">
                      Empirical Metrics
                    </span>
                    <div className="space-y-2">
                      {project.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800 space-y-0.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-zinc-400">{m.label}</span>
                            {m.verified && (
                              <span className="text-[9px] text-emerald-400 font-bold">✓ VERIFIED</span>
                            )}
                          </div>
                          <div className="text-sm font-bold text-zinc-100">{m.value}</div>
                          {m.change && (
                            <div className="text-[10px] text-zinc-500">{m.change}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verification Protocol */}
                  <div className="sm:col-span-2 space-y-2">
                    <span className="text-[10px] uppercase text-zinc-500 font-semibold tracking-wider">
                      Verification Protocol & Methodology
                    </span>
                    <div className="p-3.5 rounded bg-zinc-900/40 border border-zinc-800/80 space-y-2 text-xs leading-relaxed">
                      <p className="text-zinc-300">
                        {project.evidenceSummary}
                      </p>
                      <div className="pt-2 border-t border-zinc-800/60 flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-400">
                        <span className="text-zinc-500">Tech Stack Backing:</span>
                        {project.stack.slice(0, 4).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-300 font-mono text-[10px]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Link Out */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-900 text-xs">
                  <Link
                    href={`/systems/${project.slug}`}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 group"
                  >
                    <span>INSPECT FULL ARCHITECTURE CANVAS</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </Link>

                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        Live Demo ↗
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        GitHub Suite ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verified Certifications Section */}
        <section className="pt-4">
          <CertificateGallery />
        </section>
      </div>
    </main>
  );
}
