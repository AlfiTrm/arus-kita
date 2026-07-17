"use client";

import { useEffect, useState } from "react";
import { pointsService } from "../services/pointsService";
import type { PointsDashboard } from "../types/points.types";

export function useDonorPoints() {
  const [points, setPoints] = useState<PointsDashboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchPoints() {
      try {
        const data = await pointsService.get();
        if (!cancelled) {
          setPoints(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Gagal memuat poin");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchPoints();

    return () => {
      cancelled = true;
    };
  }, []);

  return { points, error, isLoading };
}
