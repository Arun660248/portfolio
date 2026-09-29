"use client";

import { useState } from "react";
import { ArchitectureNode } from "@/types/project";

interface ArchitectureInspectorProps {
  nodes: ArchitectureNode[];
  workflowDiagramUrl?: string;
}

export function ArchitectureInspector({ nodes, workflowDiagramUrl }: ArchitectureInspectorProps) {
  const [selectedId, setSelectedId] = useState<string>(nodes[0]?.id || "");
  const activeNode = nodes.find((n) => n.id === selectedId) || nodes[0];
  const hasCode = nodes.some((n) => Boolean(n.codeSnippet));

  // If a project has neither code nor a workflow diagram, skip rendering
  if (!hasCode && !workflowDiagramUrl && nodes.length === 0) {
    return null;
  }

  return (
    <div className="border border-zinc-800 bg-zinc-950/60 p-5 rounded-lg space-y-4 font-mono">
      <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-900 pb-2">
        <span className="font-bold text-zinc-200">INTERACTIVE SYSTEM ARCHITECTURE</span>
        <span className="text-[10px] text-zinc-500">
          {hasCode ? "CLICK A NODE TO INSPECT CODE" : "HOVER / CLICK FOR WORKFLOW SPEC"}
        </span>
      </div>

      {/* Visual Telemetry Pipeline with Directional Flow & Hover Tooltips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
        {nodes.map((node, i) => {
          const isSelected = node.id === activeNode?.id;
          const typeBadgeStyles = {
            model: "text-purple-400 bg-purple-950/40 border-purple-800/40",
            tool: "text-emerald-400 bg-emerald-950/40 border-emerald-800/40",
            database: "text-cyan-400 bg-cyan-950/40 border-cyan-800/40",
            guardrail: "text-amber-400 bg-amber-950/40 border-amber-800/40",
          };

          return (
            <div key={node.id} className="relative group">
              <button
                onClick={() => setSelectedId(node.id)}
                className={`w-full p-3 rounded text-left transition-all border ${
                  isSelected
                    ? "bg-zinc-900 border-emerald-500 shadow-md shadow-emerald-500/10"
                    : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-1.5">
                  <span className="text-zinc-500 font-bold">STAGE 0{i + 1}</span>
                  <span className={`px-1.5 py-0.2 rounded border text-[9px] uppercase ${typeBadgeStyles[node.type]}`}>
                    {node.type}
                  </span>
                </div>
                <div className="text-xs font-bold text-zinc-100 flex items-center justify-between">
                  <span>{node.label}</span>
                  {i < nodes.length - 1 && (
                    <span className="hidden lg:inline text-zinc-600 text-xs pl-1 font-normal">→</span>
                  )}
                </div>
              </button>

              {/* Interactive Hover Tooltip */}
              {node.description && (
                <div className="absolute z-20 bottom-full left-0 mb-2 hidden group-hover:block w-64 p-2.5 rounded bg-zinc-950/95 border border-zinc-700 shadow-xl text-[11px] text-zinc-300 pointer-events-none">
                  <div className="text-emerald-400 font-semibold mb-1 text-[10px] uppercase tracking-wider">
                    SPEC // {node.label}
                  </div>
                  {node.description}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Node Detail & Code Terminal */}
      {activeNode && (
        <div className="mt-4 p-4 rounded-lg bg-zinc-900/70 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-zinc-800/80 pb-2">
            <span className="font-bold text-zinc-100">{activeNode.label}</span>
            <span className="text-[10px] text-emerald-400 uppercase tracking-wider">
              TYPE: {activeNode.type}
            </span>
          </div>

          {activeNode.description && (
            <p className="text-xs text-zinc-400 leading-relaxed">{activeNode.description}</p>
          )}

          {activeNode.codeSnippet && (
            <div className="space-y-1">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest">IMPLEMENTATION SPEC // PYTHON</div>
              <pre className="p-3 rounded bg-black border border-zinc-800/80 text-[11px] text-zinc-300 overflow-x-auto font-mono leading-relaxed">
                <code>{activeNode.codeSnippet}</code>
              </pre>
            </div>
          )}

          {workflowDiagramUrl && (
            <div className="space-y-2 pt-3 border-t border-zinc-800/80">
              <div className="flex items-center justify-between text-[10px] text-zinc-400">
                <span className="text-zinc-500 uppercase tracking-widest font-semibold">PRODUCTION WORKFLOW GRAPH // LIVE BLUEPRINT</span>
                <span className="text-emerald-400 font-semibold">✓ VERIFIED PIPELINE</span>
              </div>
              <div className="rounded-lg overflow-hidden border border-zinc-800 bg-black p-2">
                <img
                  src={workflowDiagramUrl}
                  alt={`${activeNode.label} production pipeline`}
                  className="w-full h-auto max-h-80 object-contain rounded"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
