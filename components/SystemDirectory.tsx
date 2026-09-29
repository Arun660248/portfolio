"use client";

import { useState } from "react";
import { Project } from "@/types/project";
import { ProjectCard } from "@/components/ProjectCard";

interface SystemDirectoryProps {
  projects: Project[];
}

export function SystemDirectory({ projects }: SystemDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const popularTech = ["ALL", "Google ADK", "FastAPI", "LangChain", "FastMCP", "Docker", "Bedrock"];
  const categories = ["ALL", "agent", "rag"];

  const filteredProjects = projects.filter((project) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      project.title.toLowerCase().includes(q) ||
      project.tagline.toLowerCase().includes(q) ||
      project.stack.some((t) => t.toLowerCase().includes(q));

    const matchesTech =
      selectedTech === "ALL" ||
      project.stack.some((t) => t.toLowerCase().includes(selectedTech.toLowerCase()));

    const matchesCategory =
      selectedCategory === "ALL" || project.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesTech && matchesCategory;
  });

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedTech("ALL");
    setSelectedCategory("ALL");
  };

  const hasActiveFilters = searchQuery !== "" || selectedTech !== "ALL" || selectedCategory !== "ALL";

  return (
    <section className="space-y-5">
      {/* Control Header & Live Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Verified AI Systems
          </h2>
          <span className="text-xs text-emerald-400 font-mono font-bold">
            [ {filteredProjects.length} / {projects.length} ]
          </span>
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-[11px] text-zinc-400 hover:text-white px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 transition-colors"
            >
              RESET FILTERS ✕
            </button>
          )}
          <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">
            ORDER: PRODUCTION READY
          </span>
        </div>
      </div>

      {/* Terminal Search & Quick Filter Bar */}
      <div className="space-y-3">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 font-mono text-xs">
            &gt;_
          </div>
          <input
            id="system-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by system, framework, or model (e.g., FastAPI, ADK, ARIMA, Docker)..."
            className="w-full pl-8 pr-4 py-2 bg-zinc-950/80 border border-zinc-800 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 rounded-lg text-xs font-mono text-zinc-200 placeholder-zinc-600 transition-colors outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-zinc-500 hover:text-zinc-200 font-mono"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Tech Stack Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase text-zinc-500 font-semibold mr-1">Stack:</span>
            {popularTech.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                  selectedTech === tech
                    ? "bg-zinc-800 text-emerald-400 font-bold border border-zinc-700"
                    : "bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase text-zinc-500 font-semibold mr-1">Type:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase transition-colors ${
                  selectedCategory === cat
                    ? "bg-emerald-950/60 text-emerald-400 font-bold border border-emerald-500/40"
                    : "bg-zinc-900 text-zinc-500 hover:text-zinc-300 border border-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filtered Project Cards Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        /* Empty Fallback State */
        <div className="p-8 rounded-lg border border-dashed border-zinc-800 bg-zinc-950/40 text-center space-y-3 font-mono">
          <div className="text-zinc-500 text-sm">
            NO SYSTEMS MATCHING QUERY: &quot;<span className="text-amber-400">{searchQuery || selectedTech}</span>&quot;
          </div>
          <p className="text-zinc-600 text-xs">
            Try querying popular tags like &quot;FastAPI&quot;, &quot;ADK&quot;, &quot;LangChain&quot;, or &quot;Docker&quot;.
          </p>
          <button
            onClick={resetFilters}
            className="px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-emerald-400 text-xs font-semibold transition-colors inline-block"
          >
            RESET ALL FILTERS
          </button>
        </div>
      )}
    </section>
  );
}
