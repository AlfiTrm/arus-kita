"use client";

import { useTransparencyData } from "../hooks/useTransparencyData";
import { AllocationBreakdown } from "./AllocationBreakdown";
import { LedgerTable } from "./LedgerTable";
import { MonthlyChart } from "./MonthlyChart";
import { SummaryCards } from "./SummaryCards";
import { TransparencyHeader } from "./TransparencyHeader";

export function TransparencyDashboard() {
  const { data, error } = useTransparencyData();

  if (error) {
    return (
      <div className="container py-12">
        <p className="text-center text-sm text-error">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container py-12">
        <p className="text-center text-sm text-black/40">Memuat data transparansi...</p>
      </div>
    );
  }

  return (
    <div className="container flex flex-col gap-6 py-8">
      <TransparencyHeader ledger={data.latest_ledger} />
      <SummaryCards summary={data.summary} />

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <MonthlyChart data={data.monthly_disbursements} />
        <AllocationBreakdown data={data.allocation_by_disaster} />
      </div>

      <LedgerTable entries={data.latest_ledger} />
    </div>
  );
}
