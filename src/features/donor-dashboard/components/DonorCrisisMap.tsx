"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { DonorMapLegend } from "./DonorMapLegend";
import { DonorMapMarker } from "./DonorMapMarker";
import { DONOR_DISASTER_FILTERS, DonorMapToolbar, type DonorDisasterFilter } from "./DonorMapToolbar";
import type { DonorDashboardMapData } from "../types/donorMap.types";

const INDONESIA_CENTER: [number, number] = [-2.5, 118];

export function DonorCrisisMap({ data, error }: { data: DonorDashboardMapData | null; error: string | null }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<DonorDisasterFilter>(DONOR_DISASTER_FILTERS[0]);

  function goToDetail(postId: string) {
    router.push(`/dashboard/donatur/posko/${postId}`);
  }

  const query = search.trim().toLowerCase();
  const filteredPoints = (data?.heatmap_points ?? []).filter((point) => {
    const matchesDisaster = filter === "semua" || point.disaster_type.toLowerCase() === filter;
    const matchesSearch = !query || point.name.toLowerCase().includes(query);
    return matchesDisaster && matchesSearch;
  });

  return (
    <div className="flex h-full flex-col">
      <DonorMapToolbar search={search} onSearchChange={setSearch} filter={filter} onFilterChange={setFilter} />

      <div className="relative flex-1">
        <MapContainer center={INDONESIA_CENTER} zoom={5} scrollWheelZoom className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredPoints.map((point) => (
            <DonorMapMarker key={point.post_id} point={point} onSelect={goToDetail} />
          ))}
        </MapContainer>

        {data && <DonorMapLegend legend={data.legend} />}

        {error && (
          <div className="absolute top-4 left-4 z-1000 rounded-lg bg-error/90 px-3 py-2 text-xs text-white shadow">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
