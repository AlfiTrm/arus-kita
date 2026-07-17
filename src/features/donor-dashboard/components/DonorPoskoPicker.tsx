"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DONOR_DISASTER_FILTERS, DonorMapToolbar, type DonorDisasterFilter } from "./DonorMapToolbar";
import { DonorPoskoListItem } from "./DonorPoskoListItem";
import { DonorPoskoListItemSkeleton } from "./DonorPoskoListItemSkeleton";
import { useDonorDashboardMap } from "../hooks/useDonorDashboardMap";

export function DonorPoskoPicker() {
  const router = useRouter();
  const { data, error, isLoading } = useDonorDashboardMap();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<DonorDisasterFilter>(DONOR_DISASTER_FILTERS[0]);

  const query = search.trim().toLowerCase();
  const points = (data?.heatmap_points ?? []).filter((point) => {
    const matchesDisaster = filter === "semua" || point.disaster_type.toLowerCase() === filter;
    const matchesSearch = !query || point.name.toLowerCase().includes(query);
    return matchesDisaster && matchesSearch;
  });

  function goToDonation(postId: string) {
    router.push(`/dashboard/donatur/donasi?postId=${postId}`);
  }

  return (
    <div>
      <p className="px-6 pt-2 pb-1 text-xs text-black/50">Pilih posko yang ingin Anda bantu</p>
      <DonorMapToolbar search={search} onSearchChange={setSearch} filter={filter} onFilterChange={setFilter} />
      <div className="px-4 pt-3">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <DonorPoskoListItemSkeleton key={i} />)
        ) : error ? (
          <p className="px-2 py-6 text-center text-sm text-error">{error}</p>
        ) : points.length === 0 ? (
          <p className="px-2 py-6 text-center text-sm text-black/40">Tidak ada posko yang cocok.</p>
        ) : (
          points.map((point) => (
            <DonorPoskoListItem key={point.post_id} point={point} onSelect={() => goToDonation(point.post_id)} />
          ))
        )}
      </div>
    </div>
  );
}
