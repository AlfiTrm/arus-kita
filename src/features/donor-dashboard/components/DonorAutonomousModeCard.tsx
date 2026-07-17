"use client";

import { useState } from "react";

export function DonorAutonomousModeCard() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="mx-6 mt-4 flex items-center justify-between rounded-2xl border border-black/5 bg-white p-4">
      <div>
        <p className="text-sm font-semibold text-black">Mode donasi otonom</p>
        <p className="mt-0.5 text-xs text-black/50">Donasi otomatis sesuai preferensi Anda</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => setEnabled((v) => !v)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${enabled ? "bg-main" : "bg-black/15"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
            enabled ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
