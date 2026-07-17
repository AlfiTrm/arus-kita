"use client";

import { Bell, Clock, Lock } from "lucide-react";
import { useStoreProfile } from "../hooks/useStoreProfile";
import { StoreOrderViewSkeleton } from "./StoreSkeleton";

export function StoreOrderView() {
  const { data, isLoading, error } = useStoreProfile();

  if (isLoading) return <StoreOrderViewSkeleton />;
  if (error) return <div className="p-6 text-center text-sm font-medium text-error">Gagal memuat beranda toko.</div>;

  const storeName = data?.name ?? "Toko Anda";
  const isOnline = data?.is_online ?? true;
  const kycLabel = data?.kyc_label ?? "KYC";
  const reputationScore = data?.reputation_score ?? "-";

  return (
    <div className="pb-28">
      <div className="flex items-center justify-between px-6 pb-4 pt-10">
        <div>
          <h1 className="text-2xl font-bold text-black">{storeName}</h1>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-black/60">
            <span className={`h-2 w-2 rounded-full ${isOnline ? "bg-success" : "bg-black/30"}`} />
            {isOnline ? "Online" : "Offline"} &middot; {kycLabel} &middot; reputasi {reputationScore}
          </p>
        </div>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-black/10">
          <Bell className="h-5 w-5 text-black" />
          <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full border border-white bg-error" />
        </button>
      </div>

      <div className="mt-2 px-6">
        <div className="relative rounded-2xl border-2 border-main p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 rounded-full bg-error/10 px-2 py-0.5">
              <div className="h-1.5 w-1.5 rounded-full bg-error" />
              <span className="text-[10px] font-bold tracking-wide text-error">ORDER BARU &mdash; REBUTAN</span>
            </div>
            <div className="flex items-center gap-1 text-error">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-bold">09:12</span>
            </div>
          </div>
          <h2 className="mt-3 text-base font-bold leading-snug text-black">
            Pesanan #OR-4471 &middot; Posko Banjir Kp. Melayu
          </h2>
          <p className="mt-1 text-xs text-black/60">
            1,2 km dari toko Anda &middot; radius broadcast 5 km &middot; kategori cocok
          </p>

          <div className="mt-4 rounded-xl bg-black/5 p-3">
            <div className="flex justify-between py-1.5 text-sm">
              <span className="text-black/80">Air mineral (dus)</span>
              <span className="font-bold text-black">50 &times; Rp42.000</span>
            </div>
            <div className="flex justify-between py-1.5 text-sm">
              <span className="text-black/80">Popok bayi (pak)</span>
              <span className="font-bold text-black">20 &times; Rp65.000</span>
            </div>
            <div className="flex justify-between py-1.5 text-sm">
              <span className="text-black/80">Selimut</span>
              <span className="font-bold text-black">15 &times; Rp90.000</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-black/10 pt-3 text-sm">
              <span className="font-bold text-black">Total nilai order</span>
              <span className="font-bold text-main">Rp4.750.000</span>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-secondary p-3">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 fill-[#A88133] text-[#A88133]" />
            <p className="text-xs font-bold leading-relaxed text-[#1F542A]">
              Dana SUDAH terkunci di sistem sebelum broadcast &mdash; pembayaran dijamin, tanpa piutang.
            </p>
          </div>

          <div className="mt-4 flex gap-3">
            <button className="flex-1 rounded-full border border-black/10 py-3 text-sm font-bold text-black/60 transition active:bg-black/5">
              Lewati
            </button>
            <button className="flex-1 rounded-full bg-main py-3 text-sm font-bold text-white transition active:bg-main/90">
              Setujui &amp; Siapkan
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 px-6">
        <h3 className="text-sm font-bold text-black">Hari ini</h3>
        <div className="mt-3 flex flex-col gap-3">
          <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-black">#OR-4462 &middot; Posko Gempa Cianjur</h4>
                <p className="mt-1 text-xs text-black/50">Rp2.180.000 &middot; selesai 08:20</p>
              </div>
              <div className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
                &check; CAIR
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-4 opacity-70 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-black">#OR-4458 &middot; Posko Banjir Bekasi</h4>
                <p className="mt-1 text-xs text-black/50">Rp960.000 &middot; diambil toko lain (kalah cepat 4 dtk)</p>
              </div>
              <div className="rounded-full bg-black/10 px-2 py-0.5 text-[10px] font-bold text-black/60">
                TERLEWAT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
