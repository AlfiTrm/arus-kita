"use client";

import { Search } from "lucide-react";

export const DONOR_DISASTER_FILTERS = ["semua", "banjir", "gempa", "longsor", "erupsi"] as const;
export type DonorDisasterFilter = (typeof DONOR_DISASTER_FILTERS)[number];

const FILTER_LABELS: Record<DonorDisasterFilter, string> = {
  semua: "Semua",
  banjir: "Banjir",
  gempa: "Gempa",
  longsor: "Longsor",
  erupsi: "Erupsi",
};

export function DonorMapToolbar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  filter: DonorDisasterFilter;
  onFilterChange: (value: DonorDisasterFilter) => void;
}) {
  return (
    <div className="flex shrink-0 flex-col gap-2 border-b border-black/5 bg-surface px-4 py-3">
      <div className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-2">
        <Search size={15} className="shrink-0 text-black/40" aria-hidden="true" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari posko..."
          aria-label="Cari posko"
          className="w-full bg-transparent text-sm outline-none placeholder:text-black/40"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto" role="group" aria-label="Filter jenis bencana">
        {DONOR_DISASTER_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => onFilterChange(f)}
            aria-pressed={f === filter}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold ${
              f === filter ? "bg-main text-white" : "border border-black/10 text-black/60"
            }`}
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>
    </div>
  );
}
