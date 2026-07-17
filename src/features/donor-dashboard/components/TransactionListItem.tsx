import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { DonorTransaction } from "../types/donorTransaction.types";

const BADGE_STYLE: Record<string, string> = {
  info: "bg-main/10 text-main",
  warning: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
  error: "bg-error/10 text-error",
};

export function TransactionListItem({ tx }: { tx: DonorTransaction }) {
  return (
    <Link
      href={`/dashboard/donatur/transparansi/${tx.donation_id}`}
      className="flex items-start gap-2 rounded-2xl border border-black/5 bg-white p-4"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-black">{tx.post_name}</p>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
              BADGE_STYLE[tx.badge_variant] ?? "bg-black/5 text-black/50"
            }`}
          >
            {tx.status_label}
          </span>
        </div>
        <p className="mt-1 text-xs text-black/50">
          {tx.amount_text} · {tx.elapsed_text}
          {tx.transaction_code && ` · ${tx.transaction_code}`}
        </p>

        <p className="mt-1.5 text-xs text-black/50">{tx.progress_text}</p>

        {tx.short_latest_hash && (
          <p className="mt-1 font-mono text-[11px] text-main/70">hash {tx.short_latest_hash}</p>
        )}
      </div>

      <ChevronRight size={16} className="mt-0.5 shrink-0 text-black/30" />
    </Link>
  );
}
