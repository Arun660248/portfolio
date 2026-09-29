import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import AmbientBackground from "@/components/AmbientBackground";
import TelemetryPulseBar from "@/components/TelemetryPulseBar";
import FloatingAgentWidget from "@/components/FloatingAgentWidget";
import CommandPalette from "@/components/CommandPalette";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arunjyoticode.me"),
  title: {
    default: "ARUN.SYS | Applied AI Systems Engineering",
    template: "%s | ARUN.SYS",
  },
  description:
    "Evidence-based Applied AI portfolio by Arun Jyoti Chakraborty (IIT Guwahati). Features production agent architectures, deterministic guardrails, verified benchmarks, and post-mortems.",
  keywords: [
    "Applied AI",
    "Agentic AI",
    "RAG",
    "Google ADK",
    "FastMCP",
    "LangChain",
    "FastAPI",
    "Arun Jyoti Chakraborty",
    "IIT Guwahati",
  ],
  authors: [{ name: "Arun Jyoti Chakraborty", url: "https://arunjyoticode.me" }],
  creator: "Arun Jyoti Chakraborty",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arunjyoticode.me",
    title: "ARUN.SYS // Applied AI Systems Engineering",
    description:
      "Production AI systems built with verifiable metrics, deterministic guardrails, and reproducible benchmark traces.",
    siteName: "ARUN.SYS",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARUN.SYS // Applied AI Systems Engineering",
    description:
      "Production AI systems built with verifiable metrics, deterministic guardrails, and forensic failure analysis.",
    creator: "@Arun660248",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white relative selection:bg-emerald-500/30 selection:text-emerald-300">
        <AmbientBackground />
        <TelemetryPulseBar />
        <Header />
        <div className="flex-1 relative z-10">{children}</div>
        <CommandPalette />
        <FloatingAgentWidget />
      </body>
    </html>
  );
}
