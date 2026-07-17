"use client";

import { useEffect, useState } from "react";

interface GeoState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeoState>({ latitude: null, longitude: null, error: null });

  useEffect(() => {
    if (!navigator.geolocation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from a browser API unavailable during SSR
      setState((s) => ({ ...s, error: "Geolocation tidak didukung perangkat ini" }));
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setState({ latitude: pos.coords.latitude, longitude: pos.coords.longitude, error: null });
      },
      (err) => {
        setState((s) => ({ ...s, error: err.message }));
      },
      { enableHighAccuracy: true },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return state;
}
