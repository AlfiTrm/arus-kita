"use client";

import { useEffect, useState } from "react";
import { poskoService } from "../services/poskoService";
import type { DashboardSummary } from "../types/crisisMap.types";

const POLL_INTERVAL_MS = 8000;

export function useDashboardSummary() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchSummary() {
      try {
        const data = await poskoService.summary();
        if (!cancelled) {
          setSummary(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load posko summary");
        }
      }
    }

    fetchSummary();
    const interval = setInterval(fetchSummary, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { summary, error };
}
