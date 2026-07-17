"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Clock, Lock } from "lucide-react";
import { useStoreOrders } from "../hooks/useStoreOrders";
import { useStoreProfile } from "../hooks/useStoreProfile";
import { shopService } from "../services/shopService";
import { formatRupiah } from "@/shared/utils/formatCurrency";
import PressButton from "@/shared/components/PressButton";
import { StoreOrderViewSkeleton } from "./StoreSkeleton";

export function StoreOrderView() {
  const router = useRouter();
  const [isAccepting, setIsAccepting] = useState(false);
  const { data: profile, isLoading: profileLoading, error: profileError } = useStoreProfile();
  const { data: orders, isLoading: ordersLoading, error: ordersError } = useStoreOrders();

  if (profileLoading || ordersLoading) return <StoreOrderViewSkeleton />;
  if (profileError || ordersError) return <div className="p-6 text-center text-sm font-medium text-error">Gagal memuat beranda toko.</div>;

  const storeName = profile?.name ?? "Toko Anda";
  const isOnline = profile?.is_online ?? true;
  const kycLabel = profile?.kyc_label ?? "KYC";
  const reputationScore = profile?.reputation_score ?? "-";

  const items = orders?.items ?? [];
  const currentOrder = items[0];
  const history = items.slice(1);

  async function handleAccept() {
    if (!currentOrder) return;
    setIsAccepting(true);
    try {
      await shopService.acceptOrder(currentOrder.order_id);
      router.push(`/dashboard/toko/orders/${currentOrder.order_id}`);
    } catch (err) {
      console.error(err);
      alert("Gagal menyetujui pesanan");
    } finally {
      setIsAccepting(false);
    }
  }

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

      {currentOrder ? (
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
              {currentOrder.request_title} &middot; {currentOrder.post_name}
            </h2>
            <p className="mt-1 text-xs text-black/60">
              {currentOrder.post_address} &middot; kode: {currentOrder.order_code}
            </p>

            <div className="mt-4 rounded-xl bg-black/5 p-3">
              <div className="flex justify-between border-b border-black/10 pb-3 text-sm">
                <span className="font-bold text-black">Total nilai order</span>
                <span className="font-bold text-main">{formatRupiah(currentOrder.total_amount)}</span>
              </div>
              <p className="mt-2 text-[11px] text-black/50">
                Status: <span className="font-bold text-black/70">{currentOrder.order_status}</span>
              </p>
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
              <PressButton 
                onClick={handleAccept}
                disabled={isAccepting}
                variant="primary" 
                className="flex-1 py-3 text-sm font-bold"
              >
                {isAccepting ? "Menyetujui..." : "Setujui & Siapkan"}
              </PressButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-2 px-6">
          <div className="rounded-2xl border border-black/5 bg-white p-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <p className="text-sm text-black/50">Tidak ada order aktif saat ini.</p>
          </div>
        </div>
      )}

      <div className="mt-8 px-6">
        <h3 className="text-sm font-bold text-black">Order lainnya</h3>
        <div className="mt-3 flex flex-col gap-3">
          {history.length > 0 ? (
            history.map((item) => (
              <div
                key={item.order_id}
                className="rounded-2xl border border-black/5 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-black">
                      #{item.order_code} &middot; {item.post_name}
                    </h4>
                    <p className="mt-1 text-xs text-black/50">{item.request_title}</p>
                  </div>
                  <div className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
                    &check; {formatRupiah(item.total_amount)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-black/5 bg-white p-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <p className="text-sm text-black/50">Belum ada riwayat order.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
