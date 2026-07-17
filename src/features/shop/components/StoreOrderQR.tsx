"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, MapPin, SignalHigh } from "lucide-react";
import QRCode from "qrcode";
import type { StoreOrderReadyData } from "../types/shop.types";

export function StoreOrderQR({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [qrData, setQrData] = useState<StoreOrderReadyData | null>(null);
  const [qrImageUrl, setQrImageUrl] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const raw = sessionStorage.getItem("store_order_qr");
    if (!raw) {
      router.replace(`/dashboard/toko/orders/${orderId}`);
      return;
    }
    try {
      const parsed = JSON.parse(raw) as StoreOrderReadyData;
      setQrData(parsed);
      setTimeLeft(parsed.refresh_in_seconds || 18);
    } catch {
      router.replace(`/dashboard/toko/orders/${orderId}`);
    }
  }, [orderId, router]);

  useEffect(() => {
    if (qrData?.qr_payload) {
      QRCode.toDataURL(qrData.qr_payload, {
        width: 300,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
        .then((url) => setQrImageUrl(url))
        .catch(console.error);
    }
  }, [qrData]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  if (!qrData) return null;

  return (
    <div className="flex min-h-dvh flex-col bg-main">
      <div className="flex items-center gap-4 px-6 pt-10">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition active:bg-white/30"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-white">Serah Terima ke Kurir</h1>
          <p className="text-xs text-white/80">Minta Kurir Dewi memindai QR ini</p>
        </div>
      </div>

      <div className="mt-8 px-6">
        <div className="flex flex-col items-center rounded-3xl bg-white p-6 shadow-xl">
          <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-black/5">
            {qrImageUrl ? (
              <img src={qrImageUrl} alt="QR Code" className="h-full w-full object-contain mix-blend-multiply" />
            ) : (
              <div className="animate-pulse bg-black/10 w-full h-full"></div>
            )}
            <div className="absolute flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-main shadow-sm">
              <MapPin className="h-8 w-8 text-white" />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-main">
              {timeLeft}
            </div>
            <p className="text-xs font-medium text-black/60">
              QR baru dalam <strong className="text-main">{timeLeft} detik</strong> &middot; signed HMAC
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 px-6">
        <div className="rounded-2xl bg-white/10 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-white/80">Fallback PIN (kamera rusak)</p>
            <p className="text-[10px] font-medium text-white/60">berlaku 30 dtk &middot; sekali pakai</p>
          </div>
          <div className="mt-4 flex justify-between gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex aspect-square flex-1 items-center justify-center rounded-xl bg-white text-xl sm:text-2xl font-black text-black"
              >
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 px-6">
        <div className="flex items-start gap-3 rounded-xl bg-white/10 p-4">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white/20 text-white">
            <SignalHigh className="h-3 w-3" />
          </div>
          <p className="text-[11px] font-medium leading-relaxed text-white">
            Token di-cache 90 detik &mdash; tetap dapat divalidasi walau sinyal sempat putus.
          </p>
        </div>
      </div>

      <div className="mt-auto px-6 pb-6 pt-10">
        <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4">
          <p className="text-xs font-medium text-white/80">Setelah kurir<br/>memindai:</p>
          <p className="text-right text-xs font-bold text-white">
            Kustodi berpindah ke kurir &middot;<br/>Anda aman &check;
          </p>
        </div>
      </div>
    </div>
  );
}
