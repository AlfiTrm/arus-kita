import type { PointsDashboard } from "../types/points.types";

export function PoinBalanceCard({ points }: { points: PointsDashboard }) {
  const progress =
    points.next_level_points > 0 ? Math.min((points.active_points / points.next_level_points) * 100, 100) : 100;

  return (
    <div className="rounded-2xl bg-success/10 p-5">
      <p className="text-xs font-semibold text-success">Total poin aktif</p>
      <p className="mt-1 text-3xl font-bold text-black">
        {points.active_points.toLocaleString("id-ID")} <span className="text-lg font-semibold text-black/50">poin</span>
      </p>

      <p className="mt-3 text-xs font-medium text-black/60">
        Level: {points.level} · {points.points_to_next_level.toLocaleString("id-ID")} poin lagi → Lv. berikutnya
      </p>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/60">
        <div className="h-full rounded-full bg-success" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
