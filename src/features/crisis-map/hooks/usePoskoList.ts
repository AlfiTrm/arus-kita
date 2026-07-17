"use client";

import { useEffect, useState } from "react";
import { poskoService } from "../services/poskoService";
import type { Posko } from "../types/crisisMap.types";

const POLL_INTERVAL_MS = 8000;

export function usePoskoList() {
  const [posko, setPosko] = useState<Posko[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchPosko() {
      try {
        const data = await poskoService.list();
        if (!cancelled) {
          setPosko(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load posko data");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchPosko();
    const interval = setInterval(fetchPosko, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { posko, error, isLoading };
}
