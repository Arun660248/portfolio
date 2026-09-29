export interface GithubProfile {
  login: string;
  name: string;
  avatarUrl: string;
  bio: string;
  location: string;
  publicRepos: number;
  followers: number;
  htmlUrl: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  stars: number;
  language: string | null;
  topics: string[];
  updatedAt: string;
}

export interface GithubActivityEvent {
  id: string;
  type: string;
  repoName: string;
  repoUrl: string;
  createdAt: string;
  message?: string;
}

export interface GithubTelemetryData {
  profile: GithubProfile;
  recentActivity: GithubActivityEvent[];
  repositories: GithubRepo[];
  lastSyncedAt: string;
  isLive: boolean;
}
