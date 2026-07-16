import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { Marker, Popup } from "react-leaflet";
import type { Posko, UrgencyLevel } from "../types/crisisMap.types";

const URGENCY_COLOR_VAR: Record<UrgencyLevel, string> = {
  critical: "var(--color-error)",
  medium: "var(--color-warning)",
  low: "var(--color-caution)",
  funded: "var(--color-success)",
};

function buildIcon(posko: Posko) {
  const isFunded = posko.urgency_level === "funded";
  const color = URGENCY_COLOR_VAR[posko.urgency_level] ?? "var(--color-warning)";

  const html = renderToStaticMarkup(
    <div className="relative flex h-10 w-10 items-center justify-center">
      {!isFunded && (
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-40"
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
    iconSize: [40, 40],
    iconAnchor: [20, 20],
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
