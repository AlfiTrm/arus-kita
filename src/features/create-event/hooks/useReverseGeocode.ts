"use client";

import { useEffect, useState } from "react";

interface NominatimResponse {
  display_name?: string;
  address?: Record<string, string>;
}

interface ReverseGeocodeState {
  address: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useReverseGeocode(latitude: number | null, longitude: number | null) {
  const [state, setState] = useState<ReverseGeocodeState>({ address: null, isLoading: false, error: null });
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (latitude === null || longitude === null) return;

    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- kicking off a fetch triggered by lat/lng or refetch() change
    setState({ address: null, isLoading: true, error: null });

    async function fetchAddress() {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
        );
        if (!res.ok) throw new Error("Gagal mengambil alamat");
        const data = (await res.json()) as NominatimResponse;
        const addr = data.address ?? {};
        const parts = [addr.suburb ?? addr.village ?? addr.town, addr.city ?? addr.county, addr.state].filter(
          (part): part is string => Boolean(part),
        );
        const label = parts.length > 0 ? parts.join(", ") : (data.display_name ?? "Alamat tidak ditemukan");
        if (!cancelled) setState({ address: label, isLoading: false, error: null });
      } catch (err) {
        if (!cancelled) {
          setState({
            address: null,
            isLoading: false,
            error: err instanceof Error ? err.message : "Gagal mengambil alamat",
          });
        }
      }
    }

    fetchAddress();

    return () => {
      cancelled = true;
    };
  }, [latitude, longitude, nonce]);

  function refetch() {
    setNonce((n) => n + 1);
  }

  return { ...state, refetch };
}
