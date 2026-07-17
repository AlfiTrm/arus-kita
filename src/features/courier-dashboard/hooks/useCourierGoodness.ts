"use client";

import { useEffect, useState } from "react";
import { courierGoodnessService } from "../services/courierGoodnessService";
import type { CourierGoodnessData } from "../types/courierGoodness.types";

export function useCourierGoodness() {
  const [data, setData] = useState<CourierGoodnessData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchGoodness() {
      setIsLoading(true);
      try {
        const result = await courierGoodnessService.get();
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Gagal memuat jejak kebaikan");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchGoodness();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, error, isLoading };
}
