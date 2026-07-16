"use client";

import { AdminStatsRow } from "@/features/admin-dashboard/components/AdminStatsRow";
import { ProfileHeaderCard } from "@/features/admin-dashboard/components/ProfileHeaderCard";
import { ProfileMenuList } from "@/features/admin-dashboard/components/ProfileMenuList";
import { useAdminProfile } from "@/features/admin-dashboard/hooks/useAdminProfile";

export default function AdminProfilePage() {
  const { profile, isLoading, error } = useAdminProfile();

  if (isLoading) {
    return <p className="px-6 pt-6 text-sm text-black/40">Memuat profil...</p>;
  }

  if (error || !profile) {
    return <p className="px-6 pt-6 text-sm text-error">{error ?? "Profil tidak ditemukan"}</p>;
  }

  return (
    <div className="pb-8">
      <ProfileHeaderCard profile={profile} />
      <AdminStatsRow profile={profile} />
      <ProfileMenuList />
    </div>
  );
}
