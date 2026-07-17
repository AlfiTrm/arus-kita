"use client";

import { use } from "react";
import { CourierDeliveryView } from "@/features/courier-dashboard/components/CourierDeliveryView";
import { useCourierTaskDetail } from "@/features/courier-dashboard/hooks/useCourierTaskDetail";

export default function CourierDeliveryPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const { task, error, isLoading } = useCourierTaskDetail(orderId);

  if (isLoading) {
    return <div className="flex h-full items-center justify-center bg-surface text-sm text-black/40">Memuat tugas...</div>;
  }

  if (error || !task) {
    return (
      <div className="flex h-full items-center justify-center bg-surface px-6 text-center text-sm text-error">
        {error ?? "Tugas tidak ditemukan"}
      </div>
    );
  }

  return <CourierDeliveryView task={task} />;
}
