export interface EndpointHealth {
  slug: string;
  url: string;
  isOnline: boolean;
  status: "ONLINE" | "DORMANT_AWS" | "OFFLINE";
  httpCode?: number;
  latencyMs?: number;
  reason?: string;
  lastChecked: string;
}

export interface SystemsHealthReport {
  total: number;
  onlineCount: number;
  dormantCount: number;
  timestamp: string;
  systems: Record<string, EndpointHealth>;
}
