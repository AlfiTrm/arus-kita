"use client";

import { use } from "react";
import { DonorTransactionDetailView } from "@/features/donor-dashboard/components/DonorTransactionDetailView";
import { useDonorTransactionDetail } from "@/features/donor-dashboard/hooks/useDonorTransactionDetail";

export default function DonorTransactionDetailPage({ params }: { params: Promise<{ donationId: string }> }) {
  const { donationId } = use(params);
  const { transaction, isLoading, error } = useDonorTransactionDetail(donationId);

  if (isLoading) {
    return <p className="px-6 pt-6 text-sm text-black/40">Memuat detail transaksi...</p>;
  }

  if (error || !transaction) {
    return <p className="px-6 pt-6 text-sm text-error">{error ?? "Transaksi tidak ditemukan"}</p>;
  }

  return <DonorTransactionDetailView tx={transaction} />;
}
