"use client";

import { useCallback, useEffect, useState } from "react";
import { adminDistributionService } from "../services/adminDistributionService";
import type { AdminOrderReceivingData } from "../types/adminDistribution.types";

export function useAdminOrderReceiving(orderId: string) {
  const [data, setData] = useState<AdminOrderReceivingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refetch = useCallback(async () => {
    try {
      const result = await adminDistributionService.getReceiving(orderId);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat detail order");
    }
  }, [orderId]);

  useEffect(() => {
    let cancelled = false;

    async function fetchInitial() {
      setIsLoading(true);
      try {
        const result = await adminDistributionService.getReceiving(orderId);
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Gagal memuat detail order");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchInitial();

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  return { data, error, isLoading, refetch };
}
