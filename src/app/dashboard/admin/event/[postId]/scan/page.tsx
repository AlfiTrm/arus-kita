"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { QrScannerView } from "@/features/admin-dashboard/components/QrScannerView";

function ScanPageContent() {
  const searchParams = useSearchParams();
  const eventTitle = searchParams.get("title") ?? "Event";
  const eventCode = searchParams.get("code") ?? "";

  return <QrScannerView eventTitle={eventTitle} eventCode={eventCode} />;
}

export default function ScanQrPage() {
  return (
    <Suspense fallback={<div className="h-dvh bg-black" />}>
      <ScanPageContent />
    </Suspense>
  );
}
