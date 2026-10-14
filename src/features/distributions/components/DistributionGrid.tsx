"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ScrollReveal } from "@/shared/components/ScrollReveal";
import { useDistributionList } from "../hooks/useDistributionList";
import { DistributionCard } from "./DistributionCard";
import { groupDistributionsByPost } from "../utils/groupDistributionsByPost";
import {
  DISTRIBUTION_FILTERS,
  DistributionFilterBar,
  type DistributionFilter,
  type DistributionSort,
} from "./DistributionFilterBar";
import { DistributionCtaCard } from "./DistributionCtaCard";

export function DistributionGrid() {
  const distributions = useDistributionList();
  const [filter, setFilter] = useState<DistributionFilter>(DISTRIBUTION_FILTERS[0]);
  const [sort, setSort] = useState<DistributionSort>("terbaru");
  const [search, setSearch] = useState("");

  const groups = useMemo(() => groupDistributionsByPost(distributions), [distributions]);

  const items = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("id-ID");
    return groups
      .filter((group) => filter === "semua" || group.disaster_event === filter)
      .filter(
        (group) =>
          !query ||
          group.post_name.toLocaleLowerCase("id-ID").includes(query) ||
          group.disaster_event.includes(query) ||
          group.records.some(
            (record) =>
              record.title.toLocaleLowerCase("id-ID").includes(query) ||
              record.item_summary.toLocaleLowerCase("id-ID").includes(query),
          ),
      )
      .sort((a, b) =>
        sort === "nilai_terbesar"
          ? b.total_amount - a.total_amount
          : new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime(),
      );
  }, [filter, groups, search, sort]);
  const recordCount = items.reduce((total, group) => total + group.records.length, 0);

  return (
    <div className="bg-[#fbfaf6]">
      <main className="container flex flex-col gap-7 py-10 sm:gap-9 sm:py-14">
        <ScrollReveal>
          <header className="flex flex-col gap-5">
            <div className="max-w-3xl">
              <h1 className="font-editorial text-4xl font-normal leading-[1.04] tracking-[-0.035em] text-[#262626] sm:text-5xl lg:text-6xl">
                Catatan penyaluran per posko.
              </h1>
              <p className="mt-4 max-w-[58ch] text-sm leading-6 text-[#40534d] sm:text-base sm:leading-7">
                Tiap posko merangkum nilai penyaluran, jumlah catatan, dan pembaruan terakhir.
              </p>
            </div>
          </header>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-col gap-4">
            <div className="flex min-h-12 items-center gap-3 rounded-full border border-[#103a32]/18 bg-white px-4 focus-within:border-main focus-within:ring-2 focus-within:ring-main/15">
              <Search size={18} className="shrink-0 text-[#526963]" aria-hidden="true" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari jenis bantuan, lokasi, atau kebutuhan"
                aria-label="Cari penyaluran"
                className="min-w-0 flex-1 bg-transparent text-sm text-[#103a32] outline-none placeholder:text-[#526963]"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="min-h-9 rounded-full px-3 text-xs font-medium text-main hover:bg-[#eef4e7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
                >
                  Hapus
                </button>
              )}
            </div>

            <DistributionFilterBar
              filter={filter}
              onFilterChange={setFilter}
              sort={sort}
              onSortChange={setSort}
            />
            <p className="text-sm text-[#526963]" aria-live="polite">
              {items.length} posko · {recordCount} catatan penyaluran
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          {items.length > 0 ? (
            <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((group) => (
                <DistributionCard key={group.post_id} group={group} />
              ))}
            </div>
          ) : (
            <div className="border-y border-[#103a32]/12 py-14 text-center">
              <p className="font-editorial text-3xl text-[#262626]">Catatan belum ditemukan.</p>
              <p className="mt-2 text-sm text-[#526963]">Coba kata pencarian atau filter yang lain.</p>
            </div>
          )}
        </ScrollReveal>

        <ScrollReveal>
          <DistributionCtaCard />
        </ScrollReveal>
      </main>
    </div>
  );
}
