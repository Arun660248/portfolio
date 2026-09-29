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
    <div className="w-full bg-zinc-950/80 border-b border-zinc-800/80 backdrop-blur-sm text-[11px] font-mono text-zinc-400 py-1.5 px-4 sm:px-8 flex items-center justify-between gap-3 relative z-30">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-zinc-200 font-semibold">ARUN.SYS</span>
        <span className="text-zinc-700">|</span>
        <span className="text-zinc-400">
          SYSTEM CLOCK: <span className="text-emerald-400 font-mono font-bold">{timeStr || "INITIALIZING..."}</span>
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span className="text-zinc-500 hidden sm:inline">DEVELOPER STATUS:</span>
        <span className="text-emerald-400 font-semibold">AVAILABLE FOR HIRE</span>
      </div>
    </div>
  );
}
