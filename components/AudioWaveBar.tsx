"use client";

export default function AudioWaveBar({ isPlaying }: { isPlaying: boolean }) {
  return (
    <span className="inline-flex items-end gap-0.5 h-3.5 px-0.5" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-0.5 rounded-full transition-all duration-200 ${
            isPlaying ? "bg-emerald-400 animate-pulse" : "bg-zinc-600 h-1"
          }`}
          style={{
            height: isPlaying ? `${Math.floor(4 + ((i * 3 + 6) % 10))}px` : "3px",
            animationDelay: `${i * 120}ms`,
          }}
        />
      ))}
    </span>
  );
}
