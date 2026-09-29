"use client";

import { useEffect, useState } from "react";
import { GithubTelemetryData } from "@/types/github";

export default function GithubTelemetryWidget() {
  const [data, setData] = useState<GithubTelemetryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((json: GithubTelemetryData) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return iso;
    }
  };

  return (
    <section className="border border-zinc-800 bg-zinc-950/70 p-6 rounded-xl font-mono space-y-5 glow-card">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-900 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500 font-bold">&gt;_</span>
          <div>
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <span>OPEN-SOURCE TELEMETRY &amp; GITHUB RADAR</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                @Arun660248
              </span>
            </h3>
            <p className="text-[11px] text-zinc-500">
              Live automated stream via Next.js ISR. Pushes and open-source contributions sync automatically.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold">{data?.isLive ? "LIVE SYNCED" : "CACHED"}</span>
          </div>
          <a
            href="https://github.com/Arun660248"
            target="_blank"
            rel="noreferrer"
            className="text-xs px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-emerald-500/40 transition-colors"
          >
            GitHub Profile ↗
          </a>
        </div>
      </div>

      {loading ? (
        <div className="py-8 text-center text-xs text-zinc-600 animate-pulse">
          FETCHING REAL-TIME GITHUB TELEMETRY...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Recent Commits & Events */}
          <div className="space-y-3 p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/80">
            <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider border-b border-zinc-800/60 pb-2 flex justify-between">
              <span>RECENT PUSH ACTIVITY</span>
              <span className="text-emerald-400">{data?.recentActivity.length || 0} EVENTS</span>
            </div>
            <div className="space-y-3">
              {data?.recentActivity.map((ev) => (
                <div key={ev.id} className="space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-emerald-400 font-semibold truncate max-w-[170px]">
                      {ev.repoName.split("/")[1] || ev.repoName}
                    </span>
                    <span className="text-zinc-600">{formatDate(ev.createdAt)}</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 line-clamp-2 leading-relaxed">
                    {ev.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Public Repositories */}
          <div className="space-y-3 p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/80 md:col-span-2">
            <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider border-b border-zinc-800/60 pb-2 flex justify-between">
              <span>LIVE AUDITED REPOSITORIES</span>
              <span className="text-emerald-400">{data?.repositories.length || 0} REPOS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data?.repositories.slice(0, 4).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded bg-zinc-950/60 border border-zinc-800/80 hover:border-emerald-500/40 hover:bg-zinc-900/50 transition-all group space-y-1.5 block"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors text-xs truncate max-w-[180px]">
                      {repo.name}
                    </span>
                    <span className="text-[9px] px-1 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                      {repo.language || "AI Stack"}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed">
                    {repo.description || "Production AI framework repository."}
                  </p>
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="text-[8px] px-1 rounded bg-zinc-900 text-zinc-500 font-mono"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
