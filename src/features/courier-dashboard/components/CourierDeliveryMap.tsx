"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToStaticMarkup } from "react-dom/server";
import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import type { CourierTaskDetail } from "../types/courierTask.types";

function buildIcon(color: string, label: string) {
  const html = renderToStaticMarkup(
    <div
      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow"
      style={{ backgroundColor: color }}
    >
      {label}
    </div>,
  );
  return L.divIcon({ html, className: "", iconSize: [32, 32], iconAnchor: [16, 16] });
}

function buildCourierIcon() {
  const html = renderToStaticMarkup(
    <div className="relative flex h-8 w-8 items-center justify-center">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-main opacity-40" />
      <span className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-main shadow" />
    </div>,
  );
  return L.divIcon({ html, className: "", iconSize: [32, 32], iconAnchor: [16, 16] });
}

const storeIcon = buildIcon("#028090", "T");
const postIcon = buildIcon("#dc2626", "P");
const courierIcon = buildCourierIcon();

export function CourierDeliveryMap({
  task,
  courierPosition,
  targetPosition,
}: {
  task: CourierTaskDetail;
  courierPosition: [number, number] | null;
  targetPosition: [number, number];
}) {
  const center = courierPosition ?? targetPosition;

  return (
    <MapContainer center={center} zoom={14} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[task.store_latitude, task.store_longitude]} icon={storeIcon} />
      <Marker position={[task.post_latitude, task.post_longitude]} icon={postIcon} />

      {courierPosition && (
        <>
          <Marker position={courierPosition} icon={courierIcon} />
          <Polyline positions={[courierPosition, targetPosition]} pathOptions={{ color: "#028090", weight: 3 }} />
        </>
      )}
    </MapContainer>
  );
}
