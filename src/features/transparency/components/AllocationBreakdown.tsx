import { PieChart } from "lucide-react";
import type { DisasterAllocation } from "../types/transparency.types";

const DISASTER_LABELS: Record<string, string> = {
  gempa: "Gempa",
  banjir: "Banjir",
  longsor: "Longsor",
  erupsi: "Erupsi & lainnya",
};

export function AllocationBreakdown({ data }: { data: DisasterAllocation[] }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6">
      <h2 className="font-semibold text-black">Alokasi per jenis bencana</h2>

      {data.length === 0 ? (
        <div className="mt-6 flex h-40 flex-col items-center justify-center gap-2 text-black/30">
          <PieChart size={28} />
          <p className="text-sm">Belum ada data alokasi.</p>
        </div>
      ) : (
        <div className="mt-5 flex flex-col gap-4">
          {data.map((item) => (
            <div key={item.disaster_event}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-black/70">{DISASTER_LABELS[item.disaster_event] ?? item.disaster_event}</span>
                <span className="font-semibold text-main">{item.percentage}%</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
                <div className="h-full rounded-full bg-main" style={{ width: `${item.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-5 rounded-xl bg-secondary/50 px-3 py-2.5 text-xs text-black/60">
        Biaya operasional platform dibiayai terpisah — 0% dipotong dari donasi.
      </p>
    </div>
  );
}
