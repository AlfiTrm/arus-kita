"use client";

import { Search } from "lucide-react";
import { memo } from "react";

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
  item: { name: string; address: string; disaster_event: string; latest_report_title: string },
  filter: DisasterFilter,
  query: string,
): boolean {
  const matchesDisaster = filter === "semua" || item.disaster_event.toLowerCase() === filter;
  const matchesSearch =
    !query ||
    item.name.toLowerCase().includes(query) ||
    item.address.toLowerCase().includes(query) ||
    item.disaster_event.toLowerCase().includes(query) ||
    item.latest_report_title.toLowerCase().includes(query);
  return matchesDisaster && matchesSearch;
}

const MapToolbarComponent = ({
  search,
  onSearchChange,
  filter,
  onFilterChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  filter: DisasterFilter;
  onFilterChange: (value: DisasterFilter) => void;
}) => {
  return (
    <div className="shrink-0 border-b border-[#103a32]/10 bg-[#fbfaf6] px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-full border border-[#103a32]/18 bg-white px-4 focus-within:border-main focus-within:ring-2 focus-within:ring-main/15">
          <Search size={17} className="shrink-0 text-[#526963]" aria-hidden="true" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari wilayah, posko, atau kebutuhan"
            aria-label="Cari wilayah, posko, atau kebutuhan"
            className="min-w-0 flex-1 bg-transparent text-sm text-[#103a32] outline-none placeholder:text-[#526963]"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="min-h-11 rounded-full px-2 text-xs font-medium text-main hover:bg-[#eef4e7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
            >
              Hapus
            </button>
          )}
        </div>

        <div
          className="scrollbar-hide flex min-w-0 items-center gap-2 overflow-x-auto pb-0.5 lg:flex-none"
          role="group"
          aria-label="Filter jenis bencana"
        >
          {DISASTER_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => onFilterChange(f)}
              aria-pressed={f === filter}
              className={
                f === filter
                  ? "min-h-11 shrink-0 rounded-full bg-main px-4 text-xs font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
                  : "min-h-11 shrink-0 rounded-full border border-[#103a32]/18 bg-white px-4 text-xs font-medium text-[#40534d] hover:border-main/40 hover:text-main focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
              }
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const MapToolbar = memo(MapToolbarComponent);
