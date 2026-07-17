"use client";

import { useEffect, useState } from "react";
import { donorProfileService } from "../services/donorProfileService";
import type { DonorProfile } from "../types/donorProfile.types";

export function useDonorProfile() {
  const [profile, setProfile] = useState<DonorProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchProfile() {
      try {
        const data = await donorProfileService.get();
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
