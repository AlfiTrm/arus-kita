"use client";

import { useEffect, useState } from "react";
import { donorTransactionsService } from "../services/donorTransactionsService";
import type { DonorTransaction } from "../types/donorTransaction.types";

export function useDonorTransactions() {
  const [transactions, setTransactions] = useState<DonorTransaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchTransactions() {
      try {
        const data = await donorTransactionsService.list();
        if (!cancelled) {
          setTransactions(data.items);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Gagal memuat transaksi");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchTransactions();

    return () => {
      cancelled = true;
    };
  }, []);

  return { transactions, error, isLoading };
}
