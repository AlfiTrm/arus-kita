import type { CourierGoodnessHistoryItem } from "../types/courierGoodness.types";

function formatDate(iso?: string): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

function HistoryItem({ item }: { item: CourierGoodnessHistoryItem }) {
  const title = item.event_name ?? item.post_name ?? "Antaran";
  const date = formatDate(item.delivered_at);

  const metaParts = [
    item.order_code,
    date,
    typeof item.distance_km === "number" ? `${item.distance_km.toFixed(1)} km` : null,
    typeof item.item_count === "number" ? `${item.item_count} item` : null,
  ].filter(Boolean);

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-black">{title}</p>
        <p className="mt-0.5 truncate text-[11px] text-black/50">
          {metaParts.join(" · ")}
          {typeof item.points === "number" && <span className="font-semibold text-main"> · +{item.points} poin</span>}
        </p>
      </div>
      {item.custody_hash && (
        <span className="shrink-0 font-mono text-[11px] text-main/70">
          {item.custody_hash.slice(0, 6)}…{item.custody_hash.slice(-4)}
        </span>
      )}
    </div>
  );
}

export function CourierHistoryList({ history }: { history: CourierGoodnessHistoryItem[] }) {
  return (
    <div>
      <h2 className="text-sm font-bold text-black">Riwayat antaran</h2>
      <div className="mt-3 flex flex-col gap-2">
        {history.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-black/10 px-4 py-6 text-center text-sm text-black/40">
            Belum ada riwayat antaran.
          </p>
        ) : (
          history.map((item, i) => <HistoryItem key={item.order_id ?? i} item={item} />)
        )}
      </div>
    </div>
  );
}
