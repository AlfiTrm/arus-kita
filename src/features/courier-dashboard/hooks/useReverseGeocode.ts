"use client";

import { useEffect, useState } from "react";

export function useReverseGeocode(latitude: number | null, longitude: number | null) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (latitude === null || longitude === null) return;

    let cancelled = false;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=id`, {
      headers: { "User-Agent": "ArusKita/1.0" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const address = data.address ?? {};
        const district = address.suburb ?? address.village ?? address.city_district ?? "";
        const city = address.city ?? address.county ?? address.city_district ?? "";
        const parts = [district, city].filter(Boolean);
        if (parts.length > 0) setLabel(parts.join(", "));
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [latitude, longitude]);

  return label;
}
