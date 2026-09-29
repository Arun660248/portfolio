"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(id);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-xl p-6 space-y-6 shadow-2xl font-mono text-zinc-200 z-10">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-bold text-zinc-100 tracking-wider">
              CONNECT // ARUN JYOTI CHAKRABORTY
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-zinc-500 hover:text-zinc-200 px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 transition-colors"
          >
            [ ESC / ✕ ]
          </button>
        </div>

        {/* Candidate Telemetry */}
        <div className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 font-semibold">ROLE:</span>
            <span className="text-zinc-200">Applied AI Systems Engineer</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 font-semibold">EDUCATION:</span>
            <span className="text-zinc-200">B.Sc. Data Science & AI · IIT Guwahati</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60">
            <span className="text-zinc-400 font-semibold">STATUS:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              AVAILABLE FOR ROLES (REMOTE / INTERN)
            </span>
          </div>
        </div>

        {/* 1-Click Clipboard Email Rows */}
        <div className="space-y-3">
          <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
            Direct Communication Channels
          </div>

          {/* Direct Gmail */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 text-xs">
            <div>
              <div className="text-[10px] text-zinc-500">DIRECT GMAIL</div>
              <div className="text-zinc-200 font-semibold">arunjyotichakraborty18@gmail.com</div>
            </div>
            <button
              onClick={() => copyToClipboard("arunjyotichakraborty18@gmail.com", "email")}
              className={`px-3 py-1.5 rounded text-[11px] font-bold transition-all ${
                copiedEmail === "email"
                  ? "bg-emerald-500 text-black"
                  : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
              }`}
            >
              {copiedEmail === "email" ? "COPIED ✓" : "COPY"}
            </button>
          </div>

          {/* WhatsApp & Direct Phone */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 text-xs">
            <div>
              <div className="text-[10px] text-zinc-500">WHATSAPP & DIRECT CALL</div>
              <div className="text-zinc-200 font-semibold">+91 7439524613</div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/917439524613"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1.5 rounded text-[11px] font-bold bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-400 transition-colors"
              >
                WHATSAPP ↗
              </a>
              <button
                onClick={() => copyToClipboard("+917439524613", "phone")}
                className={`px-2.5 py-1.5 rounded text-[11px] font-bold transition-all ${
                  copiedEmail === "phone"
                    ? "bg-emerald-500 text-black"
                    : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                }`}
              >
                {copiedEmail === "phone" ? "COPIED ✓" : "COPY"}
              </button>
            </div>
          </div>
        </div>

        {/* External Profiles & Actions */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <a
            href="https://www.linkedin.com/in/arun-jyoti-chakraborty-407826322/"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-center text-zinc-300 hover:text-white transition-colors"
          >
            LinkedIn Profile ↗
          </a>
          <a
            href="https://github.com/Arun660248"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-center text-zinc-300 hover:text-white transition-colors"
          >
            GitHub Portfolio ↗
          </a>
        </div>

        {/* Download Resume Action */}
        <div className="pt-2 border-t border-zinc-900">
          <a
            href="/Arun_Jyoti_Chakraborty_Resume.pdf"
            download="Arun_Jyoti_Chakraborty_Resume.pdf"
            className="w-full py-2.5 px-4 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <span>DOWNLOAD VERIFIED RESUME (PDF)</span>
            <span>⤓</span>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
