export interface RoleRequirementProof {
  requirement: string;
  proof: string;
  repoEvidence: string;
  status: "verified" | "production";
}

export interface RoleEvaluation {
  id: "agentic" | "rag" | "applied-ai" | "backend-ai";
  roleName: string;
  targetFocus: string;
  matchScore: number;
  matchGrade: string;
  summaryRationale: string;
  whyHireROI: string[];
  requirementsMatrix: RoleRequirementProof[];
  backedProjectSlugs: string[];
  atsCandidateSummary: string;
}
