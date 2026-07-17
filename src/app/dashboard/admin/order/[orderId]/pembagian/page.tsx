"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { DistributionCameraStep } from "@/features/admin-dashboard/components/DistributionCameraStep";
import { DistributionCompleteView } from "@/features/admin-dashboard/components/DistributionCompleteView";
import { PembagianChecklistView } from "@/features/admin-dashboard/components/PembagianChecklistView";
import { useAdminOrderReceiving } from "@/features/admin-dashboard/hooks/useAdminOrderReceiving";
import { adminDistributionService } from "@/features/admin-dashboard/services/adminDistributionService";
import { useGeolocation } from "@/shared/hooks/useGeolocation";
import type { CompleteDistributionData } from "@/features/admin-dashboard/types/adminDistribution.types";

export default function PembagianBantuanPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const router = useRouter();
  const { data, error, isLoading, refetch } = useAdminOrderReceiving(orderId);
  const { latitude, longitude } = useGeolocation();

  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [completeError, setCompleteError] = useState<string | null>(null);
  const [completeResult, setCompleteResult] = useState<CompleteDistributionData | null>(null);

  async function handleComplete() {
    if (latitude === null || longitude === null) {
      setCompleteError("Menunggu lokasi GPS...");
      return;
    }
    setIsCompleting(true);
    setCompleteError(null);
    try {
      const result = await adminDistributionService.complete(orderId, {
        idempotencyKey: `complete-${orderId}`,
        latitude,
        longitude,
      });
      setCompleteResult(result);
    } catch (err) {
      setCompleteError(err instanceof Error ? err.message : "Gagal menyelesaikan transaksi");
    } finally {
      setIsCompleting(false);
    }
  }

  if (isLoading) {
    return <div className="flex h-dvh items-center justify-center bg-surface text-sm text-black/40">Memuat order...</div>;
  }

  if (error || !data) {
    return (
      <div className="flex h-dvh items-center justify-center bg-surface px-6 text-center text-sm text-error">
        {error ?? "Order tidak ditemukan"}
      </div>
    );
  }

  if (completeResult) {
    return <DistributionCompleteView result={completeResult} orderCode={data.order_code} />;
  }

  const activeItem = activeItemId ? data.items.find((item) => item.item_id === activeItemId) : null;

  if (activeItem) {
    return (
      <DistributionCameraStep
        orderId={orderId}
        item={activeItem}
        onCancel={() => setActiveItemId(null)}
        onUploaded={() => {
          setActiveItemId(null);
          refetch();
        }}
      />
    );
  }

  return (
    <PembagianChecklistView
      data={data}
      onBack={() => router.back()}
      onPhotoItem={setActiveItemId}
      onComplete={handleComplete}
      isCompleting={isCompleting}
      completeError={completeError}
    />
  );
}
