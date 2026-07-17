"use client";

import { useEffect, useState } from "react";

const STATUS_STEPS = [
  "Menyiapkan mode offline-first...",
  "Memuat peta bencana...",
  "Menyinkronkan data...",
  "Hampir siap...",
];

const STEP_DURATION_MS = 550;

export function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (stepIndex >= STATUS_STEPS.length) {
      const timeout = setTimeout(onFinish, 200);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => setStepIndex((i) => i + 1), STEP_DURATION_MS);
    return () => clearTimeout(timeout);
  }, [stepIndex, onFinish]);

  const progress = Math.min(stepIndex / STATUS_STEPS.length, 1) * 100;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-between overflow-hidden bg-gradient-to-br from-main to-main-shadow py-24">
      <span className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      <span className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

      <div />

      <div className="flex flex-col items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary">
          {/* eslint-disable-next-line @next/next/no-img-element -- static local SVG mark, no next/image optimization needed */}
          <img src="/icon/aruskita-icon.svg" alt="" className="h-9 w-auto" />
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-white">Arus Kita</p>
          <p className="mt-1 text-sm text-white/70">Bantuan sampai. Terbukti.</p>
        </div>
      </div>

      <div className="flex w-48 flex-col items-center gap-3">
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-white/70">{STATUS_STEPS[Math.min(stepIndex, STATUS_STEPS.length - 1)]}</p>
      </div>
    </div>
  );
}
