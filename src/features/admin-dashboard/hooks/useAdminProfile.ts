"use client";

import { useEffect, useState } from "react";
import { adminProfileService } from "../services/adminProfileService";
import type { AdminProfile } from "../types/adminProfile.types";

export function useAdminProfile() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchProfile() {
      try {
        const data = await adminProfileService.get();
        if (!cancelled) {
          setProfile(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Gagal memuat profil admin");
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
