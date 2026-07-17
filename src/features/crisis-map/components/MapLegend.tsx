import { URGENCY_COLOR_VAR, URGENCY_LABEL } from "../constants/urgency";
import type { UrgencyLevel } from "../types/crisisMap.types";

const LEGEND_ORDER: UrgencyLevel[] = ["critical", "medium", "low", "funded"];

export function MapLegend() {
  return (
    <div className="absolute bottom-4 left-4 z-1000 rounded-lg bg-surface/95 p-3 text-xs shadow-lg backdrop-blur">
      <p className="mb-1.5 font-semibold text-black">Urgensi kebutuhan dana</p>
      <div className="flex flex-col gap-1">
        {LEGEND_ORDER.map((level) => (
          <div key={level} className="flex items-center gap-1.5 text-black/60">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: URGENCY_COLOR_VAR[level] }}
            />
            {URGENCY_LABEL[level]}
          </div>
        ))}
      </div>
    </div>
  );
}
