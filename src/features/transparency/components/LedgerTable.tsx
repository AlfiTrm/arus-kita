import { Receipt } from "lucide-react";
import type { LedgerEntry } from "../types/transparency.types";

function formatDateTime(iso: string): string {
  const date = new Date(iso);
  const isToday = date.toDateString() === new Date().toDateString();
  const time = date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  return isToday ? `Hari ini ${time}` : `${date.toLocaleDateString("id-ID", { day: "2-digit", month: "short" })} ${time}`;
}

function truncateHash(hash: string): string {
  return hash.length > 12 ? `${hash.slice(0, 6)}...${hash.slice(-4)}` : hash;
}

export function LedgerTable({ entries }: { entries: LedgerEntry[] }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-black">Ledger publik — transaksi terbaru</h2>
        <a href="/transparansi/ledger" className="text-sm font-medium text-main hover:underline">
          Lihat semua →
        </a>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-black/40">
              <th className="pb-2 font-medium">Waktu</th>
              <th className="pb-2 font-medium">Peristiwa</th>
              <th className="pb-2 font-medium">Posko</th>
              <th className="pb-2 font-medium">Nilai</th>
              <th className="pb-2 font-medium">Hash</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10">
                  <div className="flex flex-col items-center gap-2 text-black/30">
                    <Receipt size={24} />
                    <p className="text-sm">Belum ada transaksi tercatat.</p>
                  </div>
                </td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr key={`${entry.hash}-${entry.occurred_at}`} className="border-t border-black/5">
                  <td className="py-3 text-black/50">{formatDateTime(entry.occurred_at)}</td>
                  <td className="py-3 text-black">{entry.event}</td>
                  <td className="py-3 text-black/70">{entry.post_name}</td>
                  <td className="py-3 font-medium text-black">{entry.value_label}</td>
                  <td className="py-3 font-mono text-xs text-main/70">{truncateHash(entry.hash)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
