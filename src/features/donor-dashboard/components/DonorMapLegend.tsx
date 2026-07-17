import type { DonorMapLegendItem } from "../types/donorMap.types";

export function DonorMapLegend({ legend }: { legend: DonorMapLegendItem[] }) {
  return (
    <div className="absolute bottom-4 left-4 z-1000 rounded-lg bg-surface/95 p-3 text-xs shadow-lg backdrop-blur">
      <p className="mb-1.5 font-semibold text-black">Urgensi = % kebutuhan terdanai</p>
      <div className="flex flex-col gap-1">
        {legend.map((item) => (
          <div key={item.level} className="flex items-center gap-1.5 text-black/60">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
