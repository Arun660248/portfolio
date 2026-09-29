import { Annotation } from "@langchain/langgraph";
import { KnowledgeFact } from "@/lib/db/seed";

export interface Citation {
  claim: string;
  proof: string;
  targetRoute: string;
  badge: string;
}

export const AgentStateAnnotation = Annotation.Root({
  sessionId: Annotation<string>(),
  query: Annotation<string>(),
  history: Annotation<{ query: string; answer: string }[]>(),
  retrievedFacts: Annotation<KnowledgeFact[]>(),
  guardrailViolation: Annotation<string | null>(),
  rawResponse: Annotation<string>(),
  finalAnswer: Annotation<string>(),
  citations: Annotation<Citation[]>(),
  evalScore: Annotation<number>(),
  trace: Annotation<{ node: string; latencyMs: number }[]>(),
  apiKey: Annotation<string | undefined>(),
  pathname: Annotation<string | undefined>(),
});

export type AgentState = typeof AgentStateAnnotation.State;
