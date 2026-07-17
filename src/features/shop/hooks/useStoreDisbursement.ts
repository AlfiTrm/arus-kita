import { useEffect, useState } from "react";
import { shopService } from "../services/shopService";
import type { StoreDisbursementData } from "../types/shop.types";

export function useStoreDisbursement() {
  const [data, setData] = useState<StoreDisbursementData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await shopService.getDisbursementDashboard();
        if (isMounted) setData(res.data);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : "Error fetching disbursement dashboard");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
}
