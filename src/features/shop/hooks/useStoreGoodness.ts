import { useEffect, useState } from "react";
import { shopService } from "../services/shopService";
import type { StoreGoodnessData } from "../types/shop.types";

export function useStoreGoodness() {
  const [data, setData] = useState<StoreGoodnessData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await shopService.getGoodness();
        if (isMounted) setData(res.data);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : "Error fetching goodness");
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
