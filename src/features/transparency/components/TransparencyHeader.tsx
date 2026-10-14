"use client";

import { Download } from "lucide-react";
import { formatRupiah } from "@/shared/utils/formatCurrency";
import { downloadCsv } from "@/shared/utils/downloadCsv";
import type { LedgerEntry } from "../types/transparency.types";

export function TransparencyHeader({ ledger }: { ledger: LedgerEntry[] }) {
  function handleDownload() {
    downloadCsv(
      "arus-kita-ringkasan.csv",
      ["Waktu", "Aktivitas", "Posko", "Arus", "Nilai", "Referensi"],
      ledger.map((entry) => [
        entry.occurred_at,
        entry.event,
        entry.post_name,
        entry.flow,
        formatRupiah(entry.value_amount),
        entry.reference_id,
      ]),
    );
  }

  return (
    <header className="flex flex-col justify-between gap-5 border-b border-[#103a32]/12 pb-8 sm:flex-row sm:items-end sm:pb-10">
      <div className="max-w-3xl">
        <h1 className="font-editorial text-4xl font-normal leading-[1.04] tracking-[-0.035em] text-[#262626] sm:text-5xl lg:text-6xl">
          Ke mana bantuan disalurkan?
        </h1>
        <p className="mt-4 max-w-[62ch] text-sm leading-6 text-[#40534d] sm:text-base sm:leading-7">
          Telusuri dana yang masuk, pesanan bantuan, dan penerimaan di posko.
        </p>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        disabled={ledger.length === 0}
        className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-full border border-[#103a32]/20 bg-white px-5 text-sm font-semibold text-[#103a32] transition-colors hover:border-main hover:text-main focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
      >
        <Download size={16} aria-hidden="true" />
        Unduh CSV
      </button>
    </header>
  );
}
