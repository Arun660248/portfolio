export interface Metric {
  label: string;
  value: string | number;
  change?: string;
  verified: boolean;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: "model" | "tool" | "database" | "guardrail";
  description?: string;
  codeSnippet?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: "agent" | "rag" | "eval" | "fullstack";
  stack: string[];
  metrics: Metric[];
  architecture: ArchitectureNode[];
  githubUrl?: string;
  liveUrl?: string;
  evidenceSummary: string;
}

