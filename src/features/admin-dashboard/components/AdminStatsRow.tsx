import { CheckCircle2, Trophy, Wallet } from "lucide-react";
import type { AdminProfile } from "../types/adminProfile.types";

export function AdminStatsRow({ profile }: { profile: AdminProfile }) {
  const stats = [
    { icon: Trophy, label: "Event dibuat", value: String(profile.event_count) },
    { icon: Wallet, label: "Dana dikelola", value: profile.managed_aid_amount_text },
    { icon: CheckCircle2, label: "Order terverifikasi", value: profile.verified_order_text },
  ];

  return (
    <div className="mx-6 mt-5 grid grid-cols-3 gap-2">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-black/5 bg-white px-3 py-3 text-center">
          <stat.icon size={16} className="mx-auto text-main" />
          <p className="mt-1.5 text-sm font-bold text-black">{stat.value}</p>
          <p className="text-[10px] text-black/40">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
