"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Check, KeyRound } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import { courierTaskService } from "../services/courierTaskService";
import type { CourierHandoffTokenData } from "../types/courierTask.types";

function secondsUntil(iso: string): number {
  return Math.max(0, Math.round((new Date(iso).getTime() - Date.now()) / 1000));
}

export function CourierHandoffQr({
  orderId,
  initialToken,
  baselineStatus,
  targetName,
  onBack,
}: {
  orderId: string;
  initialToken: CourierHandoffTokenData;
  baselineStatus: string;
  targetName: string;
  onBack: () => void;
}) {
  const [token, setToken] = useState(initialToken);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(() => secondsUntil(initialToken.cache_valid_until));
  const [confirmed, setConfirmed] = useState(false);
  const confirmedRef = useRef(false);

  useEffect(() => {
    QRCode.toDataURL(token.qr_payload, { margin: 1, width: 240 }).then(setQrDataUrl);
  }, [token.qr_payload]);

  useEffect(() => {
    if (confirmed) return;

    const tickInterval = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);

    return () => clearInterval(tickInterval);
  }, [confirmed, token]);

  useEffect(() => {
    if (confirmed || secondsLeft > 0) return;
    let cancelled = false;

    courierTaskService.handoffToken(orderId).then((next) => {
      if (!cancelled) {
        setToken(next);
        setSecondsLeft(secondsUntil(next.cache_valid_until));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [secondsLeft, confirmed, orderId]);

  useEffect(() => {
    if (confirmed) return;

    const pollInterval = setInterval(async () => {
      if (confirmedRef.current) return;
      try {
        const detail = await courierTaskService.detail(orderId);
        if (detail.order_status !== baselineStatus) {
          confirmedRef.current = true;
          setConfirmed(true);
        }
      } catch {
        // transient poll error, keep trying
      }
    }, 4000);

    return () => clearInterval(pollInterval);
  }, [confirmed, orderId, baselineStatus]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  if (confirmed) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 bg-surface px-6 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
          <Check size={26} />
        </span>
        <h2 className="text-lg font-bold text-black">Dipindai! Kustodi berpindah</h2>
        <p className="text-sm text-black/50">Barang sudah diterima {targetName}. Tugas ini selesai.</p>
        <PressButton variant="primary" className="mt-2 w-full max-w-xs" onClick={onBack}>
          Kembali ke Tugas
        </PressButton>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-surface px-6 py-6">
      <h2 className="text-center text-base font-bold text-black">Tunjukkan QR ke {targetName}</h2>
      <p className="mt-0.5 text-center text-xs text-black/40">Token #{token.token_id.slice(0, 8)}</p>

      <div className="mt-6 flex justify-center">
        {qrDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- dynamic data: URL, next/image doesn't support this
          <img src={qrDataUrl} alt="QR handoff kustodi barang" width={220} height={220} className="rounded-xl" />
        ) : (
          <div className="h-55 w-55 animate-pulse rounded-xl bg-black/5" />
        )}
      </div>

      <p className="mt-4 text-center text-sm font-semibold text-main">
        {mm}:{ss} hingga QR baru
      </p>

      <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-black/5 bg-white px-4 py-3">
        <KeyRound size={16} className="text-black/40" />
        <span className="text-xs text-black/50">PIN fallback</span>
        <span className="font-mono text-sm font-bold tracking-widest text-black">{token.fallback_pin}</span>
      </div>

      <p className="mt-4 text-center text-xs text-black/40">Menunggu {targetName} memindai QR ini...</p>

      <button type="button" onClick={onBack} className="mt-auto text-center text-sm font-semibold text-black/40">
        Kembali
      </button>
    </div>
  );
}
