"use client";

import { DonorAutonomousModeCard } from "@/features/donor-dashboard/components/DonorAutonomousModeCard";
import { DonorProfileHeaderCard } from "@/features/donor-dashboard/components/DonorProfileHeaderCard";
import { DonorProfileMenuList } from "@/features/donor-dashboard/components/DonorProfileMenuList";
import { DonorProfileSkeleton } from "@/features/donor-dashboard/components/DonorProfileSkeleton";
import { DonorStatsBar } from "@/features/donor-dashboard/components/DonorStatsBar";
import { useDonorProfile } from "@/features/donor-dashboard/hooks/useDonorProfile";

export default function DonorProfilePage() {
  const { profile, isLoading, error } = useDonorProfile();

  if (isLoading) {
    return <DonorProfileSkeleton />;
  }

  if (error || !profile) {
    return <p className="px-6 pt-6 text-sm text-error">{error ?? "Profil tidak ditemukan"}</p>;
  }

  return (
    <div className="pb-8">
      <DonorProfileHeaderCard profile={profile} />
      <DonorStatsBar profile={profile} />
      <DonorAutonomousModeCard />
      <DonorProfileMenuList />
    </div>
  );
}
