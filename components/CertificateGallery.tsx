"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Certification } from "@/types/certification";
import { CERTIFICATIONS } from "@/data/certifications";

export default function CertificateGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCert(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const categories = [
    { label: "ALL", value: "ALL" },
    { label: "ACADEMIC", value: "academic" },
    { label: "CLOUD & INFRA", value: "cloud" },
    { label: "AI & ML", value: "ai-ml" },
    { label: "DATA & ANALYTICS", value: "data" },
    { label: "INTERNSHIP", value: "internship" },
  ];

  const filtered = CERTIFICATIONS.filter((c) => {
    if (selectedCategory === "ALL") return true;
    return c.category === selectedCategory;
  }).sort((a, b) => {
    if (sortOrder === "newest") {
      return b.isoDate.localeCompare(a.isoDate);
    }
    return a.isoDate.localeCompare(b.isoDate);
  });

  return (
    <section className="space-y-6 font-mono">
      {/* Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-xl font-bold text-zinc-100 tracking-tight">
              VERIFIED CREDENTIAL ARCHIVE
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
              {CERTIFICATIONS.length} VERIFIED
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Audited course completions, academic coursework, and corporate simulations chronologically sorted by award date.
          </p>
        </div>

        {/* Chronological Sort Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">SORT BY DATE:</span>
          <button
            onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
            className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs text-emerald-400 font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>{sortOrder === "newest" ? "↓ NEWEST FIRST" : "↑ EARLIEST FIRST"}</span>
          </button>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        {categories.map((cat) => {
          const count =
            cat.value === "ALL"
              ? CERTIFICATIONS.length
              : CERTIFICATIONS.filter((c) => c.category === cat.value).length;
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                isActive
                  ? "bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                  : "bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1 rounded ${
                  isActive ? "bg-black/20 text-black" : "bg-zinc-900 text-zinc-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Certificate Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((cert) => (
          <div
            key={cert.id}
            className="group rounded-xl border border-zinc-800 bg-zinc-950/80 hover:border-emerald-500/50 transition-all flex flex-col overflow-hidden shadow-lg hover:shadow-emerald-950/20"
          >
            {/* Thumbnail with Click-to-Zoom */}
            <div
              onClick={() => setActiveCert(cert)}
              className="relative aspect-[4/3] bg-black/60 border-b border-zinc-800/80 cursor-pointer overflow-hidden group-hover:opacity-95"
            >
              <Image
                src={cert.imagePath}
                alt={cert.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1 rounded bg-black/80 border border-emerald-400 text-emerald-400 text-xs font-bold shadow-lg backdrop-blur-sm">
                  🔍 AUDIT FULLSCREEN
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="font-semibold text-emerald-400 uppercase tracking-wider">
                    {cert.issuer}
                  </span>
                  <span className="font-mono text-zinc-500">{cert.date}</span>
                </div>
                <h3 className="text-sm font-bold text-zinc-100 group-hover:text-emerald-300 transition-colors line-clamp-2">
                  {cert.title}
                </h3>
                {cert.credentialId && (
                  <div className="text-[10px] text-zinc-500 font-mono">
                    ID: <span className="text-zinc-400">{cert.credentialId}</span>
                  </div>
                )}
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {cert.skills.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono"
                  >
                    {s}
                  </span>
                ))}
                {cert.skills.length > 3 && (
                  <span className="text-[9px] px-1 py-0.5 rounded bg-zinc-900 text-zinc-500">
                    +{cert.skills.length - 3}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-zinc-900 flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => setActiveCert(cert)}
                  className="text-zinc-400 hover:text-emerald-400 font-semibold transition-colors flex items-center gap-1"
                >
                  <span>INSPECT</span>
                  <span>↗</span>
                </button>
                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-emerald-400/90 hover:text-emerald-300 underline font-mono"
                  >
                    VERIFY ONLINE ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {activeCert && (
        <div
          onClick={() => setActiveCert(null)}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="p-3.5 border-b border-zinc-800 flex items-center justify-between bg-black/40 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-bold text-zinc-200">{activeCert.title}</span>
                <span className="text-[10px] text-zinc-500 font-mono">({activeCert.date})</span>
              </div>
              <button
                onClick={() => setActiveCert(null)}
                className="text-zinc-400 hover:text-white text-base px-2 py-0.5 rounded hover:bg-zinc-800 transition-colors"
                title="Close Lightbox (Esc)"
              >
                ✕
              </button>
            </div>

            {/* High-Resolution Certificate Viewport */}
            <div className="relative flex-1 min-h-[360px] sm:min-h-[520px] bg-black flex items-center justify-center p-2">
              <div className="relative w-full h-full min-h-[340px] sm:min-h-[500px]">
                <Image
                  src={activeCert.imagePath}
                  alt={activeCert.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-zinc-800 bg-zinc-950/90 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                <span>
                  ISSUER: <strong className="text-zinc-200">{activeCert.issuer}</strong>
                </span>
                {activeCert.credentialId && (
                  <span>
                    CREDENTIAL ID: <strong className="text-emerald-400 font-mono">{activeCert.credentialId}</strong>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {activeCert.verificationUrl && (
                  <a
                    href={activeCert.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 rounded bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-500/40 text-xs font-bold transition-colors"
                  >
                    VERIFY CREDENTIAL ↗
                  </a>
                )}
                <button
                  onClick={() => setActiveCert(null)}
                  className="px-3 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
