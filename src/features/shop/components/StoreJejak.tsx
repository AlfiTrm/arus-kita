"use client";

import { Download } from "lucide-react";
import { useStoreGoodness } from "../hooks/useStoreGoodness";
import { StoreJejakSkeleton } from "./StoreSkeleton";

export function StoreJejak() {
  const { data, isLoading, error } = useStoreGoodness();

  if (isLoading) return <StoreJejakSkeleton />;
  if (error || !data) return <div className="p-6 text-center text-sm font-medium text-error">Gagal memuat jejak kebaikan.</div>;

  const cert = data.certificate;

  return (
    <div className="pb-28">
      <div className="px-6 pt-10">
        <h1 className="text-2xl font-bold text-black">Jejak Kebaikan</h1>
        <p className="mt-1 text-sm text-black/60">
          Portofolio kontribusi kebencanaan toko &mdash; terverifikasi ledger
        </p>
      </div>

      <div className="mt-6 px-6">
        <div className="relative overflow-hidden rounded-3xl bg-main p-5 shadow-lg">
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-xl" />
          <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-black/10 blur-2xl" />

          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-wider text-white/70 uppercase">
                {cert.title}
              </p>
              <h2 className="mt-1 text-lg font-bold text-white">{cert.store_name}</h2>
              <p className="text-xs text-white/80">
                {cert.partner_label} &middot; {cert.since_text}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary shadow-sm">
              <span className="text-2xl">🏅</span>
            </div>
          </div>

          <div className="relative z-10 mt-6 grid grid-cols-4 divide-x divide-white/20">
            <div className="flex flex-col pr-2">
              <span className="text-xl font-bold text-white">{cert.verified_order_count}</span>
              <span className="mt-0.5 text-[10px] text-white/80 leading-tight tracking-wide">
                order selesai
              </span>
            </div>
            <div className="flex flex-col px-3">
              <span className="text-xl font-bold text-white">{cert.verified_amount_text}</span>
              <span className="mt-0.5 text-[10px] text-white/80 leading-tight tracking-wide">
                nilai bantuan
              </span>
            </div>
            <div className="flex flex-col px-3">
              <span className="text-xl font-bold text-white">
                {cert.reputation_score} <span className="text-sm">&starf;</span>
              </span>
              <span className="mt-0.5 text-[10px] text-white/80 leading-tight tracking-wide">
                reputasi
              </span>
            </div>
            <div className="flex flex-col pl-3">
              <span className="text-xl font-bold text-white">{cert.dispute_count}</span>
              <span className="mt-0.5 text-[10px] text-white/80 leading-tight tracking-wide">
                sengketa
              </span>
            </div>
          </div>

          <div className="relative z-10 mt-6 flex gap-3">
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-secondary py-2.5 text-sm font-bold text-main transition active:bg-secondary/80">
              <Download className="h-4 w-4" />
              Unduh PDF
            </button>
            <button className="flex flex-1 items-center justify-center rounded-full border border-white/30 bg-transparent py-2.5 text-sm font-bold text-white transition active:bg-white/10">
              Bagikan tautan
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 px-6">
        <div className="flex items-end justify-between">
          <h3 className="text-base font-bold text-black">Pencapaian</h3>
          <span className="text-xs text-black/50">3 dari 8</span>
        </div>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex w-32 shrink-0 flex-col items-center justify-center rounded-2xl border border-black/5 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <span className="text-2xl">⚡</span>
            <p className="mt-3 text-center text-[11px] font-bold text-black leading-tight">
              Respons Kilat
            </p>
            <p className="mt-1 text-center text-[9px] text-black/50 leading-tight">
              terima order &lt;5<br />mnt &times;20
            </p>
          </div>
          <div className="flex w-32 shrink-0 flex-col items-center justify-center rounded-2xl border border-black/5 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <span className="text-2xl">🌊</span>
            <p className="mt-3 text-center text-[11px] font-bold text-black leading-tight">
              Garda Banjir
            </p>
            <p className="mt-1 text-center text-[9px] text-black/50 leading-tight">
              30 order event<br />banjir
            </p>
          </div>
          <div className="flex w-32 shrink-0 flex-col items-center justify-center rounded-2xl border border-black/5 bg-white/50 p-4 opacity-60 shadow-sm">
            <span className="text-2xl grayscale opacity-70">⛰️</span>
            <p className="mt-3 text-center text-[11px] font-bold text-black leading-tight">
              Lintas Provinsi
            </p>
            <p className="mt-1 text-center text-[9px] text-black/40 leading-tight">
              terkunci
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 px-6">
        <h3 className="text-base font-bold text-black">Riwayat kontribusi</h3>
        <div className="mt-4 flex flex-col gap-3">
          {data.history.length > 0 ? (
            data.history.map((item) => (
              <div
                key={item.order_id}
                className="flex items-center justify-between rounded-2xl border border-black/5 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
              >
                <div className="flex-1 pr-4">
                  <h4 className="text-sm font-bold leading-tight text-black">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-[11px] text-black/60">
                    {item.verified_at_text} &middot; {item.item_count} item &middot; {item.total_amount_text}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[10px] font-bold text-main">
                    {item.short_latest_hash || "0xf40a...7d21"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-black/5 bg-white p-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <p className="text-sm text-black/50">Belum ada riwayat kontribusi.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
