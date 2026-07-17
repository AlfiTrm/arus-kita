"use client";

import { useEffect, useState } from "react";
import { courierProfileService } from "../services/courierProfileService";
import type { CourierProfileData } from "../types/courierProfile.types";

export function useCourierProfile() {
  const [profile, setProfile] = useState<CourierProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchProfile() {
      setIsLoading(true);
      try {
        const data = await courierProfileService.get();
        if (!cancelled) {
          setProfile(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Gagal memuat profil");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  return { profile, error, isLoading };
}
