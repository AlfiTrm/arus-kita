import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { Marker, Popup } from "react-leaflet";
import { URGENCY_COLOR_VAR } from "../constants/urgency";
import type { Posko } from "../types/crisisMap.types";

function buildIcon(posko: Posko) {
  const isFunded = posko.urgency_level === "funded";
  const color = URGENCY_COLOR_VAR[posko.urgency_level] ?? "var(--color-warning)";

  const html = renderToStaticMarkup(
    <div
      role="img"
      aria-label={`${posko.name}: ${isFunded ? "terdanai penuh" : `${posko.funding_percentage}% terdanai`}`}
      className="relative flex h-11 w-11 items-center justify-center"
    >
      {!isFunded && (
        <span
          className="absolute inline-flex h-10 w-10 animate-ping rounded-full opacity-40"
          style={{ backgroundColor: color }}
        />
      )}
      <span
        className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white shadow"
        style={{ backgroundColor: color }}
      >
        {isFunded ? "✓" : `${posko.funding_percentage}%`}
      </span>
    </div>,
  );

  return L.divIcon({
    html,
    className: "",
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
}

export function PoskoMarker({ posko }: { posko: Posko }) {
  return (
    <Marker position={[posko.latitude, posko.longitude]} icon={buildIcon(posko)}>
      <Popup>
        <div className="text-sm">
          <p className="font-semibold">{posko.name}</p>
          <p className="text-xs text-black/60">{posko.address}</p>
          <p className="mt-1">{posko.funding_percentage}% terdanai</p>
        </div>
      </Popup>
    </Marker>
  );
}
