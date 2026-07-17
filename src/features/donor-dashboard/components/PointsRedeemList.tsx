import { Heart, Smartphone, Ticket } from "lucide-react";
import type { PointReward } from "../types/points.types";

const REWARD_ICON: Record<string, typeof Heart> = {
  donation: Heart,
  pulsa: Smartphone,
  voucher: Ticket,
};

export function PointsRedeemList({ rewards }: { rewards: PointReward[] }) {
  return (
    <div className="px-6 py-4">
      <h2 className="text-sm font-bold text-black">Tukar poin</h2>

      <div className="mt-3 flex flex-col gap-2">
        {rewards.map((reward) => {
          const Icon = REWARD_ICON[reward.reward_type] ?? Ticket;
          return (
            <div
              key={reward.reward_id}
              className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-main">
                <Icon size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-black">{reward.name}</p>
                <p className="text-xs text-black/50">{reward.description}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold ${
                  reward.can_claim ? "bg-main text-white" : "bg-black/10 text-black/30"
                }`}
              >
                {reward.points_cost.toLocaleString("id-ID")} pts
              </span>
            </div>
          );
        })}

        {rewards.length === 0 && (
          <p className="rounded-2xl border border-dashed border-black/10 px-4 py-6 text-center text-sm text-black/40">
            Belum ada reward tersedia.
          </p>
        )}
      </div>
    </div>
  );
}
