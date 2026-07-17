"use client";

import { Camera, Check, ChevronLeft, ShieldCheck, Zap } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import type { AdminOrderReceivingData } from "../types/adminDistribution.types";

function formatTime(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

export function PembagianChecklistView({
  data,
  onBack,
  onPhotoItem,
  onComplete,
  isCompleting,
  completeError,
}: {
  data: AdminOrderReceivingData;
  onBack: () => void;
  onPhotoItem: (itemId: string) => void;
  onComplete: () => void;
  isCompleting: boolean;
  completeError: string | null;
}) {
  const deliveredTime = formatTime(data.delivered_at);
  const isReady = data.uploaded_photo_count >= data.required_photo_count;
  const remaining = data.required_photo_count - data.uploaded_photo_count;

  return (
    <div className="min-h-dvh bg-surface pb-32">
      <div className="flex items-center gap-3 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-base font-bold text-black">Pembagian Bantuan</h1>
          <p className="truncate text-xs text-black/50">
            #{data.order_code}
            {deliveredTime ? ` · barang diterima ${deliveredTime}` : ` · ${data.post_name}`} · langkah terakhir
          </p>
        </div>
      </div>

      <div className="mt-2 px-6">
        <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between pb-3">
            <h2 className="text-sm font-bold text-black">Checklist pembagian</h2>
            <span className="text-xs font-medium text-black/50">
              {data.uploaded_photo_count}/{data.required_photo_count} item dibagikan
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {data.items.map((item) => {
              const proof = data.proofs.find((p) => p.item_id === item.item_id);
              return (
                <div key={item.item_id} className="flex items-center gap-3">
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors ${
                      item.has_proof ? "border-main bg-main text-white" : "border-black/20"
                    }`}
                  >
                    {item.has_proof && <Check size={14} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-black">
                      {item.name} — {item.quantity} unit
                    </p>
                    <p className={`mt-0.5 text-xs ${item.has_proof ? "text-success" : "text-black/40"}`}>
                      {item.has_proof
                        ? `Dibagikan${proof?.recipient_note ? ` ke ${proof.recipient_note}` : ""} · foto ✓`
                        : "Belum difoto"}
                    </p>
                  </div>
                  {!item.has_proof && (
                    <button
                      type="button"
                      onClick={() => onPhotoItem(item.item_id)}
                      className="flex shrink-0 items-center gap-1.5 rounded-full bg-main px-3.5 py-2 text-xs font-bold text-white"
                    >
                      <Camera size={13} /> Foto
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 px-6">
        <div className="flex items-start gap-2 rounded-xl bg-secondary/50 px-4 py-3 text-xs leading-5 text-black/70">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-main" />
          Wajah penerima diburamkan otomatis pada setiap foto bukti.
        </div>
      </div>

      <div className="mt-3 px-6">
        <div className="flex items-start gap-2 rounded-xl bg-warning/10 px-4 py-3 text-xs leading-5 text-black/70">
          <Zap size={16} className="mt-0.5 shrink-0 text-warning" />
          Menyelesaikan transaksi mengunci ledger — tidak bisa diubah setelahnya.
        </div>
      </div>

      {completeError && <p className="mt-3 px-6 text-center text-xs text-error">{completeError}</p>}

      <div
        className="fixed inset-x-0 bottom-0 bg-surface px-6 pt-4"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <PressButton variant="primary" className="w-full" disabled={!isReady || isCompleting} onClick={onComplete}>
          {isCompleting ? "Menyelesaikan..." : isReady ? "Selesaikan Transaksi" : `Selesaikan Transaksi (${remaining} foto lagi)`}
        </PressButton>
        {!isReady && <p className="mt-2 text-center text-xs text-black/40">Tombol aktif setelah semua item difoto</p>}
      </div>
    </div>
  );
}
