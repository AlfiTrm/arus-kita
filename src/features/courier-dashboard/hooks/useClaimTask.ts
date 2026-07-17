"use client";

import { useState } from "react";
import { courierTaskService } from "../services/courierTaskService";

export function useClaimTask() {
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimError, setClaimError] = useState<string | null>(null);

  async function claim(orderId: string): Promise<boolean> {
    setIsClaiming(true);
    setClaimError(null);
    try {
      await courierTaskService.claim(orderId);
      return true;
    } catch (err) {
      setClaimError(err instanceof Error ? err.message : "Gagal mengambil tugas");
      return false;
    } finally {
      setIsClaiming(false);
    }
  }

  return { claim, isClaiming, claimError };
}
