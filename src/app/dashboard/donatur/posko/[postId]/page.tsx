"use client";

import { use } from "react";
import { DonorPostDetailSkeleton } from "@/features/donor-dashboard/components/DonorPostDetailSkeleton";
import { DonorPostDetailView } from "@/features/donor-dashboard/components/DonorPostDetailView";
import { useDonorPostDetail } from "@/features/donor-dashboard/hooks/useDonorPostDetail";

export default function DonorPostDetailPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = use(params);
  const { post, isLoading, error } = useDonorPostDetail(postId);

  if (isLoading) {
    return <DonorPostDetailSkeleton />;
  }

  if (error || !post) {
    return <p className="px-6 pt-6 text-sm text-error">{error ?? "Posko tidak ditemukan"}</p>;
  }

  return <DonorPostDetailView post={post} />;
}
