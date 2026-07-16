"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { usePoskoList } from "../hooks/usePoskoList";
import { MapLegend } from "./MapLegend";
import { PoskoMarker } from "./PoskoMarker";

const INDONESIA_CENTER: [number, number] = [-2.5, 118];

export function CrisisMap() {
  const { posko, error } = usePoskoList();

  return (
    <div className="relative h-full w-full">
      <MapContainer center={INDONESIA_CENTER} zoom={5} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {posko.map((p) => (
          <PoskoMarker key={p.id} posko={p} />
        ))}
      </MapContainer>
      <MapLegend />
      {error && (
        <div className="absolute top-4 left-4 z-[1000] rounded-lg bg-error/90 px-3 py-2 text-xs text-white shadow">
          {error}
        </div>
      )}
    </div>
  );
}
