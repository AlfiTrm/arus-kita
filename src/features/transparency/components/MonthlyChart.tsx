import { formatRupiahCompact } from "@/shared/utils/formatCurrency";
import type { MonthlyDisbursement } from "../types/transparency.types";

export function MonthlyChart({ data }: { data: MonthlyDisbursement[] }) {
  const max = Math.max(...data.map((item) => item.total), 1);
  const rangeLabel = data.length > 0 ? data[0].month + "–" + data[data.length - 1].month + " 2026" : "";
  const description = data.map((item) => item.month + ": " + formatRupiahCompact(item.total)).join(", ");

  return (
    <section aria-labelledby="monthly-chart-title" className="min-w-0 py-2">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#103a32]/12 pb-4">
        <div>
          <h2 id="monthly-chart-title" className="font-editorial text-3xl text-[#262626] sm:text-4xl">
            Per bulan
          </h2>
          <p className="mt-2 text-sm text-[#526963]">Nilai bantuan yang disalurkan per bulan.</p>
        </div>
        <span className="text-sm text-[#526963]">{rangeLabel}</span>
      </div>

      {data.length === 0 ? (
        <p className="py-12 text-sm text-[#526963]">Belum ada catatan untuk periode ini.</p>
      ) : (
        <>
          <div
            role="img"
            aria-label={"Grafik penyaluran " + rangeLabel + ". " + description}
            className="mt-6 flex h-52 items-end gap-2 sm:gap-4"
          >
            {data.map((item) => (
              <div key={item.month} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
                <span className="hidden text-[0.6875rem] tabular-nums text-[#526963] sm:block">
                  {formatRupiahCompact(item.total)}
                </span>
                <div className="flex h-full w-full max-w-16 items-end">
                  <div
                    className="w-full rounded-t-lg bg-main/80"
                    style={{ height: Math.max((item.total / max) * 100, 4) + "%" }}
                  />
                </div>
                <span className="text-xs text-[#40534d]">{item.month}</span>
              </div>
            ))}
          </div>
          <p className="sr-only">{description}</p>
        </>
      )}
    </section>
  );
}
