"use client";

import { useState } from "react";
import {
  matchesTransactionFilter,
  TransactionFilterTabs,
  type TransactionFilter,
} from "@/features/donor-dashboard/components/TransactionFilterTabs";
import { TransactionListItem } from "@/features/donor-dashboard/components/TransactionListItem";
import { TransactionStatsCard } from "@/features/donor-dashboard/components/TransactionStatsCard";
import { useDonorProfile } from "@/features/donor-dashboard/hooks/useDonorProfile";
import { useDonorTransactions } from "@/features/donor-dashboard/hooks/useDonorTransactions";

export default function DonorTransparencyPage() {
  const { transactions, error, isLoading } = useDonorTransactions();
  const { profile } = useDonorProfile();
  const [filter, setFilter] = useState<TransactionFilter>("all");

  const filtered = transactions.filter((t) => matchesTransactionFilter(t, filter));

  return (
    <div className="pb-8">
      <div className="px-6 pt-6">
        <h1 className="text-xl font-bold text-black">Transparansi</h1>
        <p className="mt-0.5 text-xs text-black/50">Setiap rupiah tercatat di ledger — tidak bisa diubah</p>
      </div>

      <TransactionStatsCard transactions={transactions} profile={profile} />
      <TransactionFilterTabs filter={filter} onFilterChange={setFilter} />

      <div className="mt-4 flex flex-col gap-3 px-6">
        {isLoading && <p className="text-sm text-black/40">Memuat transaksi...</p>}
        {error && <p className="text-sm text-error">{error}</p>}
        {!isLoading && filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-black/10 px-4 py-6 text-center text-sm text-black/40">
            Belum ada transaksi di kategori ini.
          </p>
        )}
        {filtered.map((tx) => (
          <TransactionListItem key={tx.donation_id} tx={tx} />
        ))}
      </div>
    </div>
  );
}
