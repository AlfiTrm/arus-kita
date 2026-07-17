"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, ChevronLeft, KeyRound, ScanLine } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import { QrScanFrame } from "@/shared/components/QrScanFrame";
import { useGeolocation } from "@/shared/hooks/useGeolocation";
import { useQrScanner } from "@/shared/hooks/useQrScanner";
import { courierCustodyService } from "../services/courierCustodyService";
import type { CustodyStoreHandoffData } from "../types/courierCustody.types";

export function CourierStoreHandoffScan({
  orderId,
  storeName,
  onSuccess,
  onCancel,
}: {
  orderId: string;
  storeName: string;
  onSuccess: (data: CustodyStoreHandoffData) => void;
  onCancel: () => void;
}) {
  const { videoRef, status, result, start, reset } = useQrScanner();
  const { latitude, longitude, error: geoError } = useGeolocation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submittedForRef = useRef<string | null>(null);

  const [showPinInput, setShowPinInput] = useState(false);
  const [pin, setPin] = useState("");
  const [isPinSubmitting, setIsPinSubmitting] = useState(false);
  const [pinError, setPinError] = useState<string | null>(null);

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

    courierCustodyService
      .storeHandoffByQr({
        qrPayload: result,
        latitude,
        longitude,
        idempotencyKey: `store-handoff-${result.slice(0, 40)}`,
      })
      .then(onSuccess)
      .catch((err) => setSubmitError(err instanceof Error ? err.message : "Gagal memverifikasi kustodi"))
      .finally(() => setIsSubmitting(false));
  }, [status, result, latitude, longitude, onSuccess]);

  function retryScan() {
    submittedForRef.current = null;
    setSubmitError(null);
    reset();
  }

  async function submitPin() {
    if (pin.length < 4 || latitude === null || longitude === null) return;
    setIsPinSubmitting(true);
    setPinError(null);
    try {
      const data = await courierCustodyService.storeHandoffByPin({
        orderId,
        fallbackPin: pin,
        latitude,
        longitude,
        idempotencyKey: `store-handoff-pin-${orderId}-${pin}`,
      });
      onSuccess(data);
    } catch (err) {
      setPinError(err instanceof Error ? err.message : "PIN salah atau gagal diverifikasi");
    } finally {
      setIsPinSubmitting(false);
    }
  }

  return (
    <div className="flex h-dvh flex-col bg-black">
      <div className="flex shrink-0 items-center gap-3 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
        <button
          type="button"
          onClick={onCancel}
          aria-label="Batal"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold text-white">Ambil Barang di Toko</h1>
          <p className="truncate text-xs text-white/50">{storeName}</p>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <video ref={videoRef} muted playsInline className="h-full w-full object-cover" />

        {status === "scanning" && !showPinInput && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            <QrScanFrame hint="arahkan ke QR di layar toko" />
            <div className="px-8 text-center">
              <p className="text-sm font-semibold text-white">Scan = barang berpindah ke tangan Anda</p>
              <p className="mt-1 text-xs text-white/50">Konfirmasi ini mengunci kustodi ke akun Anda.</p>
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

        {status === "unsupported" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/80 px-8 text-center text-white">
            <AlertTriangle size={28} className="text-warning" />
            <p className="text-sm">Browser ini belum mendukung pemindaian QR bawaan.</p>
            <p className="text-xs text-white/50">Pakai PIN fallback di bawah.</p>
          </div>
        )}

        {status === "denied" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/80 px-8 text-center text-white">
            <AlertTriangle size={28} className="text-warning" />
            <p className="text-sm">Izin kamera ditolak.</p>
            <p className="text-xs text-white/50">Aktifkan izin kamera, atau pakai PIN fallback.</p>
          </div>
        )}

        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/80 px-8 text-center text-white">
            <AlertTriangle size={28} className="text-error" />
            <p className="text-sm">Gagal membuka kamera.</p>
          </div>
        )}
      </div>

      {status === "scanning" && !showPinInput && (
        <div className="flex shrink-0 justify-center px-6 pb-6">
          <button
            type="button"
            onClick={() => setShowPinInput(true)}
            className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2.5 text-xs font-semibold text-white"
          >
            <KeyRound size={14} /> Masukkan PIN
          </button>
        </div>
      )}

      {showPinInput && (
        <div
          className="shrink-0 rounded-t-3xl bg-surface px-6 pt-6"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          <p className="text-sm font-semibold text-black">Masukkan PIN dari toko</p>
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
            inputMode="numeric"
            placeholder="6 digit PIN"
            autoFocus
            className="mt-2 w-full rounded-lg border border-black/10 px-4 py-3 text-center text-lg font-bold tracking-widest outline-none focus:border-main focus:ring-2 focus:ring-main/20"
          />
          {pinError && <p className="mt-2 text-xs text-error">{pinError}</p>}
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => {
                setShowPinInput(false);
                setPin("");
                setPinError(null);
              }}
              className="flex-1 rounded-full border border-black/10 py-3 text-sm font-semibold text-black"
            >
              Batal
            </button>
            <PressButton
              variant="primary"
              className="flex-1"
              disabled={pin.length < 4 || isPinSubmitting}
              onClick={submitPin}
            >
              {isPinSubmitting ? "Memverifikasi..." : "Konfirmasi"}
            </PressButton>
          </div>
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
          ) : submitError ? (
            <>
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-error/10 text-error">
                  <AlertTriangle size={18} />
                </span>
                <p className="text-sm font-semibold text-error">{submitError}</p>
              </div>
              <PressButton variant="secondary" className="mt-4 w-full" onClick={retryScan}>
                Scan lagi
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
