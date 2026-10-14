import L from "leaflet";
import Image from "next/image";
import { renderToStaticMarkup } from "react-dom/server";
import { memo } from "react";
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
      <span
        className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white shadow-md ring-1 ring-[#103a32]/30"
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

export const PoskoMarker = memo(function PoskoMarker({ posko }: { posko: Posko }) {
  return (
    <Marker position={[posko.latitude, posko.longitude]} icon={buildIcon(posko)}>
      <Popup>
        <div className="w-[min(16rem,72vw)] text-sm">
          {posko.image_url && (
            <figure className="mb-3">
              <Image
                src={posko.image_url}
                alt={posko.image_alt ?? "Foto dokumentasi penanganan bencana"}
                width={960}
                height={640}
                sizes="256px"
                className="aspect-[3/2] w-full rounded-lg object-cover"
              />
              {(posko.image_caption || posko.image_source_url) && (
                <figcaption className="mt-1.5 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-[10px] leading-4 text-black/55">
                  <span>{posko.image_caption && `Dokumentasi: ${posko.image_caption}`}</span>
                  {posko.image_source_url && (
                    <a
                      href={posko.image_source_url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-main underline-offset-2 hover:underline"
                    >
                      Foto: {posko.image_credit ?? "sumber"}
                    </a>
                  )}
                </figcaption>
              )}
            </figure>
          )}
          <p className="font-semibold">{posko.name}</p>
          <p className="text-xs text-black/60">{posko.address}</p>
          <p className="mt-1">{posko.funding_percentage}% dari target dana</p>
          <p className="text-xs text-black/60">{posko.latest_report_title}</p>
        </div>
      </Popup>
    </Marker>
  );
});
