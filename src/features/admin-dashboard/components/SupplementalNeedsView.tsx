"use client";

import { useState } from "react";
import { ChevronLeft, Minus, Plus, Search } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import { EVENT_ITEM_CATALOG } from "@/features/create-event/constants/eventItemCatalog";
import { formatRupiah } from "@/shared/utils/formatCurrency";
import { adminSupplementalNeedsService } from "../services/adminSupplementalNeedsService";
import type { SupplementalNeedData } from "../types/adminSupplementalNeeds.types";

export function SupplementalNeedsView({
  orderId,
  requestTitle,
  orderCode,
  onBack,
  onSubmitted,
}: {
  orderId: string;
  requestTitle: string;
  orderCode: string;
  onBack: () => void;
  onSubmitted: (result: SupplementalNeedData) => void;
}) {
  const [reason, setReason] = useState("");
  const [reservedAmountApplied, setReservedAmountApplied] = useState(0);
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const filtered = EVENT_ITEM_CATALOG.filter((item) => item.name.toLowerCase().includes(search.trim().toLowerCase()));
  const totalKebutuhan = EVENT_ITEM_CATALOG.reduce(
    (sum, item) => sum + item.pricePerUnit * (quantities[item.id] ?? 0),
    0,
  );
  const targetPenggalangan = Math.max(0, totalKebutuhan - reservedAmountApplied);
  const selectedCount = EVENT_ITEM_CATALOG.filter((item) => (quantities[item.id] ?? 0) > 0).length;
  const canSubmit = reason.trim().length > 0 && selectedCount > 0 && !isSubmitting;

  function updateQuantity(id: string, delta: number) {
    const next = Math.max(0, (quantities[id] ?? 0) + delta);
    setQuantities((prev) => ({ ...prev, [id]: next }));
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await adminSupplementalNeedsService.create(orderId, {
        reason,
        reservedAmountApplied,
        items: EVENT_ITEM_CATALOG.filter((item) => (quantities[item.id] ?? 0) > 0).map((item) => ({
          name: item.name,
          description: item.unit,
          price: item.pricePerUnit,
          quantity_needed: quantities[item.id],
        })),
      });
      onSubmitted(result);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Gagal menerbitkan kebutuhan susulan");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-surface">
      <div className="flex shrink-0 items-center gap-3 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-base font-bold text-black">Kebutuhan Susulan</h1>
          <p className="truncate text-xs text-black/50">
            {requestTitle} · {orderCode}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-40">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-black">
          Alasan kebutuhan susulan
          <span className="text-xs font-normal text-black/40">Tampil ke donatur agar konteks jelas</span>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="mis. Banjir susulan semalam — 40 KK tambahan mengungsi, stok air & selimut habis lebih cepat dari perkiraan."
            rows={3}
            required
            className="mt-1 w-full resize-none rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-main focus:ring-2 focus:ring-main/20"
          />
        </label>

        <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium text-black">
          Dana cadangan dipakai
          <span className="text-xs font-normal text-black/40">Dipakai lebih dulu — sisa kebutuhan masuk penggalangan baru</span>
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-black/10 px-4 py-3">
            <span className="text-sm text-black/40">Rp</span>
            <input
              type="number"
              min={0}
              value={reservedAmountApplied}
              onChange={(e) => setReservedAmountApplied(Math.max(0, Number(e.target.value)))}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </label>

        <div className="mt-5 flex items-center gap-2 rounded-full border border-black/10 px-4 py-2.5">
          <Search size={16} className="text-black/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari item katalog..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-black/40"
          />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {filtered.map((item) => {
            const quantity = quantities[item.id] ?? 0;
            return (
              <div key={item.id} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-lg">
                  {item.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-black">{item.name}</p>
                  <p className="text-xs text-black/50">{formatRupiah(item.pricePerUnit)}/{item.unit}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={quantity === 0}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-black/15 text-black/50 disabled:opacity-30"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-black">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-main text-white"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {submitError && <p className="mt-3 text-sm text-error">{submitError}</p>}
      </div>

      <div
        className="shrink-0 border-t border-black/5 bg-surface px-6 pt-4"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-black/50">Total kebutuhan susulan</span>
            <span className="font-semibold text-black">{formatRupiah(totalKebutuhan)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-black/50">Dipenuhi dana cadangan</span>
            <span className="font-semibold text-success">−{formatRupiah(reservedAmountApplied)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-black">Target penggalangan baru</span>
            <span className="text-lg font-bold text-main">{formatRupiah(targetPenggalangan)}</span>
          </div>
        </div>
        <PressButton variant="primary" className="mt-3 w-full" disabled={!canSubmit} onClick={handleSubmit}>
          {isSubmitting ? "Menerbitkan..." : "Tayangkan Kebutuhan Susulan"}
        </PressButton>
      </div>
    </div>
  );
}
