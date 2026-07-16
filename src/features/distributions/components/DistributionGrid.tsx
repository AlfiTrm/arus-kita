"use client";

import { useState } from "react";
import { useDistributionList } from "../hooks/useDistributionList";
import { DistributionCard } from "./DistributionCard";
import { DistributionCtaCard } from "./DistributionCtaCard";
import { DISTRIBUTION_FILTERS, DistributionFilterBar, type DistributionFilter } from "./DistributionFilterBar";

export function DistributionGrid() {
  const { distributions, error } = useDistributionList();
  const [filter, setFilter] = useState<DistributionFilter>(DISTRIBUTION_FILTERS[0]);

  let items = distributions;
  if (filter === "banjir" || filter === "gempa") {
    items = items.filter((d) => d.disaster_event.toLowerCase() === filter);
  }

  items = [...items].sort((a, b) =>
    filter === "nilai_terbesar"
      ? b.total_amount - a.total_amount
      : new Date(b.captured_at).getTime() - new Date(a.captured_at).getTime(),
  );

  return (
    <div className="container py-12">
      <DistributionFilterBar filter={filter} onFilterChange={setFilter} />

      {error && <p className="mt-8 text-center text-sm text-error">{error}</p>}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <DistributionCard key={item.verification_id} item={item} />
        ))}
        <DistributionCtaCard />
      </div>
    </div>
  );
}
