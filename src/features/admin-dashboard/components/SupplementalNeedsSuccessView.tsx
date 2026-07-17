"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import { formatRupiah } from "@/shared/utils/formatCurrency";
import type { SupplementalNeedData } from "../types/adminSupplementalNeeds.types";

export function SupplementalNeedsSuccessView({ result }: { result: SupplementalNeedData }) {
  const router = useRouter();

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-3 bg-surface px-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
        <Check size={30} />
      </span>
      <h1 className="text-lg font-bold text-black">Kebutuhan Susulan Tayang</h1>
      <p className="text-sm text-black/50">Donatur sekarang bisa membantu kebutuhan tambahan ini.</p>

      <div className="mt-2 w-full max-w-xs rounded-2xl border border-black/5 bg-white p-4 text-left text-sm">
        <div className="flex items-center justify-between">
          <span className="text-black/50">Kebutuhan tambahan</span>
          <span className="font-semibold text-black">{formatRupiah(result.additional_target)}</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-black/50">Target dana posko baru</span>
          <span className="font-semibold text-main">{formatRupiah(result.new_funding_target)}</span>
        </div>
      </div>

      <PressButton variant="primary" className="mt-3 w-full max-w-xs" onClick={() => router.push("/dashboard/admin")}>
        Kembali ke Home
      </PressButton>
    </div>
  );
}
