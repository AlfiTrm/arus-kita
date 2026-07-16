"use client";

import { useState } from "react";
import { Minus, Plus, Search } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import { formatRupiah } from "@/shared/utils/formatCurrency";
import { EVENT_ITEM_CATALOG } from "../constants/eventItemCatalog";

export function EventNeedsStep({
  quantities,
  onQuantitiesChange,
  onSubmit,
  isSubmitting,
  submitError,
}: {
  quantities: Record<string, number>;
  onQuantitiesChange: (quantities: Record<string, number>) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError: string | null;
}) {
  const [search, setSearch] = useState("");

  const filtered = EVENT_ITEM_CATALOG.filter((item) => item.name.toLowerCase().includes(search.trim().toLowerCase()));
  const targetDana = EVENT_ITEM_CATALOG.reduce(
    (sum, item) => sum + item.pricePerUnit * (quantities[item.id] ?? 0),
    0,
  );
  const selectedCount = EVENT_ITEM_CATALOG.filter((item) => (quantities[item.id] ?? 0) > 0).length;

  function updateQuantity(id: string, delta: number) {
    const next = Math.max(0, (quantities[id] ?? 0) + delta);
    onQuantitiesChange({ ...quantities, [id]: next });
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-surface">
      <div className="flex-1 overflow-y-auto px-6 pb-40 pt-4">
        <div className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-2.5">
          <Search size={16} className="text-black/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari item katalog... (air, selimut, popok)"
            className="w-full bg-transparent text-sm outline-none placeholder:text-black/40"
          />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {filtered.map((item) => {
            const quantity = quantities[item.id] ?? 0;
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-lg">
                  {item.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-black">{item.name}</p>
                  <p className="text-xs text-black/50">
                    {formatRupiah(item.pricePerUnit)}/{item.unit} · katalog referensi
                  </p>
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

          {filtered.length === 0 && (
            <p className="rounded-2xl border border-dashed border-black/10 px-4 py-6 text-center text-sm text-black/40">
              Item tidak ditemukan di katalog.
            </p>
          )}
        </div>

        {submitError && <p className="mt-3 text-sm text-error">{submitError}</p>}
      </div>

      <div
        className="shrink-0 border-t border-black/5 bg-surface px-6 pt-4"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-black/50">Target dana otomatis</span>
          <span className="text-lg font-bold text-main">{formatRupiah(targetDana)}</span>
        </div>
        <PressButton
          variant="primary"
          className="mt-3 w-full"
          disabled={selectedCount === 0 || isSubmitting}
          onClick={onSubmit}
        >
          {isSubmitting ? "Menerbitkan..." : "Terbitkan Event ke Peta 🚀"}
        </PressButton>
      </div>
    </div>
  );
}
