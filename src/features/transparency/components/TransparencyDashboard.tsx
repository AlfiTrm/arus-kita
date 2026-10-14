"use client";

import { ScrollReveal } from "@/shared/components/ScrollReveal";
import { useTransparencyData } from "../hooks/useTransparencyData";
import { AllocationBreakdown } from "./AllocationBreakdown";
import { LedgerTable } from "./LedgerTable";
import { MonthlyChart } from "./MonthlyChart";
import { SummaryCards } from "./SummaryCards";
import { TransparencyHeader } from "./TransparencyHeader";

export function TransparencyDashboard() {
  const data = useTransparencyData();

  return (
    <div className="bg-[#fbfaf6]">
      <div className="container flex flex-col gap-8 py-10 sm:gap-10 sm:py-14">
        <ScrollReveal>
          <TransparencyHeader ledger={data.latest_ledger} />
        </ScrollReveal>

        <ScrollReveal>
          <SummaryCards summary={data.summary} />
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <MonthlyChart data={data.monthly_disbursements} />
            <AllocationBreakdown data={data.allocation_by_disaster} />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <LedgerTable entries={data.latest_ledger} />
        </ScrollReveal>
      </div>
    </div>
  );
}
