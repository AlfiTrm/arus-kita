"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import { useCameraCapture } from "../hooks/useCameraCapture";
import { useGeolocation } from "../hooks/useGeolocation";
import { CapturedPhotoReview } from "./CapturedPhotoReview";
import type { EventPhoto } from "../types/createEvent.types";

function formatEventTimestamp(date: Date): string {
  const datePart = date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
  const timePart = date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  return `${datePart} · ${timePart} WIB`;
}

export function CameraCaptureStep({ onNext }: { onNext: (photo: EventPhoto) => void }) {
  const { videoRef, capturedImage, capturedAt, capture, retake, isFlashOn, toggleFlash, isReady, error } =
    useCameraCapture();
  const geo = useGeolocation();
  const [now, setNow] = useState(() => new Date());
  const [isReviewing, setIsReviewing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const displayedTimestamp = capturedAt ? formatEventTimestamp(capturedAt) : formatEventTimestamp(now);

  function confirmPhoto() {
    if (!capturedImage || !capturedAt) return;
    onNext({ dataUrl: capturedImage, latitude: geo.latitude, longitude: geo.longitude, capturedAt });
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-black">
      <div className="flex shrink-0 flex-col gap-1 px-4 pt-3 text-[11px] font-mono text-white/70">
        <span className="flex items-center gap-1.5">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              geo.error ? "bg-error" : geo.latitude !== null ? "bg-success" : "bg-warning"
            }`}
          />
          {geo.latitude !== null && geo.longitude !== null
            ? `GPS ${geo.latitude.toFixed(4)}, ${geo.longitude.toFixed(4)}`
            : geo.error
              ? "GPS tidak tersedia"
              : "GPS mencari lokasi..."}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          {displayedTimestamp}
        </span>
      </div>

      <div className="relative mx-4 mt-3 min-h-0 flex-1 overflow-hidden rounded-2xl bg-white/5">
        <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />

        {!isReady && !error && (
          <div className="absolute inset-0 flex items-center justify-center px-10 text-center text-xs text-white/30">
            [ live camera — kondisi lokasi bencana ]
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 px-6 text-center text-sm text-white">
            {error}
          </div>
        )}

        <div className="absolute bottom-3 left-1/2 h-24 w-24 -translate-x-1/2 overflow-hidden rounded-xl border-2 border-white/70 bg-black/40 shadow-lg">
          {capturedImage ? (
            <button
              type="button"
              onClick={() => setIsReviewing(true)}
              aria-label="Lihat hasil jepretan"
              className="h-full w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- captured data URL, not an optimizable static asset */}
              <img src={capturedImage} alt="Hasil tangkapan" className="h-full w-full object-cover" />
            </button>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-white/30">1</div>
          )}
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

        <PressButton
          variant="secondary"
          disabled={!capturedImage}
          onClick={confirmPhoto}
          aria-label="Lanjut"
          className="flex h-11 w-11 items-center justify-center p-0"
        >
          <ArrowRight size={20} />
        </PressButton>
      </div>

      {isReviewing && capturedImage && (
        <CapturedPhotoReview
          image={capturedImage}
          onRetake={() => {
            retake();
            setIsReviewing(false);
          }}
          onConfirm={confirmPhoto}
        />
      )}
    </div>
  );
}
