"use client";

import { PoinBalanceCard } from "@/features/donor-dashboard/components/PoinBalanceCard";
import { PointsHistoryList } from "@/features/donor-dashboard/components/PointsHistoryList";
import { PointsRedeemList } from "@/features/donor-dashboard/components/PointsRedeemList";
import { useDonorPoints } from "@/features/donor-dashboard/hooks/useDonorPoints";

export default function DonorPointsPage() {
  const { points, isLoading, error } = useDonorPoints();

  if (isLoading) {
    return <p className="px-6 pt-6 text-sm text-black/40">Memuat poin...</p>;
  }

  if (error || !points) {
    return <p className="px-6 pt-6 text-sm text-error">{error ?? "Data poin tidak ditemukan"}</p>;
  }

  return (
    <div className="pb-8">
      <div className="px-6 pt-6">
        <h1 className="text-xl font-bold text-black">Poin Kebaikan</h1>
        <p className="mt-0.5 text-xs text-black/50">Diberikan otomatis saat pesanan terverifikasi selesai</p>
      </div>

      <div className="px-6 pt-4">
        <PoinBalanceCard points={points} />
      </div>

      <PointsRedeemList rewards={points.rewards} />
      <PointsHistoryList history={points.history} />
    </div>
  );
}
