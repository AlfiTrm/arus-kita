"use client";

import { useEffect, useState } from "react";
import { MapPin, Megaphone, Share2 } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import { formatRupiah } from "@/shared/utils/formatCurrency";

export function EventSuccessStep({
  eventTitle,
  eventCode,
  targetDana,
  itemCount,
  isAdminVerified,
  verificationText,
  wizardStartedAt,
  onGoHome,
}: {
  eventTitle: string;
  eventCode: string;
  targetDana: number;
  itemCount: number;
  isAdminVerified: boolean;
  verificationText: string;
  wizardStartedAt: Date;
  onGoHome: () => void;
}) {
  const [elapsedLabel, setElapsedLabel] = useState("");

  useEffect(() => {
    const seconds = Math.max(0, Math.round((Date.now() - wizardStartedAt.getTime()) / 1000));
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off read of Date.now() at mount, not a reactive sync
    setElapsedLabel(minutes > 0 ? `${minutes} mnt ${remainingSeconds} dtk` : `${remainingSeconds} dtk`);
  }, [wizardStartedAt]);

  function handleShare() {
    const shareText = `${eventTitle} (${eventCode}) kini tayang di peta Arus Kita.`;
    if (navigator.share) {
      navigator.share({ title: eventTitle, text: shareText }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText).catch(() => {});
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-main">
      <div className="flex flex-col items-center justify-center px-6 py-10 text-center text-white">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-error">
            <MapPin size={26} />
          </span>
        </span>

        <h1 className="mt-5 text-xl font-bold">Event Tayang di Peta!</h1>
        <p className="mt-2 max-w-xs text-sm leading-6 text-white/80">
          {eventTitle} kini tampil di peta publik. Notifikasi otomatis terkirim ke donatur di sekitar lokasi.
        </p>
      </div>

      <div
        className="rounded-t-3xl bg-surface px-6 pt-6"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-black/50">ID event</span>
            <span className="font-mono font-semibold text-black">{eventCode}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-black/50">Target dana</span>
            <span className="font-semibold text-black">
              {formatRupiah(targetDana)} · {itemCount} jenis item
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-black/50">Status verifikasi</span>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                isAdminVerified ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
              }`}
            >
              {verificationText}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-black/50">Waktu buat</span>
            <span className="font-semibold text-black">{elapsedLabel} ⚡</span>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-xl bg-secondary/50 px-4 py-3 text-xs leading-5 text-black/70">
          <Megaphone size={16} className="mt-0.5 shrink-0 text-main" />
          Order otomatis dibroadcast ke toko mitra begitu tiap item terdanai penuh — Anda tinggal menerima barang.
        </div>

        <PressButton variant="primary" className="mt-5 w-full" onClick={onGoHome}>
          Pantau di Home
        </PressButton>

        <button
          type="button"
          onClick={handleShare}
          className="mt-3 flex w-full items-center justify-center gap-1.5 text-sm font-semibold text-main"
        >
          <Share2 size={14} /> Bagikan tautan event
        </button>
      </div>
    </div>
  );
}
