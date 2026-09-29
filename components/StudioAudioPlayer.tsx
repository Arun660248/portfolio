"use client";

import { useState, useRef, useEffect } from "react";

interface StudioAudioPlayerProps {
  audioSrc: string;
  title: string;
  durationLabel?: string;
  className?: string;
}

export default function StudioAudioPlayer({
  audioSrc,
  title,
  durationLabel = "0:45",
  className = "",
}: StudioAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 45);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {
        // Fallback if audio file is yet to be placed in public/audio
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 3000);
      });
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div
      className={`p-3 rounded-lg border border-zinc-800 bg-zinc-950 font-mono text-xs flex items-center justify-between gap-3 ${className}`}
    >
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
            isPlaying
              ? "bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.5)]"
              : "bg-zinc-900 text-emerald-400 border border-zinc-800 hover:border-emerald-500/50"
          }`}
          title={isPlaying ? "Pause Audio Briefing" : "Play Studio Audio Briefing"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        {/* Title & Timecode */}
        <div className="space-y-0.5">
          <div className="text-zinc-200 font-semibold line-clamp-1 flex items-center gap-2">
            <span>{title}</span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-zinc-900 text-emerald-400 border border-zinc-800">
              STUDIO MP3
            </span>
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">
            {formatTime(currentTime)} / {duration ? formatTime(duration) : durationLabel}
          </div>
        </div>
      </div>

      {/* Dynamic Equalizer Waveform */}
      <div className="flex items-end gap-1 h-5 px-2" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`w-1 rounded-full transition-all duration-200 ${
              isPlaying ? "bg-emerald-400" : "bg-zinc-800 h-1"
            }`}
            style={{
              height: isPlaying ? `${Math.floor(6 + ((i * 3 + (currentTime * 10)) % 14))}px` : "3px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
