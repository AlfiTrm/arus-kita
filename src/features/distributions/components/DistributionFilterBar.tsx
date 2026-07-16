"use client";

import { MapPin } from "lucide-react";

export const DISTRIBUTION_FILTERS = ["terbaru", "banjir", "gempa", "nilai_terbesar"] as const;
export type DistributionFilter = (typeof DISTRIBUTION_FILTERS)[number];

const FILTER_LABELS: Record<DistributionFilter, string> = {
  terbaru: "Terbaru",
  banjir: "Banjir",
  gempa: "Gempa",
  nilai_terbesar: "Nilai terbesar",
};

export function DistributionFilterBar({
  filter,
  onFilterChange,
}: {
  filter: DistributionFilter;
  onFilterChange: (value: DistributionFilter) => void;
}) {
  return (
    <div className="text-center">
      <h1 className="flex items-center justify-center gap-2 text-3xl font-bold text-black">
        Penyaluran <MapPin className="text-error" size={22} />
      </h1>
      <p className="mt-2 text-sm text-black/60">
        Setiap postingan dibuat otomatis dari foto verifikasi akhir — bukan unggahan manual.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {DISTRIBUTION_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => onFilterChange(f)}
            className={
              f === filter
                ? "rounded-full bg-main px-5 py-2 text-xs font-semibold text-white"
                : "rounded-full border border-black/10 px-5 py-2 text-xs font-medium text-black/60 hover:text-black"
            }
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>
    </div>
  );
}
