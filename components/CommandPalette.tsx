"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";

interface CommandItem {
  id: string;
  category: "SYSTEMS" | "AUDIT & PROOFS" | "ACTIONS";
  title: string;
  description: string;
  badge?: string;
  action: () => void;
  url?: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Keyboard shortcut: Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Catalog of all command targets
  const items: CommandItem[] = useMemo(() => {
    const systemItems: CommandItem[] = PROJECTS.map((p) => ({
      id: `sys-${p.slug}`,
      category: "SYSTEMS",
      title: p.title,
      description: p.tagline,
      badge: p.category.toUpperCase(),
      action: () => {
        setIsOpen(false);
        router.push(`/systems/${p.slug}`);
      },
    }));

    const auditItems: CommandItem[] = [
      {
        id: "nav-console",
        category: "AUDIT & PROOFS",
        title: "Console & System Directory",
        description: "Homepage with live telemetry, search, and neural canvas",
        badge: "CONSOLE",
        action: () => {
          setIsOpen(false);
          router.push("/");
        },
      },
      {
        id: "nav-failures",
        category: "AUDIT & PROOFS",
        title: "Incident Post-Mortems & Failures",
        description: "Forensic failure analyses, triggers, root causes & mitigations",
        badge: "AUDIT",
        action: () => {
          setIsOpen(false);
          router.push("/failures");
        },
      },
      {
        id: "nav-evidence",
        category: "AUDIT & PROOFS",
        title: "Empirical Proof Matrix & Credentials",
        description: "14 verified certificates and claim-to-test matrices",
        badge: "VERIFIED",
        action: () => {
          setIsOpen(false);
          router.push("/evidence");
        },
      },
      {
        id: "nav-evaluate",
        category: "AUDIT & PROOFS",
        title: "Recruiter Role-Fit Dossier",
        description: "Role fit evaluation across Applied AI, Agentic, RAG & Backend",
        badge: "EVALUATE",
        action: () => {
          setIsOpen(false);
          router.push("/evaluate");
        },
      },
      {
        id: "nav-about",
        category: "AUDIT & PROOFS",
        title: "Engineering Bio & Academic Rigor",
        description: "IIT Guwahati DA 210 coursework, builder persona & interests",
        badge: "ABOUT",
        action: () => {
          setIsOpen(false);
          router.push("/about");
        },
      },
    ];

    const actionItems: CommandItem[] = [
      {
        id: "act-resume",
        category: "ACTIONS",
        title: "Download Official Resume (PDF)",
        description: "Standard 1-page ATS-optimized engineering resume",
        badge: "DOWNLOAD",
        action: () => {
          setIsOpen(false);
          const a = document.createElement("a");
          a.href = "/Arun_Jyoti_Chakraborty_Resume.pdf";
          a.download = "Arun_Jyoti_Chakraborty_Resume.pdf";
          a.click();
        },
      },
      {
        id: "act-agent",
        category: "ACTIONS",
        title: "Ask ARUN.AI Autonomous Assistant",
        description: "Trigger LangGraph conversational agent with voice I/O",
        badge: "AGENT",
        action: () => {
          setIsOpen(false);
          const agentBtn = document.getElementById("agent-toggle-btn");
          if (agentBtn) agentBtn.click();
        },
      },
      {
        id: "act-whatsapp",
        category: "ACTIONS",
        title: "Direct WhatsApp Line (+91 7439524613)",
        description: "Open encrypted direct chat with Arun Jyoti Chakraborty",
        badge: "DIRECT",
        action: () => {
          setIsOpen(false);
          window.open("https://wa.me/917439524613", "_blank");
        },
      },
      {
        id: "act-github",
        category: "ACTIONS",
        title: "GitHub Profile (@Arun660248)",
        description: "View verified open-source repositories and commits",
        badge: "EXTERNAL",
        action: () => {
          setIsOpen(false);
          window.open("https://github.com/Arun660248", "_blank");
        },
      },
    ];

    return [...systemItems, ...auditItems, ...actionItems];
  }, [router]);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.description.toLowerCase().includes(lower) ||
        item.category.toLowerCase().includes(lower) ||
        (item.badge && item.badge.toLowerCase().includes(lower))
    );
  }, [items, query]);

  // Handle Arrow navigation & Enter execution
  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev <= 0 ? Math.max(0, filteredItems.length - 1) : prev - 1
      );
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden font-mono flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyNav}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
          <span className="text-emerald-400 text-sm mr-3 font-bold">{">_"}</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search systems, post-mortems, proofs, or run actions..."
            className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
          <kbd className="text-[10px] text-zinc-400 bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1 divide-y divide-zinc-900/50">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-500">
              No matching command or system found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors ${
                    isSelected
                      ? "bg-emerald-950/40 border border-emerald-500/30 text-zinc-100"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 border border-transparent"
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-semibold truncate ${
                          isSelected ? "text-emerald-400" : "text-zinc-200"
                        }`}
                      >
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-[10px] text-zinc-500 flex items-center gap-1 font-mono">
                    <span className="text-zinc-600">{item.category}</span>
                    {isSelected && (
                      <span className="text-emerald-400 font-bold ml-2">↵</span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="px-4 py-2 bg-zinc-900/60 border-t border-zinc-800 text-[10px] text-zinc-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="text-zinc-400 bg-zinc-800 px-1 rounded">↑</kbd>
              <kbd className="text-zinc-400 bg-zinc-800 px-1 rounded ml-1">↓</kbd> navigate
            </span>
            <span>
              <kbd className="text-zinc-400 bg-zinc-800 px-1 rounded">↵</kbd> select
            </span>
            <span>
              <kbd className="text-zinc-400 bg-zinc-800 px-1 rounded">esc</kbd> dismiss
            </span>
          </div>
          <span className="text-emerald-400 font-semibold">ARUN.SYS // SPOTLIGHT</span>
        </div>
      </div>
    </div>
  );
}
