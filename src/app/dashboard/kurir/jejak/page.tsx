"use client";

import { CourierCertificateCard } from "@/features/courier-dashboard/components/CourierCertificateCard";
import { CourierGoodnessSkeleton } from "@/features/courier-dashboard/components/CourierGoodnessSkeleton";
import { CourierHistoryList } from "@/features/courier-dashboard/components/CourierHistoryList";
import { useCourierGoodness } from "@/features/courier-dashboard/hooks/useCourierGoodness";

export default function CourierJejakPage() {
  const { data, error, isLoading } = useCourierGoodness();

  if (isLoading) {
    return (
      <div className="pb-6">
        <div className="px-6 pt-6">
          <h1 className="text-xl font-bold text-black">Jejak Kebaikan</h1>
        </div>
        <CourierGoodnessSkeleton />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="px-6 pt-6">
        <h1 className="text-xl font-bold text-black">Jejak Kebaikan</h1>
        <p className="mt-4 rounded-2xl border border-dashed border-black/10 px-4 py-6 text-center text-sm text-error">
          {error ?? "Gagal memuat jejak kebaikan"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-6">
      <div className="px-6 pt-6">
        <h1 className="text-xl font-bold text-black">Jejak Kebaikan</h1>
        <p className="mt-0.5 text-xs text-black/50">Portofolio kerelawanan Anda — terverifikasi rantai kustodi</p>
      </div>

      <div className="px-6">
        <CourierCertificateCard certificate={data.certificate} />
      </div>

      <div className="px-6">
        <CourierHistoryList history={data.history} />
      </div>
    </div>
  );
}
