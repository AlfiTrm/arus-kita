"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import type { CompleteDistributionData } from "../types/adminDistribution.types";

export function DistributionCompleteView({ result, orderCode }: { result: CompleteDistributionData; orderCode: string }) {
  const router = useRouter();
  const completedTime = new Date(result.completed_at).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-3 bg-surface px-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
        <Check size={30} />
      </span>
      <h1 className="text-lg font-bold text-black">Distribusi Selesai</h1>
      <p className="text-sm text-black/50">
        #{orderCode} · {result.uploaded_photo_count}/{result.required_photo_count} bukti tersimpan · {completedTime}
      </p>

      <div className="mt-2 w-full max-w-xs rounded-2xl border border-black/5 bg-white p-4 text-left">
        <p className="text-xs text-black/50">Ledger hash</p>
        <p className="mt-0.5 font-mono text-sm font-bold text-black">{result.short_final_hash}</p>
      </div>

      <PressButton variant="primary" className="mt-3 w-full max-w-xs" onClick={() => router.push("/dashboard/admin")}>
        Kembali ke Home
      </PressButton>
    </div>
  );
}
