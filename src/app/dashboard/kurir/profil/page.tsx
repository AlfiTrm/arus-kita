"use client";

import { CourierProfileSkeleton } from "@/features/courier-dashboard/components/CourierProfileSkeleton";
import { CourierProfileView } from "@/features/courier-dashboard/components/CourierProfileView";
import { useCourierProfile } from "@/features/courier-dashboard/hooks/useCourierProfile";

export default function CourierProfilPage() {
  const { profile, error, isLoading } = useCourierProfile();

  if (isLoading) {
    return <CourierProfileSkeleton />;
  }

  if (error || !profile) {
    return <p className="px-6 pt-6 text-sm text-error">{error ?? "Profil tidak ditemukan"}</p>;
  }

  return <CourierProfileView profile={profile} />;
}
