import { Check } from "lucide-react";
import { formatRupiahCompact } from "@/shared/utils/formatCurrency";
import type { PoskoSummaryItem, UrgencyLevel } from "../types/crisisMap.types";

const URGENCY_TEXT: Record<UrgencyLevel, string> = {
  critical: "text-error",
  medium: "text-warning",
  low: "text-caution",
  funded: "text-success",
};

const URGENCY_BAR: Record<UrgencyLevel, string> = {
  critical: "bg-error",
  medium: "bg-warning",
  low: "bg-caution",
  funded: "bg-success",
};

const URGENCY_LABEL: Record<UrgencyLevel, string> = {
  critical: "Kritis",
  medium: "Sedang",
  low: "Rendah",
  funded: "Terdanai",
};

function getProvince(address: string): string {
  const parts = address.split(",");
  return parts[parts.length - 1]?.trim() ?? address;
}

export function PoskoListItem({ posko, onSelect }: { posko: PoskoSummaryItem; onSelect: () => void }) {
  const isFunded = posko.urgency_level === "funded";
  const textColor = URGENCY_TEXT[posko.urgency_level] ?? "text-warning";
  const barColor = URGENCY_BAR[posko.urgency_level] ?? "bg-warning";
  const urgencyLabel = URGENCY_LABEL[posko.urgency_level] ?? "Sedang";

  return (
    <button
      type="button"
      onClick={onSelect}
      className="mb-2 w-full cursor-pointer rounded-2xl border border-black/5 p-4 text-left transition hover:border-main/30 hover:bg-secondary/20"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-black">{posko.name}</h3>
        {isFunded ? (
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-success">
            <Check size={13} /> 100%
          </span>
        ) : (
          <span className={`shrink-0 text-xs font-bold ${textColor}`}>{posko.funding_percentage}%</span>
        )}
      </div>

      <p className="mt-1 text-xs text-black/50">
        {getProvince(posko.address)}
        {isFunded ? (
          " · pengadaan berjalan"
        ) : (
          <>
            {" "}
            · butuh <span className="font-semibold text-black">{formatRupiahCompact(posko.funding_target)}</span>
          </>
        )}
      </p>
      <p className={`mt-0.5 text-[11px] font-medium ${textColor}`}>Urgensi: {urgencyLabel}</p>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${Math.min(posko.funding_percentage, 100)}%` }}
        />
      </div>
    </button>
  );
}
