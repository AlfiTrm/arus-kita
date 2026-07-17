"use client";

import { Camera } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { PoskoMarker } from "@/features/crisis-map/components/PoskoMarker";
import { usePoskoList } from "@/features/crisis-map/hooks/usePoskoList";
import { useDistributionList } from "@/features/distributions/hooks/useDistributionList";

const INDONESIA_CENTER: [number, number] = [-2.5, 118];

function truncateHash(hash: string): string {
  return hash.length > 12 ? `${hash.slice(0, 6)}...${hash.slice(-4)}` : hash;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

export function HeroMapPreview() {
  const { posko } = usePoskoList();
  const { distributions } = useDistributionList();
  const latest = distributions[0];

  return (
    <div className="relative isolate aspect-4/3 w-full overflow-hidden rounded-2xl border border-black/5">
      <MapContainer
        center={INDONESIA_CENTER}
        zoom={5}
        dragging={false}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        attributionControl={false}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {posko.map((p) => (
          <PoskoMarker key={p.post_id} posko={p} />
        ))}
      </MapContainer>

      {latest && (
        <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-xl bg-surface px-4 py-3 shadow-lg">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-main">
            <Camera size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-black">{latest.title}</p>
            <p className="truncate text-xs text-black/50">
              {latest.gps_valid ? "GPS valid" : "GPS tidak valid"} · {formatTime(latest.captured_at)} WIB · hash{" "}
              {truncateHash(latest.audit_hash)}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
            ✓ SAMPAI
          </span>
        </div>
      )}
    </div>
  );
}
