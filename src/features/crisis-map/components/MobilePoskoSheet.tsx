"use client";

import { X } from "lucide-react";
import { memo, useCallback, useMemo } from "react";
import type { PoskoSummaryItem } from "../types/crisisMap.types";
import { PoskoListItem } from "./PoskoListItem";

const URGENCY_ORDER = { critical: 0, medium: 1, low: 2, funded: 3 };

const MobilePoskoSheetComponent = ({
  posko,
  onSelect,
  onClose,
}: {
  posko: PoskoSummaryItem[];
  onSelect: (postId: string) => void;
  onClose: () => void;
}) => {
  const sorted = useMemo(
    () =>
      [...posko].sort(
        (a, b) =>
          URGENCY_ORDER[a.urgency_level] - URGENCY_ORDER[b.urgency_level] ||
          a.funding_percentage - b.funding_percentage,
      ),
    [posko],
  );
  const handleSelect = useCallback((postId: string) => {
    onSelect(postId);
    onClose();
  }, [onClose, onSelect]);

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
        aria-label="Daftar posko"
        className="relative flex max-h-[min(76svh,42rem)] flex-col rounded-t-3xl bg-[#fbfaf6] pb-[env(safe-area-inset-bottom)] shadow-2xl"
      >
        <div className="flex min-h-16 items-center justify-between border-b border-[#103a32]/10 px-5 py-3">
          <p className="font-editorial text-2xl text-[#262626]">
            {posko.length + " posko"}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup daftar posko"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#103a32]/18 text-[#103a32] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
          >
            <X size={16} />
          </button>
        </div>

        <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
          {sorted.map((p) => (
            <PoskoListItem
              key={p.post_id}
              posko={p}
              onSelect={handleSelect}
            />
          ))}
          {sorted.length === 0 && (
            <p className="p-4 text-center text-sm text-[#526963]">Tidak ada lokasi yang cocok dengan filter ini.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const MobilePoskoSheet = memo(MobilePoskoSheetComponent);
