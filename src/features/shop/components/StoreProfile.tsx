"use client";

import { useRouter } from "next/navigation";
import { BarChart2, Bell, ChevronRight, Clock, CreditCard, LogOut, Package, Store, User } from "lucide-react";
import { useStoreProfile } from "../hooks/useStoreProfile";
import { clearSession } from "@/shared/utils/authSession";
import { StoreProfileSkeleton } from "./StoreSkeleton";

export function StoreProfile() {
  const { data, isLoading, error } = useStoreProfile();
  const router = useRouter();

  if (isLoading) return <StoreProfileSkeleton />;
  if (error || !data) return <div className="p-6 text-center text-sm font-medium text-error">Gagal memuat profil toko.</div>;

  function handleLogout() {
    clearSession();
    router.push("/login");
  }

  return (
    <div className="pb-28">
      <div className="px-6 pt-10">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#FFF3E0]">
            <Store className="h-8 w-8 text-[#FF9800]" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-black">{data.name}</h1>
            <p className="text-xs font-medium text-black/60">{data.address}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold tracking-wide text-success">
                &check; {data.kyc_label}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-bold tracking-wide text-black/70">
                {data.reputation_score} &#9733;
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 px-6">
        <div className="flex items-center justify-between rounded-2xl border border-black/5 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div>
            <p className="text-sm font-bold text-black">Status toko: {data.is_online ? "Online" : "Offline"}</p>
            <p className="mt-0.5 text-xs text-black/50">Menerima broadcast order dalam radius 5 km</p>
          </div>
          <div className={`flex h-6 w-11 shrink-0 items-center rounded-full p-1 transition-colors ${data.is_online ? "bg-main" : "bg-black/20"}`}>
            <div className={`h-4 w-4 rounded-full bg-white transition-transform ${data.is_online ? "translate-x-5" : "translate-x-0"}`} />
          </div>
        </div>
      </div>

      <div className="mt-4 px-6">
        <div className="flex flex-col rounded-2xl border border-black/5 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between border-b border-black/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                <CreditCard className="h-5 w-5 text-main" />
              </div>
              <div>
                <p className="text-sm font-bold text-black">Rekening pencairan</p>
                <p className="mt-0.5 text-xs text-black/50">
                  {data.bank_name} {data.masked_bank_account} &middot; a.n. {data.bank_account_name}
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-black/30" />
          </div>

          <div className="flex items-center justify-between border-b border-black/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                <Package className="h-5 w-5 text-main" />
              </div>
              <div>
                <p className="text-sm font-bold text-black">Kategori barang</p>
                <p className="mt-0.5 text-xs text-black/50 capitalize">{data.categories_text}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-black/30" />
          </div>

          <div className="flex items-center justify-between border-b border-black/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                <Clock className="h-5 w-5 text-main" />
              </div>
              <div>
                <p className="text-sm font-bold text-black">Jam operasional</p>
                <p className="mt-0.5 text-xs text-black/50">Senin&ndash;Sabtu 07.00&ndash;21.00</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-black/30" />
          </div>

          <div className="flex items-center justify-between border-b border-black/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                <User className="h-5 w-5 text-main" />
              </div>
              <div>
                <p className="text-sm font-bold text-black">Staf toko</p>
                <p className="mt-0.5 text-xs text-black/50">2 akun staf &mdash; tampilkan QR, terima order</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-black/30" />
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                <Bell className="h-5 w-5 text-main" />
              </div>
              <p className="text-sm font-bold text-black">Suara notifikasi order (keras)</p>
            </div>
            <div className="flex h-6 w-11 shrink-0 items-center rounded-full bg-main p-1">
              <div className="h-4 w-4 translate-x-5 rounded-full bg-white transition-transform" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 px-6">
        <div className="flex items-start gap-3 rounded-xl bg-[#FFF3E0] p-4 text-[#E65100]">
          <BarChart2 className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-[11px] font-medium leading-relaxed">
            {data.acceptance_summary} &mdash; jaga di bawah 3 agar KYC tidak ditinjau ulang.
          </p>
        </div>
      </div>

      <div className="mt-4 px-6">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white p-4 font-bold text-error shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:bg-black/5"
        >
          <LogOut className="h-5 w-5" />
          Keluar
        </button>
      </div>
    </div>
  );
}
