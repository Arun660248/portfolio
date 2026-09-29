export type NodeType = "trigger" | "model" | "tool" | "database" | "guardrail";

export interface WorkflowNode {
  id: string;
  label: string;
  subtitle: string;
  type: NodeType;
  x: number; // Percentage X coordinate (0 - 100)
  y: number; // Percentage Y coordinate (0 - 100)
  description: string;
  codeSnippet?: string;
  parameters?: Record<string, string>;
}

export interface WorkflowEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
}

export interface SystemWorkflow {
  projectSlug: string;
  title: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}
