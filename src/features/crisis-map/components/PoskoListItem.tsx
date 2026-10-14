import { Check } from "lucide-react";
import Image from "next/image";
import { memo, useCallback } from "react";
import { formatRupiahCompact } from "@/shared/utils/formatCurrency";
import { URGENCY_LABEL } from "../constants/urgency";
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

function getProvince(address: string): string {
  const parts = address.split(",");
  return parts[parts.length - 1]?.trim() ?? address;
}

const PoskoListItemComponent = ({
  posko,
  onSelect,
}: {
  posko: PoskoSummaryItem;
  onSelect: (postId: string) => void;
}) => {
  const handleSelect = useCallback(() => onSelect(posko.post_id), [onSelect, posko.post_id]);
  const isFunded = posko.urgency_level === "funded";
  const textColor = URGENCY_TEXT[posko.urgency_level] ?? "text-warning";
  const barColor = URGENCY_BAR[posko.urgency_level] ?? "bg-warning";
  const urgencyLabel = URGENCY_LABEL[posko.urgency_level] ?? "Sedang";

  return (
    <div className="group mb-2 rounded-2xl border border-black/5 transition hover:border-main/30 hover:bg-secondary/20">
      <button
        type="button"
        onClick={handleSelect}
        className="flex w-full cursor-pointer gap-3 rounded-2xl p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
      >
        {posko.image_url && (
          <span className="relative h-[5.25rem] w-[5.25rem] shrink-0 self-start overflow-hidden rounded-xl bg-[#edf2e4]">
            <Image
              src={posko.image_url}
              alt={posko.image_alt ?? "Foto dokumentasi penanganan bencana"}
              fill
              sizes="84px"
              className="object-cover"
            />
          </span>
        )}

        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-2">
            <span className="text-sm font-semibold text-black">{posko.name}</span>
            {isFunded ? (
              <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-success">
                <Check size={13} /> 100%
              </span>
            ) : (
              <span className={`shrink-0 text-xs font-bold ${textColor}`}>{posko.funding_percentage}%</span>
            )}
          </span>

          <span className="mt-1 block text-xs text-black/50">
            {getProvince(posko.address)}
            {isFunded ? (
              " · pengadaan berjalan"
            ) : (
              <>
                {" "}
                · butuh <span className="font-semibold text-black">{formatRupiahCompact(posko.funding_target)}</span>
              </>
            )}
          </span>
          <span className={`mt-0.5 block text-[11px] font-medium ${textColor}`}>Urgensi: {urgencyLabel}</span>

          <span className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-black/5">
            <span
              className={`block h-full rounded-full ${barColor}`}
              style={{ width: `${Math.min(posko.funding_percentage, 100)}%` }}
            />
          </span>
        </span>
      </button>
      {posko.image_source_url && (
        <a
          href={posko.image_source_url}
          target="_blank"
          rel="noreferrer"
          className="mx-3 mb-3 flex items-center gap-1 text-[10px] leading-4 text-black/55 underline-offset-2 hover:text-main hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
        >
          Foto arsip: {posko.image_caption} · {posko.image_credit}
        </a>
      )}
    </div>
  );
};

export const PoskoListItem = memo(PoskoListItemComponent);
