"use client";

import { useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import { usePoskoList } from "../hooks/usePoskoList";
import { DISASTER_FILTERS, MapToolbar, matchesPoskoFilter, type DisasterFilter } from "./MapToolbar";
import { MapLegend } from "./MapLegend";
import { PoskoMarker } from "./PoskoMarker";
import { PoskoSidebar } from "./PoskoSidebar";

const INDONESIA_CENTER: [number, number] = [-2.5, 118];

export function CrisisMap() {
  const { posko, error: mapError } = usePoskoList();
  const { summary, error: summaryError } = useDashboardSummary();
  const mapRef = useRef<LeafletMap | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<DisasterFilter>(DISASTER_FILTERS[0]);

  const query = search.trim().toLowerCase();
  const filteredMarkers = posko.filter((p) => matchesPoskoFilter(p, filter, query));
  const filteredSidebar = (summary?.items ?? []).filter((p) => matchesPoskoFilter(p, filter, query));

  const hasCritical = posko.some((p) => p.urgency_level === "critical");
  const error = mapError ?? summaryError;

  function flyToPosko(postId: string) {
    const target = posko.find((p) => p.post_id === postId);
    if (target) mapRef.current?.flyTo([target.latitude, target.longitude], 12, { duration: 0.8 });
  }

  return (
    <div className="flex h-full flex-col">
      <MapToolbar
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
        showAlert={hasCritical}
      />

      <div className="relative flex flex-1 overflow-hidden">
        <div className="relative flex-1">
          <MapContainer center={INDONESIA_CENTER} zoom={5} scrollWheelZoom className="h-full w-full" ref={mapRef}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredMarkers.map((p) => (
              <PoskoMarker key={p.post_id} posko={p} />
            ))}
          </MapContainer>
          <MapLegend />
          {error && (
            <div className="absolute top-4 left-4 z-1000 rounded-lg bg-error/90 px-3 py-2 text-xs text-white shadow">
              {error}
            </div>
          )}
        </div>

        <PoskoSidebar posko={filteredSidebar} onSelect={flyToPosko} />
      </div>
    </div>
  );
}
