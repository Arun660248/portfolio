"use client";

import { useState } from "react";
import { SystemWorkflow, WorkflowNode } from "@/types/workflow";

interface WorkflowCanvasProps {
  workflow: SystemWorkflow;
}

export function WorkflowCanvas({ workflow }: WorkflowCanvasProps) {
  const [selectedId, setSelectedId] = useState<string>(
    workflow.nodes.find((n) => n.type === "model")?.id || workflow.nodes[0]?.id || ""
  );

  const activeNode = workflow.nodes.find((n) => n.id === selectedId) || workflow.nodes[0];

  const typeConfig: Record<string, { label: string; badge: string; border: string }> = {
    trigger: { label: "🌐 TRIGGER", badge: "text-sky-400 bg-sky-950/60 border-sky-800/60", border: "border-sky-500" },
    model: { label: "⚡ COGNITIVE CORE", badge: "text-purple-400 bg-purple-950/60 border-purple-800/60", border: "border-purple-500" },
    tool: { label: "⚙ EXECUTION TOOL", badge: "text-emerald-400 bg-emerald-950/60 border-emerald-800/60", border: "border-emerald-500" },
    database: { label: "🗄 PERSISTENCE / RAG", badge: "text-amber-400 bg-amber-950/60 border-amber-800/60", border: "border-amber-500" },
    guardrail: { label: "🛡 SAFETY GATE", badge: "text-rose-400 bg-rose-950/60 border-rose-800/60", border: "border-rose-500" },
  };

  return (
    <div className="border border-zinc-800 bg-zinc-950/80 p-5 rounded-lg space-y-4 font-mono shadow-2xl">
      {/* Canvas Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-zinc-900 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-zinc-100 tracking-wider">VISUAL ARCHITECTURE // N8N WORKFLOW GRAPH</span>
        </div>
        <span className="text-[10px] text-zinc-500">CLICK ANY NODE TO INSPECT LIVE BLUEPRINT</span>
      </div>

      {/* The Visual Canvas (n8n-style grid with horizontal pan safety) */}
      <div className="w-full overflow-x-auto">
        <div className="relative min-w-[780px] w-full h-[460px] bg-zinc-950 rounded-lg border border-zinc-900 overflow-hidden bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px]">
          {/* SVG Curved Cables (Bézier Splines) */}
          <svg
          viewBox="0 0 1000 460"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {workflow.edges.map((edge) => {
            const fromNode = workflow.nodes.find((n) => n.id === edge.from);
            const toNode = workflow.nodes.find((n) => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            // Compute SVG coordinates from percentages (viewBox 1000 x 460)
            const x1 = (fromNode.x / 100) * 1000 + 55; // right port
            const y1 = (fromNode.y / 100) * 460;
            const x2 = (toNode.x / 100) * 1000 - 55;   // left port
            const y2 = (toNode.y / 100) * 460;

            const dx = Math.max(40, (x2 - x1) * 0.5);
            const pathD = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

            const isConnected = fromNode.id === selectedId || toNode.id === selectedId;

            return (
              <g key={edge.id}>
                {/* Background Shadow Cable */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={isConnected ? "rgba(16, 185, 129, 0.2)" : "rgba(39, 39, 42, 0.6)"}
                  strokeWidth={isConnected ? 6 : 3}
                />
                {/* Flowing Data Cable */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={isConnected ? "url(#activeGrad)" : "#52525b"}
                  strokeWidth={isConnected ? 2.5 : 1.5}
                  strokeDasharray={isConnected ? "6, 4" : "none"}
                  className={isConnected ? "animate-pulse" : ""}
                />
              </g>
            );
          })}
        </svg>

        {/* Node Cards on Canvas */}
        {workflow.nodes.map((node) => {
          const isSelected = node.id === activeNode?.id;
          const conf = typeConfig[node.type] || typeConfig.tool;

          return (
            <div
              key={node.id}
              onClick={() => setSelectedId(node.id)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none transition-all duration-200 z-10 w-44 p-2.5 rounded-lg border bg-zinc-900/90 backdrop-blur-md ${
                isSelected
                  ? "border-emerald-500 shadow-xl shadow-emerald-500/20 ring-1 ring-emerald-500 scale-105"
                  : "border-zinc-800 hover:border-zinc-600 hover:scale-102"
              }`}
            >
              {/* Input Port (Left) */}
              <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-zinc-950 border border-zinc-600 group-hover:border-emerald-400" />

              {/* Output Port (Right) */}
              <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-zinc-950 border border-zinc-600 group-hover:border-emerald-400" />

              {/* Node Header */}
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className={`text-[8px] font-semibold px-1 py-0.5 rounded border uppercase ${conf.badge}`}>
                  {conf.label}
                </span>
              </div>

              {/* Node Title & Subtitle */}
              <div className="text-[11px] font-bold text-zinc-100 leading-tight truncate">
                {node.label}
              </div>
              <div className="text-[9px] text-zinc-400 truncate mt-0.5">
                {node.subtitle}
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Node Inspector Drawer */}
      {activeNode && (
        <div className="p-4 rounded-lg bg-zinc-900/70 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-zinc-800 pb-2">
            <div>
              <span className="font-bold text-zinc-100 text-sm">{activeNode.label}</span>
              <span className="text-zinc-500 text-xs ml-2">// {activeNode.subtitle}</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded border uppercase ${typeConfig[activeNode.type]?.badge}`}>
              {typeConfig[activeNode.type]?.label}
            </span>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed">{activeNode.description}</p>

          {/* Real Python Code Implementation */}
          {activeNode.codeSnippet && (
            <div className="space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                EXECUTION SPEC // PYTHON IMPLEMENTATION
              </div>
              <pre className="p-3 rounded bg-black border border-zinc-800/80 text-[11px] text-zinc-300 overflow-x-auto font-mono leading-relaxed">
                <code>{activeNode.codeSnippet}</code>
              </pre>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
