"use client";

import { cn } from "@/lib/utils";

export const DISTRIBUTION_FILTERS = ["semua", "banjir", "gempa", "longsor", "erupsi"] as const;
export type DistributionFilter = (typeof DISTRIBUTION_FILTERS)[number];
export type DistributionSort = "terbaru" | "nilai_terbesar";

const FILTER_LABELS: Record<DistributionFilter, string> = {
  semua: "Semua",
  banjir: "Banjir",
  gempa: "Gempa",
  longsor: "Longsor",
  erupsi: "Erupsi",
};

export function DistributionFilterBar({
  filter,
  onFilterChange,
  sort,
  onSortChange,
}: {
  filter: DistributionFilter;
  onFilterChange: (value: DistributionFilter) => void;
  sort: DistributionSort;
  onSortChange: (value: DistributionSort) => void;
}) {
  return (
    <div className="flex flex-col gap-3 border-y border-[#103a32]/12 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div
        className="scrollbar-hide flex min-w-0 items-center gap-2 overflow-x-auto"
        role="group"
        aria-label="Filter jenis bencana"
      >
        {DISTRIBUTION_FILTERS.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onFilterChange(value)}
            aria-pressed={filter === value}
            className={cn(
              "min-h-11 shrink-0 rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main motion-reduce:transition-none",
              filter === value
                ? "bg-main text-white"
                : "border border-[#103a32]/18 bg-white text-[#40534d] hover:border-main/40 hover:text-main",
            )}
          >
            {FILTER_LABELS[value]}
          </button>
        ))}
      </div>

      <label className="flex min-h-11 shrink-0 items-center gap-2 self-end text-sm text-[#40534d] sm:self-auto">
        <span>Urutkan</span>
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value as DistributionSort)}
          className="min-h-11 rounded-full border border-[#103a32]/18 bg-white px-4 text-sm font-medium text-[#103a32] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
        >
          <option value="terbaru">Paling baru</option>
          <option value="nilai_terbesar">Nilai terbesar</option>
        </select>
      </label>
    </div>
  );
}
