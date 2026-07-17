import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { Marker, Popup } from "react-leaflet";
import type { DonorHeatmapPoint } from "../types/donorMap.types";

function buildIcon(point: DonorHeatmapPoint) {
  const isFunded = point.urgency_level === "funded";

  const html = renderToStaticMarkup(
    <div className="relative flex h-10 w-10 items-center justify-center">
      {!isFunded && (
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-40"
          style={{ backgroundColor: point.color }}
        />
      )}
      <span
        className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white shadow"
        style={{ backgroundColor: point.color }}
      >
        {isFunded ? "✓" : `${point.funding_percentage}%`}
      </span>
    </div>,
  );

  return L.divIcon({ html, className: "", iconSize: [40, 40], iconAnchor: [20, 20] });
}

export function DonorMapMarker({
  point,
  onSelect,
}: {
  point: DonorHeatmapPoint;
  onSelect: (postId: string) => void;
}) {
  return (
    <Marker
      position={[point.latitude, point.longitude]}
      icon={buildIcon(point)}
      eventHandlers={{ click: () => onSelect(point.post_id) }}
    >
      <Popup>
        <div className="text-sm">
          <p className="font-semibold">{point.name}</p>
          <p className="mt-1">{point.funding_percentage}% terdanai</p>
        </div>
      </Popup>
    </Marker>
  );
}
