"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Check, ChevronLeft, KeyRound, RotateCcw, ScanLine, TriangleAlert } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import { QrScanFrame } from "@/shared/components/QrScanFrame";
import { useGeolocation } from "@/shared/hooks/useGeolocation";
import { useQrScanner } from "@/shared/hooks/useQrScanner";
import { adminCustodyService } from "../services/adminCustodyService";
import type { CustodyPostHandoffData } from "../types/adminCustody.types";

export function QrScannerView({ eventTitle, eventCode }: { eventTitle: string; eventCode: string }) {
  const router = useRouter();
  const { videoRef, status, result, start, reset } = useQrScanner();
  const { latitude, longitude, error: geoError } = useGeolocation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [handoff, setHandoff] = useState<CustodyPostHandoffData | null>(null);
  const submittedForRef = useRef<string | null>(null);

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- start once on mount, camera lifecycle owned by the hook
  }, []);

  useEffect(() => {
    if (status !== "detected" || !result || latitude === null || longitude === null) return;
    if (submittedForRef.current === result) return;
    submittedForRef.current = result;

    setIsSubmitting(true);
    setSubmitError(null);

    adminCustodyService
      .postHandoff({
        qrPayload: result,
        latitude,
        longitude,
        idempotencyKey: `post-handoff-${result.slice(0, 40)}`,
      })
      .then((data) => setHandoff(data))
      .catch((err) => setSubmitError(err instanceof Error ? err.message : "Gagal memverifikasi kustodi"))
      .finally(() => setIsSubmitting(false));
  }, [status, result, latitude, longitude]);

  function retryHandoff() {
    submittedForRef.current = null;
    setSubmitError(null);
    reset();
  }

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
          <h1 className="truncate text-sm font-semibold text-white">Terima Barang dari Kurir</h1>
          <p className="truncate text-xs text-white/50">
            {eventCode} · {eventTitle}
          </p>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <video ref={videoRef} muted playsInline className="h-full w-full object-cover" />

        {status === "scanning" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            <QrScanFrame hint="arahkan ke QR di layar kurir" />
            <div className="px-8 text-center">
              <p className="text-sm font-semibold text-white">Scan = kustodi berpindah ke posko Anda</p>
              <p className="mt-1 text-xs text-white/50">QR ganti tiap 30 detik, tervalidasi otomatis.</p>
              {geoError && <p className="mt-2 text-xs text-warning">{geoError}</p>}
            </div>
          </div>
        )}

        {(status === "idle" || status === "starting") && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 text-white">
            <ScanLine size={28} className="animate-pulse" />
            <p className="text-sm">Membuka kamera...</p>
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

      {status === "scanning" && (
        <div className="flex shrink-0 justify-center gap-3 px-6 pb-6">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2.5 text-xs font-semibold text-white"
          >
            <KeyRound size={14} /> Masukkan PIN
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2.5 text-xs font-semibold text-white"
          >
            <TriangleAlert size={14} /> Barang tidak sesuai?
          </button>
        </div>
      )}

      {status === "detected" && result && (
        <div
          className="shrink-0 rounded-t-3xl bg-surface px-6 pt-6"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 shrink-0 animate-pulse items-center justify-center rounded-full bg-main/10 text-main">
                <ScanLine size={18} />
              </span>
              <p className="text-sm font-semibold text-black">Memverifikasi kustodi...</p>
            </div>
          ) : handoff ? (
            <>
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                  <Check size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-black">Kustodi berpindah</p>
                  <p className="truncate text-xs text-black/50">hash {handoff.short_current_hash}</p>
                </div>
              </div>
              <PressButton
                variant="primary"
                className="mt-4 w-full"
                onClick={() => router.push(`/dashboard/admin/order/${handoff.order_id}/pembagian`)}
              >
                Lanjut ke Pembagian Bantuan
              </PressButton>
            </>
          ) : submitError ? (
            <>
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-error/10 text-error">
                  <AlertTriangle size={18} />
                </span>
                <p className="text-sm font-semibold text-error">{submitError}</p>
              </div>
              <PressButton variant="secondary" className="mt-4 flex w-full items-center justify-center gap-1.5" onClick={retryHandoff}>
                <RotateCcw size={14} /> Scan lagi
              </PressButton>
            </>
          ) : (
            <p className="text-sm text-black/50">Menunggu lokasi GPS...</p>
          )}
        </div>
      )}
    </div>
  );
}
