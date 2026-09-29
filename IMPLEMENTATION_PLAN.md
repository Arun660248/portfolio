# ARUN.SYS — Full-Stack Applied AI Engineering Platform
### Active Master Implementation Plan & Engineering Roadmap

---

## 1. Executive Vision & Core Principles

> **Identity:** **ARUN.SYS** | Applied AI Systems Engineering  
> **Core Principle:** *"EVIDENCE, NOT CLAIMS."*  
> **Engineering Cycle:** `BUILD → TEST → DEPLOY → VERIFY`  
> **Design Aesthetic:** High-density AI Observability & Systems Console (Linear × Vercel × Datadog). Obsidian canvas, hairline borders, emerald telemetry accents, JetBrains Mono typography, interactive node diagrams, and live system signals.

```
                            [ RECRUITER / VISITOR ]
                                       │
                                       ▼
                     ┌───────────────────────────────────┐
                     │             ARUN.SYS              │
                     │       Next.js App Router (TS)     │
                     └─────────────────┬─────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
       / (Console)                 /evaluate                       /about
 (Live Search & Filter)        (Role Fit Dossier)            (Bio, Philosophy,
  5 Verified AI Systems        Match Score & ATS             Private Audit Form &
  n8n Architecture Canvases    "Why Hire Arun?" ROI          Discreet Star Rating)
         │                             │                             │
         └─────────────────────────────┼─────────────────────────────┘
                                       ▼
                        ┌───────────────────────────────┐
                        │   AUDIT DIRECTORIES & LEDGER  │
                        │  /failures  (Post-Mortems)    │
                        │  /evidence  (Proof Matrix)    │
                        └───────────────┬───────────────┘
                                       │
                        ┌──────────────┴──────────────┐
                        ▼                             ▼
               [ Direct Channels ]           [ Verified Proofs ]
              WhatsApp +917439524613        Live Running Subdomains
              Official Resume Download      GitHub Repositories
```

---

## 2. Current Implementation Status (Completed Milestones)

| Module | Route / File | Status | Key Capabilities |
| :--- | :--- | :---: | :--- |
| **Foundation & Data Engine** | `data/projects.ts`<br>`types/project.ts` | **COMPLETED** | All 5 production AI systems cataloged with live domains, GitHub repos, tech stacks, and quantitative verified benchmarks. |
| **Interactive n8n Workflow Engine** | `components/WorkflowCanvas.tsx`<br>`data/workflows.ts` | **COMPLETED** | Native SVG Cubic Bézier cables (`M x1 y1 C ... x2 y2`), 20px dot grid, port pins, reactive wire highlighting, and interactive Python code inspector. |
| **Honest Engineering Failures** | `app/failures/page.tsx`<br>`data/failures.ts` | **COMPLETED** | Forensic audit directory with 4-stage breakdown (Trigger $\to$ Failure $\to$ Root Cause $\to$ Mitigation) and dynamic category filters. |
| **Claim-to-Evidence Matrix** | `app/evidence/page.tsx` | **COMPLETED** | Empirical verification ledger pairing every claim to a test protocol, plus Verified Credentials Ledger (Google/Kaggle, AWS, Microsoft). |
| **Dynamic System Deep-Dives** | `app/systems/[slug]/page.tsx` | **COMPLETED** | Action buttons (`⚡ RUN LIVE`, `VIEW REPO`), n8n visual canvas, verified metrics grid, and dedicated incident analysis block. |
| **Header & Direct Recruiter Actions** | `components/Header.tsx`<br>`components/ContactModal.tsx` | **COMPLETED** | Active route telemetry, **`RESUME ⤓`** (official PDF download), and **`CONNECT`** modal with WhatsApp quick chat (`https://wa.me/917439524613`) and direct Gmail copy. |
| **Homepage Console & Search** | `app/page.tsx`<br>`components/SystemDirectory.tsx` | **COMPLETED** | Real-time terminal search (`>_`), tech stack quick chips (`FastAPI`, `ADK`, `Docker`, `LangChain`, `Bedrock`), and live counter `[ 5 / 5 ]`. |
| **Role Fit Dossier (`/evaluate`)** | `app/evaluate/page.tsx`<br>`lib/role-matcher.ts` | **COMPLETED** | 4 hiring lenses (Applied AI, Agentic, RAG, Backend AI), explainable evidence match scores, and 1-click ATS summary copy. |
| **Engineering Bio & Coursework (`/about`)** | `app/about/page.tsx`<br>`data/coursework.ts` | **COMPLETED** | Authentic high-agency builder persona, 14 IIT Guwahati courses mapped to production code, beyond-terminal interests (chess, workouts, gaming/anime), and discreet 1–5 star rating section (zero popups). |
| **Real-Time Clock Telemetry** | `components/TelemetryPulseBar.tsx` | **COMPLETED** | Clean, authentic real-time system clock updating every second (`IST`) with developer availability status. |
| **SEO & OpenGraph Standards** | `app/layout.tsx` | **COMPLETED** | Social preview cards configured for LinkedIn, Twitter (`summary_large_image`), and WhatsApp for `arunjyoticode.me`. |
| **Static Site Generation (SSG)** | Next.js 16 (Turbopack) | **COMPLETED** | `generateStaticParams()` configured. `npm run build` generates **13/13 static routes** with 0 errors. |
| **Learning Journal** | `LEARNING_JOURNAL.md` | **COMPLETED** | 28 lessons documented, bridging React/Next.js/CSS concepts directly to Python/FastAPI/Pandas. |

---

## 3. Implementation Status of Milestones

### Milestone 1: Real AI Agent (`ARUN.AI`) with LangGraph, SQLite Memory, Voice I/O & Guardrails — [ COMPLETED ]
* **Status:** Fully built, verified, and deployed on `http://localhost:3000`.
* **Key Achievements:**
  1. **Self-Hosted LangGraph Cyclic State Graph:** 5 nodes (`input_guardrail`, `db_retrieval`, `gemini_inference`, `eval_guardrail`, `db_persist`) with conditional bypass for attacks in <5ms.
  2. **Embedded SQLite Memory:** LibSQL database (`data/arun_sys.db`) storing multi-turn session histories and verified engineering facts.
  3. **Page-Aware Grounding:** Automatic route detection (`pathname`) providing tailored, non-hallucinated explanations for all systems and sections.
  4. **Strict Anti-Hallucination Guardrail:** Direct ground-truth injection preventing unlisted framework inventions.
  5. **Two-Way Voice Loop:** Web Speech Recognition microphone input (`[ 🎙️ ]`) + neural speech synthesis (`Microsoft Natural`, `Google US English`) with acoustic cadence tuning.
  6. **Token-Efficient Reasoning:** 2–3 sentence high-density constraint (~50–75 words) for sub-second responses and speech delivery.
  7. **Chat Controls:** Clear/Reset session button (`[ 🗑️ CLEAR ]`) and persistent upper-right widget (`fixed top-20 right-6 z-50`).

---

### Milestone 2: High-Resolution JPG Certificate Showcase & Credential Modal — [ COMPLETED ]
* **Status:** Fully built, verified, and active on `/about` and `/evidence`.
* **Key Achievements:**
  1. **Standardized 14 Credentials (`/public/certificates/`):** AWS, Microsoft, IIT Guwahati DA 210, DataCamp, Kaggle, Deloitte.
  2. **Interactive Certificate Gallery (`components/CertificateGallery.tsx`):** Filterable by domain (Academic, Cloud, AI/ML, Data, Internship) with chronological toggle (`↓ NEWEST FIRST` $\leftrightarrow$ `↑ EARLIEST FIRST`).
  3. **High-Resolution Lightbox Modal:** Full-screen zoom with credential ID, verification URL, and skill tags (`Esc` / backdrop dismiss).

---

### Milestone 3: System Cockpit Tabs & Studio Audio Player (`/systems/[slug]`) — [ CURRENT FOCUS ]
* **Objective:** Transform the long-scrolling project detail page into an executive 4-tab mission control cockpit with embedded audio briefings.
* **Key Components:**
  1. **Studio Audio Player Mounting:** Embed `<StudioAudioPlayer />` with animated waveforms for spoken architectural briefings.
  2. **System Cockpit Tab Bar:** Tabbed interface switching between:
     - `[ 📐 ARCHITECTURE WORKFLOW ]` (Interactive Canvas)
     - `[ 📊 VERIFIED METRICS & CODE ]` (Empirical benchmarks & Python source)
     - `[ 🛠️ INCIDENT POST-MORTEM ]` (Forensic failure analysis)
     - `[ 🎙️ AUDIO BRIEFING & DEMO ]` (Studio audio briefing + video container)

---

### Milestone 4: Production GitHub Push & Domain Deployment (`arunjyoticode.me`) — [ PENDING USER GO-AHEAD ]
* **Objective:** Commit all verified milestones cleanly to Git, push to GitHub (`github.com/Arun660248/portfolio`), and deploy on Vercel connected to `arunjyoticode.me`.

---

## 4. Verification & Testing Standards

- **Zero TypeScript Errors:** Every change must pass `npx tsc --noEmit` cleanly.
- **SSG Integrity:** `npm run build` must continue to pre-render 13/13 static routes with zero build failures.
- **Pedagogical Integrity:** Follow `PROJECT_CONSTRAINTS.md` (strict 20-30 line edits, explain BEFORE and AS we write, bridge to Python, in-project checkpoint questions).
- **Zero Intrusive Popups:** Maintain unobtrusive, professional UX.
