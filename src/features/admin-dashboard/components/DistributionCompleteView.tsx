"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import type { AdminOrderReceivingData, CompleteDistributionData } from "../types/adminDistribution.types";

export function DistributionCompleteView({
  result,
  order,
}: {
  result: CompleteDistributionData;
  order: AdminOrderReceivingData;
}) {
  const router = useRouter();
  const completedTime = new Date(result.completed_at).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const totalUnits = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex h-dvh flex-col bg-main">
      <div className="flex h-2/5 shrink-0 flex-col items-center justify-center px-6 text-center text-white">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-main">
            <Check size={26} />
          </span>
        </span>
        <h1 className="mt-5 text-xl font-bold">Bantuan Berhasil Dibagikan</h1>
        <p className="mt-2 max-w-xs text-sm leading-6 text-white/80">
          Transaksi {order.order_code} selesai. Ledger dikunci, bukti tercatat permanen di rantai kustodi.
        </p>
      </div>

      <div
        className="h-3/5 overflow-y-auto rounded-t-3xl bg-surface px-6 pt-6"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-black/50">Status ledger</span>
            <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success uppercase">
              {result.order_status}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-black/50">Bantuan tersalurkan</span>
            <span className="text-right font-semibold text-black">
              {totalUnits} unit · {order.request_title}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-black/50">Bukti foto</span>
            <span className="font-semibold text-black">
              {result.uploaded_photo_count}/{result.required_photo_count} item
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-black/50">Waktu selesai</span>
            <span className="font-semibold text-black">{completedTime}</span>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-secondary/50 px-4 py-3">
          <p className="text-xs text-black/50">Hash final ledger</p>
          <p className="mt-0.5 font-mono text-sm font-bold text-black">{result.short_final_hash}</p>
        </div>

        <PressButton variant="primary" className="mt-5 w-full" onClick={() => router.push("/dashboard/admin")}>
          Kembali ke Home
        </PressButton>
      </div>
    </div>
  );
}
