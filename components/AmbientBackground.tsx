"use client";

import NeuralCanvas from "@/components/NeuralCanvas";

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <NeuralCanvas />
      {/* Emerald breathing aura */}
      <div 
        className="absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-emerald-500/15 blur-[120px]"
        style={{ animation: "ambient-drift 14s ease-in-out infinite" }}
      />

      {/* Cyan breathing aura */}
      <div 
        className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] rounded-full bg-cyan-500/12 blur-[120px]"
        style={{ animation: "ambient-drift 18s ease-in-out infinite reverse" }}
      />

      {/* Purple bottom drift */}
      <div 
        className="absolute -bottom-32 left-1/4 w-[28rem] h-[28rem] rounded-full bg-purple-500/10 blur-[130px]"
        style={{ animation: "ambient-drift 22s ease-in-out infinite" }}
      />

      {/* Cybernetic Dot-Matrix Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] opacity-70" />
    </div>
  );
}
