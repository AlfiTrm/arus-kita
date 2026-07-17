"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, ChevronLeft, ChevronUp, Flag, MapPin, ShieldCheck } from "lucide-react";
import { formatRupiah } from "@/shared/utils/formatCurrency";
import type { DonorTransactionDetail } from "../types/donorTransaction.types";

function formatDateTime(iso: string): string {
  const date = new Date(iso);
  return `${date.toLocaleDateString("id-ID", { day: "2-digit", month: "short" })} ${date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB`;
}

export function DonorTransactionDetailView({ tx }: { tx: DonorTransactionDetail }) {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);
  const [showCustody, setShowCustody] = useState(true);

  const timeline = [
    { label: "Donasi dibuat", at: tx.donated_at },
    { label: "Pembayaran diterima", at: tx.paid_at },
    { label: "Barang diterima posko", at: tx.verified_at },
  ].filter((step): step is { label: string; at: string } => Boolean(step.at));

  return (
    <div className="pb-10">
      <div className="flex items-center gap-3 px-6 pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Kembali"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-black hover:bg-black/3"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold text-black">{tx.post_name}</h1>
          <p className="flex items-center gap-1 truncate text-xs text-black/40">
            <MapPin size={11} className="shrink-0" /> {tx.post_address}
          </p>
        </div>
      </div>

      {tx.verification_image_url && (
        <div className="relative mx-6 mt-4 aspect-video overflow-hidden rounded-2xl border border-black/5">
          {!imgError ? (
            // eslint-disable-next-line @next/next/no-img-element -- external donation proof photo, arbitrary domain
            <img
              src={tx.verification_image_url}
              alt="Bukti serah terima"
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-black/30">
              [ foto bukti serah terima ]
            </div>
          )}
          {tx.status === "completed" && (
            <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-success px-2.5 py-1 text-[11px] font-bold text-white">
              <ShieldCheck size={12} /> TERVERIFIKASI
            </span>
          )}
        </div>
      )}

      <div className="mx-6 mt-4 rounded-2xl border border-black/5 bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-black/50">Donasi saya</p>
          <span className="text-xs font-bold text-main">{tx.status_label}</span>
        </div>
        <p className="mt-0.5 text-2xl font-bold text-black">{tx.amount_text}</p>
        <p className="mt-1 text-xs text-black/40">
          {tx.transaction_code || tx.payment_order_id}
        </p>

        {timeline.length > 0 && (
          <div className="mt-3 flex flex-col gap-2 border-t border-black/5 pt-3">
            {timeline.map((step) => (
              <div key={step.label} className="flex items-center gap-2 text-xs">
                <Check size={13} className="shrink-0 text-success" />
                <span className="text-black/60">{step.label}</span>
                <span className="ml-auto text-black/40">{formatDateTime(step.at)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mx-6 mt-4 rounded-2xl border border-black/5 bg-white p-4">
        <p className="text-xs text-black/50">Progres pendanaan posko</p>
        <p className="mt-0.5 text-lg font-bold text-main">{tx.funding_text}</p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
          <div
            className="h-full rounded-full bg-main"
            style={{ width: `${Math.min(tx.funding_percentage, 100)}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-black/50">
          {tx.donor_count} donatur · {tx.total_item_count} jenis barang dibutuhkan
        </p>
      </div>

      <div className="mx-6 mt-4">
        <h2 className="text-sm font-bold text-black">Rincian barang donasi saya</h2>
        <div className="mt-2 rounded-2xl border border-black/5 bg-white">
          {tx.items.map((item, i) => (
            <div
              key={item.item_id}
              className={`flex items-center justify-between p-3 ${i > 0 ? "border-t border-black/5" : ""}`}
            >
              <div>
                <p className="text-sm font-semibold text-black">{item.name}</p>
                <p className="text-xs text-black/50">
                  {item.quantity} × {formatRupiah(item.unit_price)}
                </p>
              </div>
              <p className="text-sm font-bold text-black">{item.amount_text}</p>
            </div>
          ))}
        </div>
      </div>

      {tx.custody_logs.length > 0 && (
        <div className="mx-6 mt-4">
          <button
            type="button"
            onClick={() => setShowCustody((v) => !v)}
            className="flex w-full items-center justify-between text-sm font-bold text-main"
          >
            Rantai Kustodi ({tx.custody_step_count} langkah)
            {showCustody ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showCustody && (
            <div className="mt-2 flex flex-col gap-3 rounded-2xl border border-black/5 bg-white p-4">
              {tx.custody_logs.map((log) => (
                <div key={log.logs_id} className="flex items-start gap-2 text-xs">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                    <ShieldCheck size={12} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-black">Langkah {log.sequence}</p>
                    <p className="truncate font-mono text-main/70">{log.short_current_hash}</p>
                  </div>
                  <span className="shrink-0 text-black/40">{log.elapsed_text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mx-6 mt-6">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-black/10 py-3 text-sm font-semibold text-black/50"
        >
          <Flag size={16} /> Laporkan
        </button>
      </div>
    </div>
  );
}
