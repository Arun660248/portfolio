"use client";

import { useState, useEffect } from "react";
import { SystemsHealthReport, EndpointHealth } from "@/types/system-status";

let cachedReport: SystemsHealthReport | null = null;
let fetchPromise: Promise<SystemsHealthReport> | null = null;

async function fetchStatusReport(): Promise<SystemsHealthReport> {
  if (cachedReport) return cachedReport;
  if (!fetchPromise) {
    fetchPromise = fetch("/api/systems/status")
      .then((res) => res.json())
      .then((data: SystemsHealthReport) => {
        cachedReport = data;
        fetchPromise = null;
        return data;
      })
      .catch((err) => {
        fetchPromise = null;
        throw err;
      });
  }
  return fetchPromise;
}

export function useSystemStatus() {
  const [report, setReport] = useState<SystemsHealthReport | null>(cachedReport);
  const [isLoading, setIsLoading] = useState(!cachedReport);

  useEffect(() => {
    let isMounted = true;
    fetchStatusReport()
      .then((data) => {
        if (isMounted) {
          setReport(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const getStatus = (slug: string): EndpointHealth | undefined => {
    return report?.systems?.[slug];
  };

  return {
    report,
    isLoading,
    getStatus,
    onlineCount: report?.onlineCount ?? 0,
    dormantCount: report?.dormantCount ?? 0,
    total: report?.total ?? 6,
  };
}
