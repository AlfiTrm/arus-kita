"use client";

import { useEffect, useState } from "react";
import { courierTaskService } from "../services/courierTaskService";
import type { CourierTaskDetail } from "../types/courierTask.types";

export function useCourierTaskDetail(orderId: string) {
  const [task, setTask] = useState<CourierTaskDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchDetail() {
      setIsLoading(true);
      try {
        const data = await courierTaskService.detail(orderId);
        if (!cancelled) {
          setTask(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Gagal memuat detail tugas");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchDetail();

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  return { task, error, isLoading };
}
