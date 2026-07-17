import { BarChart3 } from "lucide-react";
import type { MonthlyDisbursement } from "../types/transparency.types";

export function MonthlyChart({ data }: { data: MonthlyDisbursement[] }) {
  const max = Math.max(...data.map((d) => d.total), 1);
  const rangeLabel = data.length > 0 ? `${data[0].month} — ${data[data.length - 1].month} 2026` : "";

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-black">Penyaluran per bulan (Rp juta)</h2>
        <span className="text-xs text-black/40">{rangeLabel}</span>
      </div>

      {data.length === 0 ? (
        <div className="mt-6 flex h-40 flex-col items-center justify-center gap-2 text-black/30">
          <BarChart3 size={28} />
          <p className="text-sm">Belum ada data penyaluran bulanan.</p>
        </div>
      ) : (
        <div className="mt-6 flex h-40 items-end gap-3">
          {data.map((item) => (
            <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-lg bg-main/30"
                style={{ height: `${Math.max((item.total / max) * 100, 4)}%` }}
                title={`Rp${(item.total / 1_000_000).toLocaleString("id-ID")} jt`}
              />
              <span className="text-xs text-black/50">{item.month}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
