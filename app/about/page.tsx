"use client";

import { useState } from "react";
import Link from "next/link";
import { IITG_COURSEWORK, Course } from "@/data/coursework";
import CertificateGallery from "@/components/CertificateGallery";

export default function AboutPage() {
  const [selectedTrack, setSelectedTrack] = useState<string>("all");
  const [rating, setRating] = useState<number | null>(null);
  const [ratingHover, setRatingHover] = useState<number | null>(null);
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(false);

  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const tracks = ["all", "Applied AI & ML", "Systems & Algorithms", "Mathematics & Optimization"];

  const filteredCourses =
    selectedTrack === "all"
      ? IITG_COURSEWORK
      : IITG_COURSEWORK.filter((c) => c.category === selectedTrack);

  const handleRate = (stars: number) => {
    setRating(stars);
    setRatingSubmitted(true);
    try {
      localStorage.setItem("arun_sys_rating", String(stars));
    } catch {
      // safe fallback
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 sm:p-8 font-mono">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Top Badges & Location Bar */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-emerald-500/40 bg-emerald-950/30 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AVAILABLE FOR REMOTE ROLES
            </span>
            <span className="px-3 py-1 rounded border border-zinc-800 bg-zinc-950 text-zinc-300">
              IIT GUWAHATI · 3RD YEAR B.SC. DS & AI
            </span>
            <span className="px-3 py-1 rounded border border-zinc-800 bg-zinc-950 text-zinc-400">
              WEST BENGAL, INDIA
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100 leading-tight">
            I&apos;m Arun Jyoti Chakraborty —{" "}
            <span className="text-emerald-400">I build AI systems that actually run in production.</span>
          </h1>

          <p className="text-zinc-300 text-base max-w-3xl leading-relaxed">
            While most students are still following tutorials, I architect and ship production-grade AI systems across cloud edge and container runtimes. My portfolio features four active production systems (Enterprise RAG on Streamlit, Cognitive Load Balancer on Hugging Face, Healthcare Assistant on Render, and Autonomous Agentic Eval on Vercel Edge) alongside two cost-optimized dormant systems archived with interactive sandboxes.
          </p>
        </div>

        {/* 2x2 Core Identity Matrix */}
        <section className="grid sm:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              01. Not a Researcher. Not a Prompt Engineer.
            </div>
            <p className="text-zinc-300 leading-relaxed">
              I&apos;m someone who takes an AI capability and ships it into something that works, 
              handles failure gracefully, and can be debugged at 3am when it breaks. 
              I care about concurrency limits, fallback recovery, schema validation, and vector indexing speed.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              02. Real Systems Over Notebook Scripts
            </div>
            <p className="text-zinc-300 leading-relaxed">
              My work sits at the intersection of agentic AI, RAG pipelines, and production deployment. 
              I use LangChain, Google ADK, FastMCP, Gemini, FAISS, Docker, and AWS daily — 
              not in ephemeral Jupyter notebooks, but in containerized services handling real requests.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              03. The Harder Half of the Work
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Getting an LLM to generate a nice demo is easy. The hard part is building deterministic guardrails, 
              preventing prompt injection, managing database transactions, and keeping p95 latency under SLA. 
              That is the engineering half I focus on.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-bold uppercase tracking-wider text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              04. Seeking High-Velocity AI Engineering Teams
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Seeking remote AI engineering roles where I can take full ownership of deployment, tool-calling 
              orchestration, and end-to-end reliability. Ready to contribute code on day one.
            </p>
          </div>
        </section>

        {/* Beyond The Code — Energy, Strategy & Discipline */}
        <section className="space-y-4">
          <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-600" />
              Beyond The Terminal // Energy, Strategy &amp; Mindset
            </h2>
            <span className="text-[10px] text-zinc-500 uppercase">HIGH-AGENCY BUILDER</span>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800/80 space-y-2">
              <div className="text-emerald-400 font-bold text-sm">🏋️ Fitness &amp; Workouts</div>
              <div className="text-zinc-300 font-semibold text-[11px]">Physical Stamina &amp; Discipline</div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Consistent gym training and heavy workouts build the stamina required to power through intense debugging marathons.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800/80 space-y-2">
              <div className="text-cyan-400 font-bold text-sm">♟️ Chess &amp; Tactics</div>
              <div className="text-zinc-300 font-semibold text-[11px]">Calculated Decision Making</div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Anticipating opponent moves several plies ahead trains the exact mindset needed to design resilient multi-agent fallback loops.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800/80 space-y-2">
              <div className="text-purple-400 font-bold text-sm">🎮 Gaming &amp; Anime</div>
              <div className="text-zinc-300 font-semibold text-[11px]">Creative Drive &amp; Flow State</div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Immersive worlds, competitive gaming mechanics, and anime fuel creative perspective and high-focus mental resets.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800/80 space-y-2">
              <div className="text-amber-400 font-bold text-sm">🚀 Projects &gt; Theory</div>
              <div className="text-zinc-300 font-semibold text-[11px]">Action-First Learning</div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                I learn 10x faster by deploying real systems and handling production traffic than by passively memorizing exam notes.
              </p>
            </div>
          </div>
        </section>

        {/* Academic Groundwork Matrix */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                IIT Guwahati Academic Foundation // Theory Applied in Code
              </h2>
              <span className="text-xs text-emerald-400 font-bold">
                [ {filteredCourses.length} COURSES ]
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {tracks.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTrack(t)}
                  className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase transition-colors ${
                    selectedTrack === t
                      ? "bg-zinc-800 text-emerald-400 font-bold border border-zinc-700"
                      : "bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredCourses.map((c: Course) => (
              <div
                key={c.code}
                className="p-3.5 rounded-lg bg-zinc-950/70 border border-zinc-800 hover:border-zinc-700 space-y-2 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-zinc-200 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                    {c.code}
                  </span>
                  <span
                    className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${
                      c.status === "completed"
                        ? "bg-emerald-950/50 text-emerald-400 border-emerald-500/30"
                        : "bg-amber-950/50 text-amber-400 border-amber-500/30"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                <div className="text-xs font-bold text-zinc-100 line-clamp-1">
                  {c.name}
                </div>

                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {c.relevanceToPortfolio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Verified Credential & Certificate Archive */}
        <CertificateGallery />

        {/* Discreet Auditor Rating & Constructive Peer Review (Zero Popups) */}
        <section className="border border-zinc-800 bg-zinc-950/60 rounded-xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Auditor Rating &amp; Constructive Peer Review
              </h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Private feedback to help Arun continuously harden systems and grow as an applied engineer.
              </p>
            </div>
            <span className="text-[10px] text-zinc-500 uppercase font-mono">
              CONFIDENTIAL // ZERO POPUPS
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 items-start">
            {/* 1. Discreet Star Rating */}
            <div className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800 space-y-3">
              <div className="text-xs font-semibold text-zinc-300">
                How would you rate this engineering portfolio?
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (ratingHover || rating || 0) >= star;
                  return (
                    <button
                      key={star}
                      onClick={() => handleRate(star)}
                      onMouseEnter={() => setRatingHover(star)}
                      onMouseLeave={() => setRatingHover(null)}
                      className="text-2xl transition-transform hover:scale-110 focus:outline-none"
                    >
                      <span className={isFilled ? "text-amber-400" : "text-zinc-700"}>
                        ★
                      </span>
                    </button>
                  );
                })}
              </div>

              {ratingSubmitted ? (
                <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
                  <span>✓</span>
                  <span>RATING RECORDED ({rating}/5). APPRECIATE YOUR REVIEW!</span>
                </div>
              ) : (
                <div className="text-[10px] text-zinc-500">
                  Click a star to record a quick private rating (1 click, no forms required).
                </div>
              )}
            </div>

            {/* 2. Constructive Written Feedback */}
            <div className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800 space-y-3">
              <div className="text-xs font-semibold text-zinc-300">
                Detailed Feedback or Suggestions for Improvement
              </div>

              {feedbackSubmitted ? (
                <div className="p-3 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs space-y-1">
                  <div className="font-bold">✓ FEEDBACK RECEIVED DIRECTLY</div>
                  <p className="text-[11px] text-zinc-300">
                    Thank you for taking the time to share your perspective. I will review it carefully.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-2.5">
                  <input
                    type="text"
                    value={feedbackName}
                    onChange={(e) => setFeedbackName(e.target.value)}
                    placeholder="Your Role or Company (Optional)"
                    className="w-full px-3 py-1.5 bg-black border border-zinc-800 rounded text-xs text-zinc-200 placeholder-zinc-600 focus:border-emerald-500/50 outline-none"
                  />
                  <textarea
                    rows={2}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="What can I improve, add, or engineer better?"
                    required
                    className="w-full px-3 py-1.5 bg-black border border-zinc-800 rounded text-xs text-zinc-200 placeholder-zinc-600 focus:border-emerald-500/50 outline-none resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-1.5 px-3 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
                  >
                    SEND PRIVATE FEEDBACK ↗
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Footer Navigation Back */}
        <div className="flex items-center justify-between border-t border-zinc-900 pt-4 text-xs">
          <Link href="/" className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
            ← RETURN TO SYSTEMS CONSOLE
          </Link>
          <Link href="/evaluate" className="text-zinc-400 hover:text-white transition-colors">
            VIEW ROLE FIT DOSSIER →
          </Link>
        </div>
      </div>
    </main>
  );
}
