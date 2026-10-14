import { formatRupiahCompact } from "@/shared/utils/formatCurrency";
import type { DisasterAllocation } from "../types/transparency.types";

const BAR_COLOR_PALETTE = ["bg-main", "bg-[#6d9d64]", "bg-[#a8bf7c]", "bg-[#dfb54e]", "bg-[#8a9a85]"];

export function AllocationBreakdown({ data }: { data: DisasterAllocation[] }) {
  return (
    <section aria-labelledby="allocation-title" className="min-w-0 py-2">
      <div className="border-b border-[#103a32]/12 pb-4">
        <h2 id="allocation-title" className="font-editorial text-3xl text-[#262626] sm:text-4xl">
          Menurut jenis bencana
        </h2>
        <p className="mt-2 text-sm text-[#526963]">Porsi bantuan menurut jenis bencana.</p>
      </div>

      {data.length === 0 ? (
        <p className="py-12 text-sm text-[#526963]">Belum ada catatan untuk ditampilkan.</p>
      ) : (
        <div className="mt-5 flex flex-col">
          {data.map((item, index) => (
            <div key={item.disaster_event} className="border-b border-[#103a32]/10 py-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium text-[#103a32]">{item.disaster_event}</span>
                <span className="shrink-0 text-sm tabular-nums text-[#40534d]">
                  {formatRupiahCompact(item.total_amount)} · {item.percentage}%
                </span>
              </div>
              <div
                role="progressbar"
                aria-label={"Porsi " + item.disaster_event}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={item.percentage}
                className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#103a32]/8"
              >
                <div
                  className={"h-full rounded-full " + BAR_COLOR_PALETTE[index % BAR_COLOR_PALETTE.length]}
                  style={{ width: item.percentage + "%" }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
