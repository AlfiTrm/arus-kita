import { RefreshCcw, ShieldCheck, TrendingUp, Wallet } from "lucide-react";
import { formatRupiahCompact } from "@/shared/utils/formatCurrency";
import type { TransparencySummary } from "../types/transparency.types";

export function SummaryCards({ summary }: { summary: TransparencySummary }) {
  const disbursedPercent =
    summary.total_donation_collected > 0
      ? ((summary.total_disbursed_verified / summary.total_donation_collected) * 100).toFixed(1)
      : "0";

  const cards = [
    {
      icon: Wallet,
      label: "Total donasi terkumpul",
      value: formatRupiahCompact(summary.total_donation_collected),
      caption: null,
    },
    {
      icon: TrendingUp,
      label: "Tersalurkan & terverifikasi",
      value: formatRupiahCompact(summary.total_disbursed_verified),
      caption: `${disbursedPercent}% dari terkumpul · sisanya terkunci di order aktif`,
    },
    {
      icon: RefreshCcw,
      label: "Refund otomatis",
      value: formatRupiahCompact(summary.refund_automatic),
      caption: "target tak tercapai 7 hari → kembali ke donatur",
    },
    {
      icon: ShieldCheck,
      label: "Verified fulfillment rate",
      value: `${summary.verified_fulfillment_rate}%`,
      caption: "foto + GPS valid · target ≥90%",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-2xl border border-black/5 bg-white p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-main/10 text-main">
            <card.icon size={18} />
          </span>
          <p className="mt-3 text-xs text-black/50">{card.label}</p>
          <p className="mt-1 text-2xl font-bold text-black">{card.value}</p>
          {card.caption && <p className="mt-1 text-xs leading-5 text-black/40">{card.caption}</p>}
        </div>
      ))}
    </div>
  );
}
