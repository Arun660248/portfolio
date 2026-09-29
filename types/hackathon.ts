export interface HackathonEntry {
  id: string;
  title: string;
  organizer: string;
  date: string;
  status: "completed" | "active_radar" | "in_development";
  track: string;
  problemStatement: string;
  architectureSummary: string;
  stack: string[];
  projectSlug?: string;
  submissionUrl?: string;
  badge: string;
}
