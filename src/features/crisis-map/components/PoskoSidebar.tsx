import { memo, useMemo } from "react";
import type { PoskoSummaryItem } from "../types/crisisMap.types";
import { PoskoListItem } from "./PoskoListItem";

const URGENCY_ORDER = { critical: 0, medium: 1, low: 2, funded: 3 };

const PoskoSidebarComponent = ({
  posko,
  onSelect,
}: {
  posko: PoskoSummaryItem[];
  onSelect: (postId: string) => void;
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

  return (
    <aside
      aria-label="Daftar posko"
      className="hidden w-[min(24rem,36vw)] shrink-0 flex-col border-l border-[#103a32]/10 bg-[#fbfaf6] md:flex"
    >
      <div className="border-b border-[#103a32]/10 px-5 py-4">
        <p className="font-editorial text-2xl text-[#262626]">Posko</p>
        <div className="mt-1 flex items-center justify-between gap-2 text-xs text-[#526963]">
          <span>{posko.length + " lokasi ditampilkan"}</span>
          <span>Prioritas tertinggi dulu</span>
        </div>
      </div>

      <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        {sorted.map((p) => (
          <PoskoListItem key={p.post_id} posko={p} onSelect={onSelect} />
        ))}
        {sorted.length === 0 && (
          <p className="p-4 text-center text-sm text-[#526963]">Tidak ada lokasi yang cocok dengan filter ini.</p>
        )}
      </div>
    </aside>
  );
};

export const PoskoSidebar = memo(PoskoSidebarComponent);
