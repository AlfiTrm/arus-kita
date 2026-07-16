"use client";

import { Camera, X } from "lucide-react";

export function CameraInfoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl bg-surface p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-black">Kenapa hanya kamera langsung?</h2>
          <button type="button" onClick={onClose} className="text-black/40 hover:text-black" aria-label="Tutup">
            <X size={20} />
          </button>
        </div>

        <div className="mt-4 flex items-start gap-3 text-sm leading-6 text-black/70">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-main">
            <Camera size={16} />
          </span>
          <p>
            Foto galeri tidak diizinkan agar bukti kondisi bencana tidak bisa direkayasa. GPS dan waktu
            direkam otomatis dari kamera langsung, jadi laporan Anda bisa diverifikasi dan dipercaya publik.
          </p>
        </div>
      </div>
    </div>
  );
}
