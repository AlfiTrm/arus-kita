"use client";

import { useEffect, useState } from "react";
import { adminDashboardService } from "../services/adminDashboardService";
import type { AdminDashboardData } from "../types/adminDashboard.types";

export function useAdminDashboard() {
  const [dashboard, setDashboard] = useState<AdminDashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchDashboard() {
      try {
        const data = await adminDashboardService.get();
        if (!cancelled) {
          setDashboard(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Gagal memuat dashboard admin");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  return { dashboard, error, isLoading };
}
