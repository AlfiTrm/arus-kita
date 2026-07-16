import type { PoskoSummaryItem } from "../types/crisisMap.types";
import { PoskoListItem } from "./PoskoListItem";

export function PoskoSidebar({
  posko,
  onSelect,
}: {
  posko: PoskoSummaryItem[];
  onSelect: (postId: string) => void;
}) {
  const sorted = [...posko].sort((a, b) => a.funding_percentage - b.funding_percentage);

  return (
    <aside className="hidden w-[360px] shrink-0 flex-col border-l border-black/5 bg-surface md:flex">
      <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
        <p className="text-sm font-semibold text-black">{posko.length} posko aktif</p>
        <p className="text-xs text-black/40">urut: paling mendesak</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {sorted.map((p) => (
          <PoskoListItem key={p.post_id} posko={p} onSelect={() => onSelect(p.post_id)} />
        ))}
        {sorted.length === 0 && (
          <p className="p-4 text-center text-sm text-black/40">Gak ada posko yang cocok filter ini.</p>
        )}
      </div>
    </aside>
  );
}
