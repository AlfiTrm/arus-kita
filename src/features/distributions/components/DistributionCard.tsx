import {
  Baby,
  BedDouble,
  Boxes,
  ChevronDown,
  CookingPot,
  Droplets,
  HeartPulse,
  House,
  SprayCan,
  type LucideIcon,
} from "lucide-react";
import { memo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatRupiahCompact } from "@/shared/utils/formatCurrency";
import type { Distribution, DistributionKind, DistributionPostGroup, DistributionStatus } from "../types/distribution.types";

const KIND_ICON: Record<DistributionKind, LucideIcon> = {
  pangan: CookingPot,
  air: Droplets,
  tidur: BedDouble,
  kebersihan: SprayCan,
  kesehatan: HeartPulse,
  bayi: Baby,
  peralatan: Boxes,
  hunian: House,
};

const KIND_SURFACE: Record<DistributionKind, string> = {
  pangan: "bg-[#f4ecd3]",
  air: "bg-[#e3f0ed]",
  tidur: "bg-[#edf1e2]",
  kebersihan: "bg-[#e9eee2]",
  kesehatan: "bg-[#f2e9df]",
  bayi: "bg-[#e5efec]",
  peralatan: "bg-[#e9eddf]",
  hunian: "bg-[#f0eadc]",
};

const DISASTER_LABEL: Record<Distribution["disaster_event"], string> = {
  banjir: "Banjir",
  gempa: "Gempa",
  longsor: "Longsor",
  erupsi: "Erupsi",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const DistributionCard = memo(function DistributionCard({ group }: { group: DistributionPostGroup }) {
  const visibleKinds = Array.from(new Set(group.records.map((record) => record.kind))).slice(0, 3);
  const statusCounts = group.records.reduce<Record<DistributionStatus, number>>(
    (counts, record) => {
      counts[record.status] += 1;
      return counts;
    },
    { "Disiapkan toko": 0, "Dalam perjalanan": 0, "Diterima posko": 0 },
  );

  const statusSummary = [
    { status: "Diterima posko" as const, label: "tiba", className: "text-[#2f5b3b]" },
    { status: "Dalam perjalanan" as const, label: "dikirim", className: "text-[#155d61]" },
    { status: "Disiapkan toko" as const, label: "disiapkan", className: "text-[#5b4919]" },
  ].filter(({ status }) => statusCounts[status] > 0);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#103a32]/14 bg-white transition-colors hover:border-[#103a32]/28 motion-reduce:transition-none">
      {group.post_image_url ? (
        <figure>
          <div className="relative aspect-[3/2] overflow-hidden bg-[#edf2e4]">
            <Image
              src={group.post_image_url}
              alt={group.post_image_alt ?? "Foto dokumentasi penanganan bencana"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
              <span className="rounded-full border border-white/70 bg-[#fbfaf6]/95 px-3 py-1 text-xs font-medium text-[#103a32]">
                {DISASTER_LABEL[group.disaster_event]}
              </span>
              <span className="rounded-full border border-white/70 bg-[#fbfaf6]/95 px-3 py-1 text-xs tabular-nums text-[#40534d]">
                {group.records.length} catatan
              </span>
            </div>
          </div>
          {(group.post_image_caption || group.post_image_source_url) && (
            <figcaption className="flex min-h-11 flex-col justify-center gap-0.5 border-b border-[#103a32]/10 px-4 py-1.5 text-[10px] leading-4 text-[#526963]">
              <span className="truncate">
                {group.post_image_caption && `Dokumentasi: ${group.post_image_caption}`}
              </span>
              {group.post_image_source_url && (
                <a
                  href={group.post_image_source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate font-medium text-main underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
                >
                  Foto: {group.post_image_credit ?? "sumber"}
                </a>
              )}
            </figcaption>
          )}
        </figure>
      ) : (
        <div className="relative flex min-h-36 items-center justify-center bg-[#edf2e4] px-5 py-8">
          <span className="absolute left-4 top-4 text-xs font-medium text-[#40534d]">
            {DISASTER_LABEL[group.disaster_event]}
          </span>
          <span className="absolute right-4 top-4 text-xs tabular-nums text-[#40534d]">
            {group.records.length} catatan
          </span>
          <div className="flex items-center gap-3" aria-hidden="true">
            {visibleKinds.map((kind) => {
              const ItemIcon = KIND_ICON[kind];
              return (
                <span
                  key={kind}
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-2xl border border-[#103a32]/12 text-[#103a32]",
                    KIND_SURFACE[kind],
                  )}
                >
                  <ItemIcon size={30} strokeWidth={1.65} />
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div>
          <h2 className="text-xl font-semibold leading-snug tracking-[-0.02em] text-[#103a32]">
            {group.post_name}
          </h2>
          <p className="mt-1 text-sm leading-5 text-[#526963]">{group.records.length} catatan penyaluran</p>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-[#103a32]/10 py-4">
          <div>
            <dt className="text-xs text-[#526963]">Nilai penyaluran</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums text-[#103a32]">
              {formatRupiahCompact(group.total_amount)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#526963]">Pembaruan terakhir</dt>
            <dd className="mt-1 text-sm font-medium text-[#103a32]">{formatDate(group.last_updated)}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-x-3 gap-y-1 py-3 text-xs">
          {statusSummary.map(({ status, label, className }) => (
            <span key={status} className={className}>
              {statusCounts[status]} {label}
            </span>
          ))}
        </div>

        <details className="group mt-auto border-t border-[#103a32]/10 pt-3">
          <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-main outline-none focus-visible:ring-2 focus-visible:ring-main focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
            <span>Lihat rincian penyaluran</span>
            <ChevronDown
              size={18}
              className="shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </summary>
          <ol className="mt-2 divide-y divide-[#103a32]/10">
            {group.records.map((record) => {
              const ItemIcon = KIND_ICON[record.kind];
              return (
                <li key={record.id} className="flex gap-3 py-4 first:pt-2 last:pb-1">
                  <span
                    className={cn(
                      "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#103a32]",
                      KIND_SURFACE[record.kind],
                    )}
                    aria-hidden="true"
                  >
                    <ItemIcon size={19} strokeWidth={1.7} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                      <h3 className="text-sm font-semibold leading-5 text-[#103a32]">{record.title}</h3>
                      <span className="shrink-0 text-sm font-semibold tabular-nums text-[#103a32]">
                        {formatRupiahCompact(record.total_amount)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-5 text-[#526963]">{record.item_summary}</p>
                    <p className="mt-2 text-xs leading-5 text-[#526963]">
                      {record.status} · {formatDate(record.captured_at)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </details>
      </div>
    </article>
  );
});
