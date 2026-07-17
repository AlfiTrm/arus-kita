"use client";

import { useState } from "react";
import { Check, ChevronLeft, RotateCcw, Zap } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import { useGeolocation } from "@/shared/hooks/useGeolocation";
import { useCameraCapture } from "@/shared/hooks/useCameraCapture";
import { adminDistributionService } from "../services/adminDistributionService";
import type { AdminOrderReceivingItem, DistributionProof } from "../types/adminDistribution.types";

export function DistributionCameraStep({
  orderId,
  item,
  onUploaded,
  onCancel,
}: {
  orderId: string;
  item: AdminOrderReceivingItem;
  onUploaded: (proof: DistributionProof) => void;
  onCancel: () => void;
}) {
  const { videoRef, capturedImage, capture, retake, isFlashOn, toggleFlash, isReady, error: cameraError } =
    useCameraCapture();
  const { latitude, longitude, error: geoError } = useGeolocation();

  const [distributedQuantity, setDistributedQuantity] = useState(item.quantity);
  const [recipientNote, setRecipientNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!capturedImage || latitude === null || longitude === null) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const blob = await (await fetch(capturedImage)).blob();
      const proof = await adminDistributionService.uploadProof(orderId, {
        itemId: item.item_id,
        photoBlob: blob,
        recipientNote,
        distributedQuantity,
        latitude,
        longitude,
      });
      onUploaded(proof.proof);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Gagal mengunggah bukti");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (capturedImage) {
    return (
      <div className="flex h-dvh flex-col bg-black">
        <div className="relative min-h-0 flex-1">
          {/* eslint-disable-next-line @next/next/no-img-element -- captured data URL, not an optimizable static asset */}
          <img src={capturedImage} alt="Hasil jepretan bukti distribusi" className="h-full w-full object-cover" />
        </div>

        <div
          className="shrink-0 rounded-t-3xl bg-surface px-6 pt-5"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          <p className="text-sm font-bold text-black">{item.name}</p>

          <label className="mt-3 flex flex-col gap-1.5 text-xs font-medium text-black">
            Jumlah dibagikan
            <input
              type="number"
              min={0}
              max={item.quantity}
              value={distributedQuantity}
              onChange={(e) => setDistributedQuantity(Number(e.target.value))}
              className="rounded-lg border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-main focus:ring-2 focus:ring-main/20"
            />
          </label>

          <label className="mt-3 flex flex-col gap-1.5 text-xs font-medium text-black">
            Catatan penerima <span className="font-normal text-black/40">(opsional)</span>
            <input
              value={recipientNote}
              onChange={(e) => setRecipientNote(e.target.value)}
              placeholder="cth. Dibagikan ke pengungsi lansia"
              className="rounded-lg border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-main focus:ring-2 focus:ring-main/20"
            />
          </label>

          {submitError && <p className="mt-2 text-xs text-error">{submitError}</p>}

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={retake}
              disabled={isSubmitting}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-black/10 py-3 text-sm font-semibold text-black disabled:opacity-50"
            >
              <RotateCcw size={16} /> Jepret Ulang
            </button>
            <PressButton
              variant="primary"
              onClick={handleSubmit}
              disabled={isSubmitting || latitude === null}
              className="flex flex-1 items-center justify-center gap-2 py-3 text-sm"
            >
              <Check size={16} /> {isSubmitting ? "Mengunggah..." : "Kirim Bukti"}
            </PressButton>
          </div>
        </div>
      </div>
    );
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
          <h1 className="truncate text-sm font-semibold text-white">Foto Pembagian — {item.name}</h1>
          <p className="truncate text-xs text-white/50">{item.quantity} unit</p>
        </div>
      </div>

      <div className="flex shrink-0 flex-col gap-1 px-4 text-[11px] font-mono text-white/70">
        <span className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${geoError ? "bg-error" : latitude !== null ? "bg-success" : "bg-warning"}`} />
          {latitude !== null && longitude !== null
            ? `GPS ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
            : geoError
              ? "GPS tidak tersedia"
              : "GPS mencari lokasi..."}
        </span>
      </div>

      <div className="relative mx-4 mt-3 min-h-0 flex-1 overflow-hidden rounded-2xl bg-white/5">
        <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />

        {!isReady && !cameraError && (
          <div className="absolute inset-0 flex items-center justify-center px-10 text-center text-xs text-white/30">
            [ live camera — barang + penerima bantuan dalam satu bingkai ]
          </div>
        )}

        {cameraError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 px-6 text-center text-sm text-white">
            {cameraError}
          </div>
        )}

        <div className="absolute inset-x-4 bottom-3 rounded-xl bg-black/60 px-3 py-2 text-center text-[11px] text-white/70">
          Sertakan barang & penerima dalam bingkai. Foto gelap otomatis ditolak sistem.
        </div>
      </div>

      <div
        className="flex shrink-0 items-center justify-between px-6 pt-4"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <button
          type="button"
          onClick={toggleFlash}
          aria-label="Flash"
          className={`flex h-11 w-11 items-center justify-center rounded-full border ${
            isFlashOn ? "border-warning bg-warning/20 text-warning" : "border-white/15 text-white/60"
          }`}
        >
          <Zap size={18} />
        </button>

        <button
          type="button"
          onClick={capture}
          aria-label="Ambil foto"
          className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-secondary/70 bg-white"
        />

        <span className="h-11 w-11" />
      </div>
    </div>
  );
}
