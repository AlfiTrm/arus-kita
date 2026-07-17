"use client";

import type { DonorTransaction } from "../types/donorTransaction.types";

const FILTERS = [
  { id: "all", label: "Semua" },
  { id: "locked", label: "Terkunci" },
  { id: "completed", label: "Selesai" },
  { id: "refunded", label: "Refund" },
] as const;

export type TransactionFilter = (typeof FILTERS)[number]["id"];

export function matchesTransactionFilter(t: DonorTransaction, filter: TransactionFilter): boolean {
  if (filter === "all") return true;
  if (filter === "completed") return t.status === "completed";
  if (filter === "refunded") return t.status === "refunded";
  return !["pending", "completed", "refunded"].includes(t.status);
}

export function TransactionFilterTabs({
  filter,
  onFilterChange,
}: {
  filter: TransactionFilter;
  onFilterChange: (value: TransactionFilter) => void;
}) {
  return (
    <div className="mt-4 flex gap-2 overflow-x-auto px-6">
      {FILTERS.map((f) => (
        <button
          key={f.id}
          type="button"
          onClick={() => onFilterChange(f.id)}
          className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${
            filter === f.id ? "bg-main text-white" : "border border-black/10 text-black/60"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
