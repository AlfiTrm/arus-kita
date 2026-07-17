"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { SupplementalNeedsSuccessView } from "@/features/admin-dashboard/components/SupplementalNeedsSuccessView";
import { SupplementalNeedsView } from "@/features/admin-dashboard/components/SupplementalNeedsView";
import { useAdminOrderReceiving } from "@/features/admin-dashboard/hooks/useAdminOrderReceiving";
import type { SupplementalNeedData } from "@/features/admin-dashboard/types/adminSupplementalNeeds.types";

export default function KebutuhanSusulanPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const router = useRouter();
  const { data, error, isLoading } = useAdminOrderReceiving(orderId);
  const [result, setResult] = useState<SupplementalNeedData | null>(null);

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

  if (result) {
    return <SupplementalNeedsSuccessView result={result} />;
  }

  return (
    <SupplementalNeedsView
      orderId={orderId}
      requestTitle={data.request_title}
      orderCode={data.order_code}
      onBack={() => router.back()}
      onSubmitted={setResult}
    />
  );
}
