"use client";

import { useEffect, useState } from "react";
import { donorDashboardMapService } from "../services/donorDashboardMapService";
import type { DonorDashboardMapData } from "../types/donorMap.types";

const POLL_INTERVAL_MS = 15000;

export function useDonorDashboardMap() {
  const [data, setData] = useState<DonorDashboardMapData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchMap() {
      try {
        const result = await donorDashboardMapService.get();
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Gagal memuat peta");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchMap();
    const interval = setInterval(fetchMap, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { data, error, isLoading };
}
