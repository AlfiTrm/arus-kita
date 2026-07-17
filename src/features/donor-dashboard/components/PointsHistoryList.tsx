import type { PointHistoryEntry } from "../types/points.types";

function formatHistoryDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

export function PointsHistoryList({ history }: { history: PointHistoryEntry[] }) {
  return (
    <div className="px-6 py-4">
      <h2 className="text-sm font-bold text-black">Riwayat poin</h2>

      <div className="mt-3 flex flex-col gap-2">
        {history.map((entry) => (
          <div
            key={entry.point_transaction_id}
            className="flex items-center justify-between rounded-2xl border border-black/5 bg-white p-3"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-black">{entry.description}</p>
              <p className="text-xs text-black/50">{formatHistoryDate(entry.created_at)}</p>
            </div>
            <span className={`shrink-0 text-sm font-bold ${entry.points >= 0 ? "text-success" : "text-error"}`}>
              {entry.points_text}
            </span>
          </div>
        ))}

        {history.length === 0 && (
          <p className="rounded-2xl border border-dashed border-black/10 px-4 py-6 text-center text-sm text-black/40">
            Belum ada riwayat transaksi poin.
          </p>
        )}
      </div>
    </div>
  );
}
