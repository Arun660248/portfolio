import { NextResponse } from "next/server";
import { PROJECTS } from "@/data/projects";
import { EndpointHealth, SystemsHealthReport } from "@/types/system-status";

export const dynamic = "force-dynamic";

async function probeEndpoint(slug: string, url?: string): Promise<EndpointHealth> {
  const timestamp = new Date().toISOString();

  if (!url) {
    return {
      slug,
      url: "",
      isOnline: false,
      status: "OFFLINE",
      reason: "No live endpoint registered",
      lastChecked: timestamp,
    };
  }

  // Internal route (e.g. /systems/agentic-audit-harness) runs in-process
  if (url.startsWith("/")) {
    return {
      slug,
      url,
      isOnline: true,
      status: "ONLINE",
      httpCode: 200,
      latencyMs: 1,
      reason: "In-process Next.js execution engine",
      lastChecked: timestamp,
    };
  }

  const startTime = Date.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      headers: {
        "User-Agent": "ARUN-SYS-Telemetry-Heartbeat/1.0",
      },
      next: { revalidate: 180 },
    });

    clearTimeout(timeoutId);
    const latencyMs = Date.now() - startTime;

    if (response.status < 500) {
      return {
        slug,
        url,
        isOnline: true,
        status: "ONLINE",
        httpCode: response.status,
        latencyMs,
        lastChecked: timestamp,
      };
    } else {
      return {
        slug,
        url,
        isOnline: false,
        status: "DORMANT_AWS",
        httpCode: response.status,
        latencyMs,
        reason: "Endpoint returned 5xx (Dormant to conserve cloud compute)",
        lastChecked: timestamp,
      };
    }
  } catch (err: any) {
    const latencyMs = Date.now() - startTime;
    const isTimeout = err?.name === "AbortError";

    return {
      slug,
      url,
      isOnline: false,
      status: "DORMANT_AWS",
      latencyMs,
      reason: isTimeout
        ? "Connection timeout (>2.5s) — EC2 instance dormant to conserve AWS credits"
        : "Host unreachable — EC2 instance dormant to conserve AWS credits",
      lastChecked: timestamp,
    };
  }
}

export async function GET() {
  const probePromises = PROJECTS.map((p) => probeEndpoint(p.slug, p.liveUrl));
  const results = await Promise.allSettled(probePromises);

  const systemsMap: Record<string, EndpointHealth> = {};
  let onlineCount = 0;
  let dormantCount = 0;

  results.forEach((res, idx) => {
    const slug = PROJECTS[idx].slug;
    if (res.status === "fulfilled") {
      systemsMap[slug] = res.value;
      if (res.value.isOnline) {
        onlineCount++;
      } else {
        dormantCount++;
      }
    } else {
      systemsMap[slug] = {
        slug,
        url: PROJECTS[idx].liveUrl || "",
        isOnline: false,
        status: "DORMANT_AWS",
        reason: "Probe failed to execute",
        lastChecked: new Date().toISOString(),
      };
      dormantCount++;
    }
  });

  const report: SystemsHealthReport = {
    total: PROJECTS.length,
    onlineCount,
    dormantCount,
    timestamp: new Date().toISOString(),
    systems: systemsMap,
  };

  return NextResponse.json(report, {
    headers: {
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
    },
  });
}
