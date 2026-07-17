import { useEffect, useState } from "react";
import { shopService } from "../services/shopService";
import type { StoreProfileData } from "../types/shop.types";

export function useStoreProfile() {
  const [data, setData] = useState<StoreProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    async function load() {
      try {
        const res = await shopService.getProfile(controller.signal);
        if (isMounted) setData(res.data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (isMounted) setError(err instanceof Error ? err.message : "Error fetching profile");
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
