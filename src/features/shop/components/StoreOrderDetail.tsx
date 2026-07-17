"use client";

import { Check, Phone, TriangleAlert, Landmark } from "lucide-react";
import { useStoreOrderReady } from "../hooks/useStoreOrderReady";

export function StoreOrderDetail({ orderId }: { orderId: string }) {
  const {
    data,
    isLoading,
    error,
    checkedItems,
    isSubmitting,
    handleToggleItem,
    checkedCount,
    totalItems,
    allChecked,
    handleReady
  } = useStoreOrderReady(orderId);

  if (isLoading) return <div className="p-6 text-center text-sm font-medium">Memuat detail order...</div>;
  if (error || !data) return <div className="p-6 text-center text-sm font-medium text-error">Gagal memuat detail order.</div>;

  return (
    <div className="min-h-dvh bg-surface pb-32">
      <div className="px-6 pt-10">
        <div className="flex gap-3 rounded-2xl bg-[#71B679] p-4 text-white shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
            <Check className="h-5 w-5 text-[#71B679]" />
          </div>
          <div>
            <h2 className="text-sm font-bold leading-snug">
              Order Anda! Dana Rp{(data.total_amount).toLocaleString("id-ID")} terkunci
            </h2>
            <p className="mt-1 text-xs leading-snug text-white/90">
              Otomatis cair setelah barang terverifikasi tiba di posko
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 px-6">
        <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between pb-3">
            <h3 className="text-sm font-bold text-black">Checklist penyiapan</h3>
            <span className="text-xs font-medium text-black/50">
              {checkedCount}/{totalItems}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {data.items.map((item) => (
              <label
                key={item.item_id}
                className="flex cursor-pointer items-center gap-3"
                onClick={(e) => {
                  e.preventDefault();
                  handleToggleItem(item.item_id);
                }}
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    checkedItems[item.item_id]
                      ? "border-main bg-main text-white"
                      : "border-black/20 bg-transparent"
                  }`}
                >
                  {checkedItems[item.item_id] && <Check className="h-4 w-4" />}
                </div>
                <span className={`text-sm font-medium ${checkedItems[item.item_id] ? "text-black/40 line-through" : "text-black"}`}>
                  {item.name} &mdash; {item.quantity} {item.unit}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 px-6">
        <div className="flex items-center justify-between rounded-2xl border border-black/5 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E4FDE1] font-bold text-[#004D40]">
              DW
            </div>
            <div>
              <h4 className="text-sm font-bold text-black">Kurir Dewi ditugaskan</h4>
              <p className="mt-0.5 text-xs text-black/60">Motor &middot; reputasi 4,8 &middot; menuju toko Anda, tiba &plusmn;11:15</p>
            </div>
          </div>
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E4FDE1] text-[#004D40]">
            <Phone className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 px-6">
        <div className="flex items-start gap-3 rounded-xl bg-[#FFF3E0] p-4 text-[#B45309]">
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-xs font-medium leading-relaxed">
            Membatalkan setelah menyetujui menurunkan skor reputasi &amp; order dialihkan ke toko lain. &ge;3&times; pembatalan/30 hari memicu peninjauan KYC.
          </p>
        </div>
      </div>

      <div className="mt-4 px-6">
        <div className="rounded-2xl border border-black/5 bg-white p-4 text-center shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="flex items-start justify-between text-left">
            <div>
              <p className="text-[11px] text-black/50">Pencairan diperkirakan</p>
              <p className="mt-0.5 text-sm font-bold text-main">
                &lt;30 menit setelah verifikasi tiba
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-black/50">Ke rekening</p>
              <div className="mt-0.5 flex items-center justify-end gap-1 text-sm font-bold text-black">
                <Landmark className="h-4 w-4 text-black/50" />
                <span>&bull;&bull;&bull;8341</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="fixed inset-x-0 bottom-0 bg-surface px-6 pb-6 pt-2"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <button
          onClick={handleReady}
          disabled={!allChecked || isSubmitting}
          className="flex w-full items-center justify-center rounded-full bg-main py-4 text-sm font-bold text-white shadow-lg transition active:bg-main/90 disabled:opacity-50"
        >
          {isSubmitting ? "Memproses..." : "Barang Siap \u2014 Tampilkan QR Serah Terima"}
        </button>
        <button className="mt-3 block w-full text-center text-xs font-bold text-error active:opacity-70">
          Batalkan order (turunkan reputasi)
        </button>
      </div>
    </div>
  );
}
