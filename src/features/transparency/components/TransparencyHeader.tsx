"use client";

import { Download } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import { downloadCsv } from "@/shared/utils/downloadCsv";
import type { LedgerEntry } from "../types/transparency.types";

export function TransparencyHeader({ ledger }: { ledger: LedgerEntry[] }) {
  function handleDownload() {
    downloadCsv(
      `pijarnusa-ledger-${new Date().toISOString().slice(0, 10)}.csv`,
      ["Waktu", "Peristiwa", "Posko", "Nilai", "Hash"],
      ledger.map((entry) => [entry.occurred_at, entry.event, entry.post_name, entry.value_label, entry.hash]),
    );
  }

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-black">Dashboard Transparansi</h1>
        <p className="mt-1 text-sm text-black/60">
          Data langsung dari ledger append-only — diperbarui real-time · dapat diunduh untuk audit.
        </p>
      </div>

      <PressButton variant="primary" onClick={handleDownload} disabled={ledger.length === 0}>
        <Download size={16} className="mr-1.5 inline" />
        Unduh CSV Ledger
      </PressButton>
    </div>
  );
}
