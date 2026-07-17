"use client";

import { useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { List, LocateFixed } from "lucide-react";
import { CircleMarker, MapContainer, TileLayer } from "react-leaflet";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import { usePoskoList } from "../hooks/usePoskoList";
import { DISASTER_FILTERS, MapToolbar, matchesPoskoFilter, type DisasterFilter } from "./MapToolbar";
import { MapLegend } from "./MapLegend";
import { MobilePoskoSheet } from "./MobilePoskoSheet";
import { PoskoMarker } from "./PoskoMarker";
import { PoskoSidebar } from "./PoskoSidebar";

const INDONESIA_CENTER: [number, number] = [-2.5, 118];

export function CrisisMap() {
  const { posko, error: mapError } = usePoskoList();
  const { summary, error: summaryError, isLoading: isSummaryLoading } = useDashboardSummary();
  const mapRef = useRef<LeafletMap | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<DisasterFilter>(DISASTER_FILTERS[0]);
  const [isMobileListOpen, setIsMobileListOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locateError, setLocateError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const query = search.trim().toLowerCase();
  const filteredMarkers = posko.filter((p) => matchesPoskoFilter(p, filter, query));
  const filteredSidebar = (summary?.items ?? []).filter((p) => matchesPoskoFilter(p, filter, query));

  const hasCritical = posko.some((p) => p.urgency_level === "critical");
  const error = mapError ?? summaryError;

  function flyToPosko(postId: string) {
    const target = posko.find((p) => p.post_id === postId);
    if (target) mapRef.current?.flyTo([target.latitude, target.longitude], 12, { duration: 0.8 });
  }

  function handleLocateMe() {
    if (!navigator.geolocation) {
      setLocateError("Geolocation tidak didukung perangkat ini");
      return;
    }

    setIsLocating(true);
    setLocateError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(coords);
        mapRef.current?.flyTo(coords, 13, { duration: 0.8 });
        setIsLocating(false);
      },
      (err) => {
        setLocateError(err.message);
        setIsLocating(false);
      },
      { enableHighAccuracy: true },
    );
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
        <div role="region" aria-label="Peta lokasi posko bencana" className="relative flex-1">
          <MapContainer center={INDONESIA_CENTER} zoom={5} scrollWheelZoom className="h-full w-full" ref={mapRef}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredMarkers.map((p) => (
              <PoskoMarker key={p.post_id} posko={p} />
            ))}
            {userLocation && (
              <CircleMarker
                center={userLocation}
                radius={8}
                pathOptions={{ color: "#fff", weight: 2, fillColor: "#2563eb", fillOpacity: 1 }}
              />
            )}
          </MapContainer>
          <MapLegend />
          {error && (
            <div
              role="alert"
              className="absolute top-4 left-4 z-1000 rounded-lg bg-error/90 px-3 py-2 text-xs text-white shadow"
            >
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleLocateMe}
            disabled={isLocating}
            aria-label="Temukan lokasi saya"
            className="absolute top-4 right-4 z-1000 flex h-11 w-11 items-center justify-center rounded-full bg-surface text-black shadow-lg disabled:opacity-50"
          >
            <LocateFixed size={18} className={isLocating ? "animate-pulse" : ""} />
          </button>

          {locateError && (
            <div
              role="alert"
              className="absolute top-18 right-4 z-1000 max-w-56 rounded-lg bg-error/90 px-3 py-2 text-xs text-white shadow"
            >
              {locateError}
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsMobileListOpen(true)}
            className="absolute bottom-4 right-4 z-1000 flex items-center gap-2 rounded-full bg-main px-4 py-3 text-sm font-semibold text-white shadow-lg md:hidden"
          >
            <List size={16} aria-hidden="true" />
            Daftar posko ({filteredSidebar.length})
          </button>
        </div>

        <PoskoSidebar posko={filteredSidebar} onSelect={flyToPosko} isLoading={isSummaryLoading} />
      </div>

      {isMobileListOpen && (
        <MobilePoskoSheet
          posko={filteredSidebar}
          onSelect={flyToPosko}
          onClose={() => setIsMobileListOpen(false)}
          isLoading={isSummaryLoading}
        />
      )}
    </div>
  );
}
