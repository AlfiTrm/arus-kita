"use client";

import { useRouter } from "next/navigation";
import { Check, Lock, Sparkles } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import type { DonorPostItem } from "@/features/donor-dashboard/types/donorPostDetail.types";

function truncateId(id: string): string {
  return id.length > 20 ? `${id.slice(0, 8)}...${id.slice(-6)}` : id;
}

function summarizeAllocation(items: DonorPostItem[]): string {
  if (items.length === 0) return "-";
  return items
    .slice(0, 2)
    .map((item) => item.name)
    .join(" · ");
}

export function DonationSuccessView({
  amount,
  postName,
  orderId,
  paymentTransactionId,
  postItems,
}: {
  amount: number;
  postName: string;
  orderId: string;
  paymentTransactionId: string;
  postItems: DonorPostItem[];
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col bg-main">
      <div className="flex min-h-[60dvh] flex-col items-center justify-center px-6 text-center text-white">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-main">
            <Check size={22} strokeWidth={3} />
          </span>
        </span>

        <h1 className="mt-4 text-xl font-bold">Donasi Terkunci!</h1>
        <p className="mt-2 max-w-xs text-sm leading-6 text-white/80">
          Rp{amount.toLocaleString("id-ID")} telah dikunci ke pesanan barang{" "}
          <span className="font-semibold">{postName}</span>. Tidak ada dana menggantung.
        </p>
      </div>

      <div className="min-h-[40dvh] rounded-t-3xl bg-surface px-6 pb-8 pt-6">
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-black/50">ID transaksi</span>
            <span className="font-mono text-xs font-semibold text-black">{truncateId(orderId)}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="shrink-0 text-black/50">Alokasi</span>
            <span className="truncate text-right text-sm font-semibold text-black">
              {summarizeAllocation(postItems)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-black/50">Status dana</span>
            <span className="flex items-center gap-1 text-xs font-bold text-success">
              <Lock size={12} /> LOCKED
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-black/50">Hash ledger</span>
            <span className="font-mono text-xs font-semibold text-main">{truncateId(paymentTransactionId)}</span>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-xl bg-secondary/50 px-4 py-3 text-xs leading-5 text-black/70">
          <Sparkles size={16} className="mt-0.5 shrink-0 text-main" />
          Anda akan menerima foto bukti barang diterima penyintas + poin kebaikan saat pesanan selesai.
        </div>

        <PressButton
          variant="primary"
          className="mt-5 w-full py-4 text-base"
          onClick={() => router.push("/dashboard/donatur/transparansi")}
        >
          Lacak di Log Transaksi
        </PressButton>

        <button
          type="button"
          onClick={() => router.push("/dashboard/donatur")}
          className="mt-3 w-full text-sm font-semibold text-main"
        >
          Kembali ke Peta
        </button>
      </div>
    </div>
  );
}
