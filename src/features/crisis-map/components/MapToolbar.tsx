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
        <Search size={16} className="shrink-0 text-black/40" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari provinsi, kota, atau posko..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-black/40"
        />
      </div>

      <div className="flex items-center gap-2">
        {DISASTER_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => onFilterChange(f)}
            className={
              f === filter
                ? "rounded-full bg-main px-4 py-2 text-xs font-semibold text-white"
                : "rounded-full border border-black/10 px-4 py-2 text-xs font-medium text-black/60 hover:text-black"
            }
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      {showAlert && (
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-error/10 px-3 py-1.5 text-xs font-semibold text-error">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-error" />
          Siaga Nasional Aktif
        </span>
      )}
    </div>
  );
}
