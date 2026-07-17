import { useEffect, useState } from "react";
import { shopService } from "../services/shopService";
import type { StoreOrderDetailData } from "../types/shop.types";

export function useStoreOrderDetail(orderId: string) {
  const [data, setData] = useState<StoreOrderDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await shopService.getOrderDetail(orderId);
        if (isMounted) setData(res.data);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : "Error fetching order detail");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [orderId]);

  return { data, isLoading, error };
}
