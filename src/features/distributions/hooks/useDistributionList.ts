"use client";

import { useEffect, useState } from "react";
import { distributionService } from "../services/distributionService";
import type { Distribution } from "../types/distribution.types";

const POLL_INTERVAL_MS = 15000;

export function useDistributionList() {
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchDistributions() {
      try {
        const data = await distributionService.list();
        if (!cancelled) {
          setDistributions(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load distribution data");
        }
      }
    }

    fetchDistributions();
    const interval = setInterval(fetchDistributions, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { distributions, error };
}
