"use client";

import { useEffect, useState } from "react";
import { donorPostDetailService } from "../services/donorPostDetailService";
import type { DonorPostDetail } from "../types/donorPostDetail.types";

export function useDonorPostDetail(postId: string) {
  const [post, setPost] = useState<DonorPostDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(postId));

  useEffect(() => {
    if (!postId) {
      return;
    }

    let cancelled = false;

    async function fetchPost() {
      setIsLoading(true);
      try {
        const data = await donorPostDetailService.get(postId);
        if (!cancelled) {
          setPost(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Gagal memuat detail posko");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchPost();

    return () => {
      cancelled = true;
    };
  }, [postId]);

  return { post, error, isLoading };
}
