"use client";

import { useEffect, useState } from "react";
import { donorTransactionsService } from "../services/donorTransactionsService";
import type { DonorTransactionDetail } from "../types/donorTransaction.types";

export function useDonorTransactionDetail(donationId: string) {
  const [transaction, setTransaction] = useState<DonorTransactionDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchDetail() {
      setIsLoading(true);
      try {
        const data = await donorTransactionsService.get(donationId);
        if (!cancelled) {
          setTransaction(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Gagal memuat detail transaksi");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchDetail();

    return () => {
      cancelled = true;
    };
  }, [donationId]);

  return { transaction, error, isLoading };
}
