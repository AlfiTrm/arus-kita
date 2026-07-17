import { Check } from "lucide-react";
import type { DonorHeatmapPoint } from "../types/donorMap.types";

const DISASTER_LABEL: Record<string, string> = {
  banjir: "Banjir",
  gempa: "Gempa",
  longsor: "Longsor",
  erupsi: "Erupsi",
};

export function DonorPoskoListItem({ point, onSelect }: { point: DonorHeatmapPoint; onSelect: () => void }) {
  const isFunded = point.urgency_level === "funded";
  const disasterLabel = DISASTER_LABEL[point.disaster_type.toLowerCase()] ?? point.disaster_type;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="mb-2 w-full cursor-pointer rounded-2xl border border-black/5 p-4 text-left transition hover:border-main/30 hover:bg-secondary/20"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-black">{point.name}</h3>
        {isFunded ? (
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-success">
            <Check size={13} /> 100%
          </span>
        ) : (
          <span className="shrink-0 text-xs font-bold" style={{ color: point.color }}>
            {point.funding_percentage}%
          </span>
        )}
      </div>

      <p className="mt-1 text-xs text-black/50">{disasterLabel}</p>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
        <div
          className="h-full rounded-full"
          style={{ width: `${Math.min(point.funding_percentage, 100)}%`, backgroundColor: point.color }}
        />
      </div>
    </button>
  );
}
