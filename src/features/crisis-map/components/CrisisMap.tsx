"use client";

import { memo, useCallback, useMemo, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";
import type { RefObject } from "react";
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

const PoskoMap = memo(function PoskoMap({
  mapRef,
  posko,
  userLocation,
}: {
  mapRef: RefObject<LeafletMap | null>;
  posko: ReturnType<typeof usePoskoList>;
  userLocation: [number, number] | null;
}) {
  return (
    <MapContainer center={INDONESIA_CENTER} zoom={4.8} minZoom={4} scrollWheelZoom className="h-full w-full" ref={mapRef}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {posko.map((p) => (
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
  );
});

export function CrisisMap() {
  const posko = usePoskoList();
  const summary = useDashboardSummary();
  const mapRef = useRef<LeafletMap | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<DisasterFilter>(DISASTER_FILTERS[0]);
  const [isMobileListOpen, setIsMobileListOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locateError, setLocateError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const closeMobileList = useCallback(() => setIsMobileListOpen(false), []);

  const query = search.trim().toLowerCase();
  const filteredMarkers = useMemo(
    () => posko.filter((p) => matchesPoskoFilter(p, filter, query)),
    [posko, filter, query],
  );
  const filteredSidebar = useMemo(
    () => summary.items.filter((p) => matchesPoskoFilter(p, filter, query)),
    [summary.items, filter, query],
  );

  const flyToPosko = useCallback((postId: string) => {
    const target = posko.find((p) => p.post_id === postId);
    if (target) mapRef.current?.flyTo([target.latitude, target.longitude], 12, { duration: 0.8 });
  }, [posko]);

  function handleLocateMe() {
    if (!navigator.geolocation) {
      setLocateError("Perangkat ini belum mendukung lokasi.");
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
        const message =
          err.code === err.PERMISSION_DENIED
            ? "Izinkan akses lokasi untuk memusatkan peta."
            : err.code === err.TIMEOUT
              ? "Lokasi belum ditemukan. Coba lagi."
              : "Lokasi perangkat belum tersedia.";
        setLocateError(message);
        setIsLocating(false);
      },
      { enableHighAccuracy: true },
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <MapToolbar
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
      />

      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        <div
          role="region"
          aria-label="Peta lokasi posko"
          data-lenis-prevent
          className="relative min-w-0 flex-1"
        >
          <PoskoMap mapRef={mapRef} posko={filteredMarkers} userLocation={userLocation} />
          <MapLegend />
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
            className="absolute bottom-4 right-4 z-1000 flex min-h-11 items-center gap-2 rounded-full bg-main px-4 py-3 text-sm font-semibold text-white shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
          >
            <List size={16} aria-hidden="true" />
            Daftar posko ({filteredSidebar.length})
          </button>
        </div>

        <PoskoSidebar posko={filteredSidebar} onSelect={flyToPosko} />
      </div>

      {isMobileListOpen && (
        <MobilePoskoSheet
          posko={filteredSidebar}
          onSelect={flyToPosko}
          onClose={closeMobileList}
        />
      )}
    </div>
  );
}
