"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import QRCode from "qrcode";
import { Portal } from "./Portal";

export function InstallQRModal({ onClose }: { onClose: () => void }) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    QRCode.toDataURL(window.location.origin, { margin: 1, width: 240 }).then(setQrDataUrl);
  }, []);

  return (
    <Portal>
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
        <div
          className="w-full max-w-sm rounded-2xl bg-surface p-6 text-center shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-black">Lanjutkan di Ponsel</h2>
            <button onClick={onClose} className="text-black/40 hover:text-black" aria-label="Tutup">
              <X size={20} />
            </button>
          </div>

          <p className="mt-2 text-left text-sm text-black/60">
            Arus Kita dirancang buat dipakai di lapangan lewat HP. Scan QR ini pake kamera ponsel buat buka &
            pasang.
          </p>

          <div className="mt-5 flex justify-center">
            {qrDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- dynamic data: URL, next/image doesn't support this
              <img src={qrDataUrl} alt="QR code buat buka Arus Kita di HP" width={200} height={200} />
            ) : (
              <div className="h-50 w-50 animate-pulse rounded-lg bg-black/5" />
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
}
