"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Check, ChevronLeft, RotateCcw, ScanLine } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import { useQrScanner } from "../hooks/useQrScanner";

export function QrScannerView({ eventTitle, eventCode }: { eventTitle: string; eventCode: string }) {
  const router = useRouter();
  const { videoRef, status, result, start, reset } = useQrScanner();

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- start once on mount, camera lifecycle owned by the hook
  }, []);

  return (
    <div className="flex h-dvh flex-col bg-black">
      <div className="flex shrink-0 items-center gap-3 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Kembali"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold text-white">Scan QR Kurir</h1>
          <p className="truncate text-xs text-white/50">
            {eventCode} · {eventTitle}
          </p>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <video ref={videoRef} muted playsInline className="h-full w-full object-cover" />

        {status === "scanning" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-56 w-56 rounded-3xl border-2 border-white/80" />
          </div>
        )}

        {(status === "idle" || status === "starting") && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 text-white">
            <ScanLine size={28} className="animate-pulse" />
            <p className="text-sm">Membuka kamera...</p>
          </div>
        )}

        {status === "unsupported" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/80 px-8 text-center text-white">
            <AlertTriangle size={28} className="text-warning" />
            <p className="text-sm">Browser ini belum mendukung pemindaian QR bawaan.</p>
            <p className="text-xs text-white/50">Coba buka lewat Chrome/Edge terbaru di Android.</p>
          </div>
        )}

        {status === "denied" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/80 px-8 text-center text-white">
            <AlertTriangle size={28} className="text-warning" />
            <p className="text-sm">Izin kamera ditolak.</p>
            <p className="text-xs text-white/50">Aktifkan izin kamera di pengaturan browser, lalu coba lagi.</p>
          </div>
        )}

        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/80 px-8 text-center text-white">
            <AlertTriangle size={28} className="text-error" />
            <p className="text-sm">Gagal membuka kamera.</p>
          </div>
        )}
      </div>

      {status === "detected" && result && (
        <div
          className="shrink-0 rounded-t-3xl bg-surface px-6 pt-6"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
              <Check size={18} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-black">QR terbaca</p>
              <p className="truncate text-xs text-black/50">{result}</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <PressButton variant="secondary" className="flex flex-1 items-center justify-center gap-1.5" onClick={reset}>
              <RotateCcw size={14} /> Scan lagi
            </PressButton>
            <PressButton variant="primary" className="flex-1" onClick={() => router.back()}>
              Kembali
            </PressButton>
          </div>
        </div>
      )}
    </div>
  );
}
