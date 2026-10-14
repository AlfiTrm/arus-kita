import { formatRupiah } from "@/shared/utils/formatCurrency";
import type { LedgerEntry } from "../types/transparency.types";

function formatDateTime(iso: string): { date: string; time: string } {
  const date = new Date(iso);
  return {
    date: date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
    time: date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
  };
}

function flowClass(flow: LedgerEntry["flow"]): string {
  if (flow === "Masuk") return "text-[#2f6a3d]";
  if (flow === "Dikembalikan") return "text-[#815b19]";
  return "text-[#126c72]";
}

function TransactionDetails({ entry }: { entry: LedgerEntry }) {
  const dateTime = formatDateTime(entry.occurred_at);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2">
      <div>
        <p className="font-medium text-[#103a32]">{entry.event}</p>
        <p className="mt-1 text-sm text-[#526963]">{entry.post_name}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold tabular-nums text-[#103a32]">{formatRupiah(entry.value_amount)}</p>
        <p className={"mt-1 text-xs font-medium " + flowClass(entry.flow)}>{entry.flow}</p>
      </div>
      <div className="col-span-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#103a32]/10 pt-2 text-xs text-[#526963]">
        <span>{dateTime.date} · {dateTime.time}</span>
        <span>Ref. {entry.reference_id}</span>
      </div>
    </div>
  );
}

export function LedgerTable({ entries }: { entries: LedgerEntry[] }) {
  return (
    <section aria-labelledby="ledger-title" className="border-t border-[#103a32]/12 pt-8 sm:pt-10">
      <div className="flex flex-col gap-2 border-b border-[#103a32]/12 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="ledger-title" className="font-editorial text-3xl text-[#262626] sm:text-4xl">
            Catatan transaksi
          </h2>
          <p className="mt-2 text-sm text-[#526963]">Lihat perubahan saldo dan aktivitas di tiap posko.</p>
        </div>
        <span className="text-sm text-[#526963]">{entries.length} transaksi</span>
      </div>

      <div className="mt-4 space-y-3 md:hidden">
        {entries.map((entry) => (
          <article key={entry.reference_id} className="border-b border-[#103a32]/12 py-4">
            <TransactionDetails entry={entry} />
          </article>
        ))}
      </div>

      <div className="mt-4 hidden overflow-x-auto md:block">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#103a32]/12 text-xs font-medium text-[#526963]">
              <th scope="col" className="py-3 pr-4">Waktu</th>
              <th scope="col" className="py-3 pr-4">Aktivitas</th>
              <th scope="col" className="py-3 pr-4">Posko</th>
              <th scope="col" className="py-3 pr-4">Arus</th>
              <th scope="col" className="py-3 pr-4 text-right">Nilai</th>
              <th scope="col" className="py-3 text-right">Referensi</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => {
              const dateTime = formatDateTime(entry.occurred_at);
              return (
                <tr key={entry.reference_id} className="border-b border-[#103a32]/10">
                  <td className="py-4 pr-4 text-[#40534d]">
                    <span className="block">{dateTime.date}</span>
                    <span className="mt-0.5 block text-xs text-[#526963]">{dateTime.time}</span>
                  </td>
                  <td className="py-4 pr-4 font-medium text-[#103a32]">{entry.event}</td>
                  <td className="py-4 pr-4 text-[#40534d]">{entry.post_name}</td>
                  <td className={"py-4 pr-4 font-medium " + flowClass(entry.flow)}>{entry.flow}</td>
                  <td className="py-4 pr-4 text-right font-semibold tabular-nums text-[#103a32]">
                    {formatRupiah(entry.value_amount)}
                  </td>
                  <td className="py-4 text-right text-xs text-[#526963]">{entry.reference_id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
