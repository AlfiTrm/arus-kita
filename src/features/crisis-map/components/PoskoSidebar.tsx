import type { PoskoSummaryItem } from "../types/crisisMap.types";
import { PoskoListItem } from "./PoskoListItem";
import { PoskoListItemSkeleton } from "./PoskoListItemSkeleton";

export function PoskoSidebar({
  posko,
  onSelect,
  isLoading,
}: {
  posko: PoskoSummaryItem[];
  onSelect: (postId: string) => void;
  isLoading: boolean;
}) {
  const sorted = [...posko].sort((a, b) => a.funding_percentage - b.funding_percentage);

  return (
    <aside
      aria-label="Daftar posko aktif"
      className="hidden w-90 shrink-0 flex-col border-l border-black/5 bg-surface md:flex"
    >
      <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
        <p className="text-sm font-semibold text-black">{isLoading ? "Memuat..." : `${posko.length} posko aktif`}</p>
        <p className="text-xs text-black/40">urut: paling mendesak</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <PoskoListItemSkeleton key={i} />)
        ) : (
          <>
            {sorted.map((p) => (
              <PoskoListItem key={p.post_id} posko={p} onSelect={() => onSelect(p.post_id)} />
            ))}
            {sorted.length === 0 && (
              <p className="p-4 text-center text-sm text-black/40">Tidak ada posko yang cocok dengan filter ini.</p>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
