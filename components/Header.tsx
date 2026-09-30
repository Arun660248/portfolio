"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ContactModal } from "@/components/ContactModal";
import { useSystemStatus } from "@/lib/hooks/useSystemStatus";

export function Header() {
  const pathname = usePathname();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { onlineCount, total } = useSystemStatus();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "CONSOLE" },
    { href: "/evaluate", label: "EVALUATE" },
    { href: "/evidence", label: "EVIDENCE" },
    { href: "/failures", label: "FAILURES" },
    { href: "/about", label: "ABOUT" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/80 backdrop-blur-md font-mono">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Brand & Telemetry */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-sm tracking-wider text-zinc-100 group-hover:text-emerald-400 transition-colors">
              ARUN.SYS
            </span>
          </Link>
          <span className="text-[10px] text-zinc-500 hidden sm:inline px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
            APPLIED AI
          </span>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-xs">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded transition-all ${
                  isActive
                    ? "text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 font-bold"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Status, Resume, Connect & GitHub */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          <span className="hidden lg:inline-flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {onlineCount > 0 ? `${onlineCount}/${total} LIVE` : `${total} CLUSTERS`}
          </span>
          <button
            onClick={() => {
              window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true })
              );
            }}
            title="Open Command Palette (Ctrl+K / ⌘K)"
            className="hidden md:flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-[11px] transition-colors cursor-pointer"
          >
            <span className="text-zinc-500 font-mono">⌘</span>
            <span className="font-mono">K</span>
          </button>
          <a
            href="/Arun_Jyoti_Chakraborty_Resume.pdf"
            download="Arun_Jyoti_Chakraborty_Resume.pdf"
            className="hidden sm:flex px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs transition-colors items-center gap-1"
          >
            <span>RESUME</span>
            <span className="text-emerald-400 font-bold">⤓</span>
          </a>
          <button
            id="connect-header-btn"
            onClick={() => setIsContactOpen(true)}
            className="px-2.5 py-1 rounded bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold transition-colors cursor-pointer"
          >
            CONNECT
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
          <a
            href="https://github.com/Arun660248"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-block px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md px-4 py-3 space-y-3 font-mono text-xs animate-in slide-in-from-top duration-150">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded text-center transition-all ${
                    isActive
                      ? "text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 font-bold"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-zinc-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="pt-2 border-t border-zinc-900 flex items-center justify-between gap-2">
            <a
              href="/Arun_Jyoti_Chakraborty_Resume.pdf"
              download="Arun_Jyoti_Chakraborty_Resume.pdf"
              className="flex-1 text-center py-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs flex items-center justify-center gap-1"
            >
              <span>RESUME</span>
              <span className="text-emerald-400 font-bold">⤓</span>
            </a>
            <a
              href="https://github.com/Arun660248"
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center py-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      )}

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </header>
  );
}
