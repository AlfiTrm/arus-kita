"use client";

import { X } from "lucide-react";
import type { PoskoSummaryItem } from "../types/crisisMap.types";
import { PoskoListItem } from "./PoskoListItem";
import { PoskoListItemSkeleton } from "./PoskoListItemSkeleton";

export function MobilePoskoSheet({
  posko,
  onSelect,
  onClose,
  isLoading,
}: {
  posko: PoskoSummaryItem[];
  onSelect: (postId: string) => void;
  onClose: () => void;
  isLoading: boolean;
}) {
  const sorted = [...posko].sort((a, b) => a.funding_percentage - b.funding_percentage);

  return (
    <div className="fixed inset-0 z-1100 flex flex-col justify-end md:hidden">
      <button
        type="button"
        aria-label="Tutup daftar posko"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Daftar posko aktif"
        className="relative flex max-h-[70vh] flex-col rounded-t-3xl bg-surface"
      >
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
          <p className="text-sm font-semibold text-black">
            {isLoading ? "Memuat..." : `${posko.length} posko aktif`}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup daftar posko"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-black/60"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <PoskoListItemSkeleton key={i} />)
          ) : (
            <>
              {sorted.map((p) => (
                <PoskoListItem
                  key={p.post_id}
                  posko={p}
                  onSelect={() => {
                    onSelect(p.post_id);
                    onClose();
                  }}
                />
              ))}
              {sorted.length === 0 && (
                <p className="p-4 text-center text-sm text-black/40">Tidak ada posko yang cocok dengan filter ini.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
