"use client";

import { DonorCrisisMapLoader } from "@/features/donor-dashboard/components/DonorCrisisMapLoader";
import { DonorMapHeader } from "@/features/donor-dashboard/components/DonorMapHeader";
import { MostUrgentSection } from "@/features/donor-dashboard/components/MostUrgentSection";
import { MostUrgentSectionSkeleton } from "@/features/donor-dashboard/components/MostUrgentSectionSkeleton";
import { useDonorDashboardMap } from "@/features/donor-dashboard/hooks/useDonorDashboardMap";

export default function DonorMapPage() {
  const { data, error, isLoading } = useDonorDashboardMap();

  const activeCount = data?.heatmap_points.length ?? 0;
  const urgentCount = data?.urgent_posts.length ?? 0;

  return (
    <div className="flex flex-col">
      <DonorMapHeader activeCount={activeCount} urgentCount={urgentCount} isLoading={isLoading} />
      <div className="h-108 shrink-0">
        <DonorCrisisMapLoader data={data} error={error} />
      </div>
      {isLoading ? <MostUrgentSectionSkeleton /> : <MostUrgentSection posts={data?.urgent_posts ?? []} />}
    </div>
  );
}
