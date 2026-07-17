"use client";

import { useEffect, useState } from "react";
import { useGeolocation } from "@/shared/hooks/useGeolocation";
import { courierTaskService } from "../services/courierTaskService";
import type { CourierTask } from "../types/courierTask.types";

export function useCourierTasks() {
  const { latitude, longitude, error: geoError } = useGeolocation();
  const [tasks, setTasks] = useState<CourierTask[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (latitude === null || longitude === null) return;

    let cancelled = false;

    async function fetchTasks() {
      setIsLoading(true);
      try {
        const data = await courierTaskService.list({ lat: latitude as number, lng: longitude as number });
        if (!cancelled) {
          setTasks(data.items);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Gagal memuat tugas");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchTasks();

    return () => {
      cancelled = true;
    };
  }, [latitude, longitude]);

  return { tasks, error: error ?? geoError, isLoading: isLoading && !geoError, latitude, longitude };
}
