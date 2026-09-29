import { NextResponse } from "next/server";
import { GithubTelemetryData, GithubProfile, GithubRepo, GithubActivityEvent } from "@/types/github";

const GITHUB_USERNAME = "Arun660248";

export async function GET() {
  const headers = {
    "User-Agent": "ARUN-SYS-Telemetry",
    Accept: "application/vnd.github.v3+json",
  };

  try {
    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=6`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok) {
      throw new Error(`GitHub API returned status ${userRes.status}`);
    }

    const userData = await userRes.json();
    const reposData = reposRes.ok ? await reposRes.json() : [];
    const eventsData = eventsRes.ok ? await eventsRes.json() : [];

    const profile: GithubProfile = {
      login: userData.login || GITHUB_USERNAME,
      name: userData.name || "Arun Jyoti Chakraborty",
      avatarUrl: userData.avatar_url || "https://avatars.githubusercontent.com/u/184896307",
      bio: userData.bio || "AI Engineer building multi-agent systems and RAG pipelines.",
      location: userData.location || "West Bengal, India",
      publicRepos: userData.public_repos || 7,
      followers: userData.followers || 0,
      htmlUrl: userData.html_url || `https://github.com/${GITHUB_USERNAME}`,
    };

    const repositories: GithubRepo[] = Array.isArray(reposData)
      ? reposData.map((r: any) => ({
          id: r.id,
          name: r.name,
          fullName: r.full_name,
          description: r.description,
          htmlUrl: r.html_url,
          stars: r.stargazers_count || 0,
          language: r.language,
          topics: r.topics || [],
          updatedAt: r.updated_at,
        }))
      : [];

    const recentActivity: GithubActivityEvent[] = Array.isArray(eventsData)
      ? eventsData.map((e: any) => ({
          id: e.id,
          type: e.type,
          repoName: e.repo?.name || GITHUB_USERNAME,
          repoUrl: `https://github.com/${e.repo?.name}`,
          createdAt: e.created_at,
          message:
            e.payload?.commits?.[0]?.message ||
            e.payload?.description ||
            `Triggered ${e.type.replace("Event", "")} on ${e.repo?.name}`,
        }))
      : [];

    const payload: GithubTelemetryData = {
      profile,
      recentActivity,
      repositories,
      lastSyncedAt: new Date().toISOString(),
      isLive: true,
    };

    return NextResponse.json(payload);
  } catch (error) {
    // Graceful fallback if rate-limited
    const fallback: GithubTelemetryData = {
      profile: {
        login: GITHUB_USERNAME,
        name: "Arun Jyoti Chakraborty",
        avatarUrl: "https://avatars.githubusercontent.com/u/184896307",
        bio: "AI Engineer building multi-agent systems and RAG pipelines. B.Sc. Data Science & AI @ IIT Guwahati.",
        location: "West Bengal, India",
        publicRepos: 7,
        followers: 0,
        htmlUrl: `https://github.com/${GITHUB_USERNAME}`,
      },
      recentActivity: [
        {
          id: "fallback-1",
          type: "PushEvent",
          repoName: "Arun660248/healthcare-appointment-assistant",
          repoUrl: "https://github.com/Arun660248/healthcare-appointment-assistant",
          createdAt: "2026-09-06T06:59:36Z",
          message: "Deploy healthcare appointment assistant with Tars NeoAgent & Salesforce CRM sync",
        },
      ],
      repositories: [
        {
          id: 1358870102,
          name: "healthcare-appointment-assistant",
          fullName: "Arun660248/healthcare-appointment-assistant",
          description: "AI-powered healthcare appointment assistant for MyEyeDr with RAG & Salesforce integration",
          htmlUrl: "https://github.com/Arun660248/healthcare-appointment-assistant",
          stars: 0,
          language: "Python",
          topics: ["ai-agent", "rag", "healthcare", "llm"],
          updatedAt: "2026-09-06T07:39:00Z",
        },
      ],
      lastSyncedAt: new Date().toISOString(),
      isLive: false,
    };

    return NextResponse.json(fallback);
  }
}
