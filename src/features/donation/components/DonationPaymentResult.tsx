"use client";

import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import type { DonationPayment } from "../types/donationPayment.types";

function formatCountdown(expiredAt: string): string {
  const diffMs = new Date(expiredAt).getTime() - Date.now();
  if (diffMs <= 0) return "Kedaluwarsa";
  const minutes = Math.floor(diffMs / 60000);
  const seconds = Math.floor((diffMs % 60000) / 1000);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function DonationPaymentResult({
  payment,
  onConfirmPaid,
}: {
  payment: DonationPayment;
  onConfirmPaid: () => void;
}) {
  const [countdown, setCountdown] = useState(() => formatCountdown(payment.expired_at));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCountdown(formatCountdown(payment.expired_at)), 1000);
    return () => clearInterval(timer);
  }, [payment.expired_at]);

  function handleCopyVa() {
    navigator.clipboard.writeText(payment.va_number).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex min-h-[85dvh] flex-col justify-center px-6 pb-10">
      <div className="rounded-2xl border border-black/5 bg-white p-5 text-center">
        <p className="text-sm text-black/50">Selesaikan pembayaran dalam</p>
        <p className="mt-1 text-2xl font-bold text-error">{countdown}</p>

        {payment.payment_method === "qris" ? (
          <>
            <div className="mx-auto mt-4 h-56 w-56 overflow-hidden rounded-xl border border-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element -- Midtrans-hosted QR image, arbitrary domain */}
              <img src={payment.qr_url} alt="QRIS pembayaran" className="h-full w-full object-contain" />
            </div>
            <p className="mt-3 text-xs text-black/50">Scan pakai e-wallet atau m-banking apa saja</p>
          </>
        ) : (
          <>
            <p className="mt-4 text-xs text-black/50">{payment.va_bank} Virtual Account</p>
            <div className="mt-1 flex items-center justify-center gap-2">
              <p className="text-xl font-bold text-black">{payment.va_number}</p>
              <button type="button" onClick={handleCopyVa} aria-label="Salin nomor VA" className="text-main">
                <Copy size={16} />
              </button>
            </div>
            {copied && <p className="mt-1 text-xs text-success">Disalin!</p>}
          </>
        )}

        <p className="mt-4 text-sm font-semibold text-black">Rp{payment.amount.toLocaleString("id-ID")}</p>
      </div>

      <PressButton variant="primary" className="mt-4 w-full py-4 text-base" onClick={onConfirmPaid}>
        Cek Status Pembayaran
      </PressButton>
    </div>
  );
}
