import { useEffect, useState } from "react";
import { shopService } from "../services/shopService";
import type { StoreGoodnessData } from "../types/shop.types";

export function useStoreGoodness() {
  const [data, setData] = useState<StoreGoodnessData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    async function load() {
      try {
        const res = await shopService.getGoodness(controller.signal);
        if (isMounted) setData(res.data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (isMounted) setError(err instanceof Error ? err.message : "Error fetching goodness");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    load();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { data, isLoading, error };
}
