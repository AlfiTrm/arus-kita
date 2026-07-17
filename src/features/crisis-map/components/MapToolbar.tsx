"use client";

import { Search } from "lucide-react";

export const DISASTER_FILTERS = ["semua", "banjir", "gempa", "longsor", "erupsi"] as const;
export type DisasterFilter = (typeof DISASTER_FILTERS)[number];

const FILTER_LABELS: Record<DisasterFilter, string> = {
  semua: "Semua",
  banjir: "Banjir",
  gempa: "Gempa",
  longsor: "Longsor",
  erupsi: "Erupsi",
};

export function matchesPoskoFilter(
  item: { name: string; address: string; disaster_event: string },
  filter: DisasterFilter,
  query: string,
): boolean {
  const matchesDisaster = filter === "semua" || item.disaster_event.toLowerCase() === filter;
  const matchesSearch =
    !query || item.name.toLowerCase().includes(query) || item.address.toLowerCase().includes(query);
  return matchesDisaster && matchesSearch;
}

export function MapToolbar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  showAlert,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  filter: DisasterFilter;
  onFilterChange: (value: DisasterFilter) => void;
  showAlert: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-black/5 bg-surface px-4 py-3">
      <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-full border border-black/10 px-4 py-2">
        <Search size={16} className="shrink-0 text-black/40" aria-hidden="true" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari provinsi, kota, atau posko..."
          aria-label="Cari wilayah atau posko"
          className="w-full bg-transparent text-sm outline-none placeholder:text-black/40"
        />
      </div>

      <div className="flex items-center gap-2" role="group" aria-label="Filter jenis bencana">
        {DISASTER_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => onFilterChange(f)}
            aria-pressed={f === filter}
            className={
              f === filter
                ? "rounded-full bg-main px-4 py-2 text-xs font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
                : "rounded-full border border-black/10 px-4 py-2 text-xs font-medium text-black/60 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
            }
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      {showAlert && (
        <span
          role="status"
          aria-live="polite"
          className="ml-auto flex items-center gap-1.5 rounded-full bg-error/10 px-3 py-1.5 text-xs font-semibold text-error"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-error" aria-hidden="true" />
          Siaga Nasional Aktif
        </span>
      )}
    </div>
  );
}
