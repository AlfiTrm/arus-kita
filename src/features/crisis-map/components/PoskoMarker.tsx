import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { Marker, Popup } from "react-leaflet";
import type { Posko } from "../types/crisisMap.types";

function getUrgencyColor(percent: number): string {
  if (percent < 34) return "bg-error";
  if (percent < 70) return "bg-warning";
  return "bg-success";
}

function buildIcon(posko: Posko) {
  const isFunded = posko.status === "funded";
  const color = isFunded ? "bg-success" : getUrgencyColor(posko.fundedPercent);

  const html = renderToStaticMarkup(
    <div className="relative flex h-10 w-10 items-center justify-center">
      {!isFunded && (
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-40 ${color}`} />
      )}
      <span
        className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white shadow ${color}`}
      >
        {isFunded ? "✓" : `${posko.fundedPercent}%`}
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
    <Marker position={[posko.lat, posko.lng]} icon={buildIcon(posko)}>
      <Popup>
        <div className="text-sm">
          <p className="font-semibold">{posko.name}</p>
          <p>{posko.fundedPercent}% terdanai</p>
        </div>
      </Popup>
    </Marker>
  );
}
