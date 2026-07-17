"use client";

import { useEffect, useState } from "react";
import { transparencyService } from "../services/transparencyService";
import type { TransparencyData } from "../types/transparency.types";

const POLL_INTERVAL_MS = 30000;

export function useTransparencyData() {
  const [data, setData] = useState<TransparencyData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const result = await transparencyService.get();
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load transparency data");
        }
      }
    }

    fetchData();
    const interval = setInterval(fetchData, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { data, error };
}
