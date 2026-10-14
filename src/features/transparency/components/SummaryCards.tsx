import { formatRupiahCompact } from "@/shared/utils/formatCurrency";
import type { TransparencySummary } from "../types/transparency.types";

export function SummaryCards({ summary }: { summary: TransparencySummary }) {
  const metrics = [
    { label: "Donasi terkumpul", value: summary.total_donation_collected },
    { label: "Sudah disalurkan", value: summary.total_disbursed },
    { label: "Sedang diproses", value: summary.total_in_process },
    { label: "Dikembalikan", value: summary.refund_automatic },
  ];

  return (
    <section
      aria-label="Ringkasan arus bantuan"
      className="grid grid-cols-2 divide-x divide-y divide-[#103a32]/12 border-y border-[#103a32]/12 sm:grid-cols-4 sm:divide-y-0"
    >
      {metrics.map((metric) => (
        <div key={metric.label} className="flex min-h-32 flex-col justify-center gap-2 px-4 py-5 sm:px-6">
          <p className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] leading-none tracking-[-0.035em] text-[#103a32]">
            {formatRupiahCompact(metric.value)}
          </p>
          <p className="text-sm leading-5 text-[#40534d]">{metric.label}</p>
        </div>
      ))}
    </section>
  );
}
