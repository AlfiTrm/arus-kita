"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { DonorMapLegendItem } from "../types/donorMap.types";

export function DonorMapLegend({ legend }: { legend: DonorMapLegendItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-3 left-3 z-1000 flex flex-col-reverse items-start">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 rounded-full bg-surface/95 px-3 py-2 text-xs font-semibold text-black shadow-lg backdrop-blur"
      >
        Legenda
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>

      {isOpen && (
        <div className="animate-fade-in mb-2 max-w-52 rounded-lg bg-surface/95 p-3 text-xs shadow-lg backdrop-blur">
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
      )}
    </div>
  );
}
