"use client";

import { useEffect, useState } from "react";

export default function TelemetryPulseBar() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toTimeString().split(" ")[0] + " IST");
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="w-full bg-zinc-950/80 border-b border-zinc-800/80 backdrop-blur-sm text-[10px] sm:text-[11px] font-mono text-zinc-400 py-1.5 px-3 sm:px-8 flex items-center justify-between gap-2 overflow-x-hidden relative z-30">
      <div className="flex items-center gap-1.5 sm:gap-2 truncate">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <span className="text-zinc-200 font-semibold">ARUN.SYS</span>
        <span className="text-zinc-700">|</span>
        <span className="hidden sm:inline text-zinc-400">SYSTEM CLOCK:</span>
        <span className="text-emerald-400 font-mono font-bold">{timeStr || "INITIALIZING..."}</span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0 text-[10px] sm:text-xs">
        <span className="text-zinc-500 hidden md:inline">DEVELOPER STATUS:</span>
        <span className="text-emerald-400 font-semibold">AVAILABLE FOR HIRE</span>
      </div>
    </div>
  );
}
