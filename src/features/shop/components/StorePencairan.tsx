"use client";

import { Star } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import { useStoreDisbursement } from "../hooks/useStoreDisbursement";
import { StorePencairanSkeleton } from "./StoreSkeleton";

export function StorePencairan() {
  const { data, isLoading, error } = useStoreDisbursement();

  if (isLoading) return <StorePencairanSkeleton />;
  if (error || !data) return <div className="p-6 text-center text-sm font-medium text-error">Gagal memuat data pencairan.</div>;

  const { summary, history, goodness_trail } = data;

  return (
    <div className="pb-28">
      <div className="px-6 pt-10">
        <h1 className="text-2xl font-bold text-black">Pencairan Dana</h1>
        <p className="mt-1 text-sm text-black/60">
          Otomatis via payment gateway &middot; idempotent, tanpa dobel
        </p>
      </div>

      <div className="mt-6 px-6">
        <div className="rounded-3xl bg-main p-5 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <p className="text-xs font-medium text-white/80">Total cair bulan ini</p>
            <div className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-main">
              {summary.median_disbursement_text}
            </div>
          </div>
          <h2 className="mt-2 text-3xl font-bold">{summary.total_disbursed_text}</h2>
          <p className="mt-3 text-xs text-white/80">{summary.subtitle}</p>
        </div>
      </div>

      <div className="mt-8 px-6">
        <h3 className="text-base font-bold text-black">Riwayat disbursement</h3>
        <div className="mt-4 flex flex-col gap-3">
          {history.length > 0 ? (
            history.map((item) => {
              const isWarning = item.badge_variant === "warning";
              const isSuccess = item.badge_variant === "success";
              const amountColor = isWarning ? "text-[#B45309]" : isSuccess ? "text-success" : "text-black";
              const badgeBg = isWarning ? "bg-[#FEF3C7]" : isSuccess ? "bg-success/10" : "bg-black/5";
              const badgeText = isWarning ? "text-[#B45309]" : isSuccess ? "text-success" : "text-black";

              return (
                <div
                  key={item.disbursement_id}
                  className="flex flex-col rounded-2xl border border-black/5 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-bold text-black">
                      #{item.order_code} &middot; {item.post_name}
                    </h4>
                    <span className={`text-sm font-bold ${amountColor}`}>
                      {item.amount_text}
                    </span>
                  </div>
                  
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-[11px] text-black/60">{item.timeline_text}</p>
                    <div className={`mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${badgeBg} ${badgeText}`}>
                      {isWarning && <span className="mr-0.5">&circlearrowright; </span>}
                      {isSuccess && <span className="mr-0.5">&check; </span>}
                      {item.status_label}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-black/40">
                    <span>idempotency: {item.idempotency_key}</span>
                    <span>&middot;</span>
                    <span>gateway ref {item.gateway_reference}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-2xl border border-black/5 bg-white p-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <p className="text-sm text-black/50">Belum ada riwayat pencairan.</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 px-6">
        <div className="flex items-center justify-between rounded-2xl bg-[#E4FDE1] p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
              <Star className="h-6 w-6 text-main" />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="text-sm font-bold text-[#004D40]">Jejak Kebaikan Toko</h4>
              <p className="mt-0.5 text-[11px] leading-snug text-[#004D40]/80">
                {goodness_trail.summary_text}
              </p>
            </div>
          </div>
          <PressButton variant="primary" className="shrink-0 px-4 py-2 text-[11px]">
            Ekspor PDF
          </PressButton>
        </div>
      </div>
    </div>
  );
}
