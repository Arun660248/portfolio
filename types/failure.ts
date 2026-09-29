export interface FailureAnalysis {
  projectSlug: string;
  triggerEvent: string;
  observedFailure: string;
  rootCause: string;
  mitigationEngineered: string;
  status: "mitigated" | "investigating" | "by-design";
}
