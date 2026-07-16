"use client";

import { useEffect, useState } from "react";
import PressButton from "@/shared/components/PressButton";

const AUTO_REDIRECT_SECONDS = 3;

export function SuccessStep({ onDone }: { onDone: () => void }) {
  const [secondsLeft, setSecondsLeft] = useState(AUTO_REDIRECT_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onDone();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, onDone]);

  const progress = ((AUTO_REDIRECT_SECONDS - secondsLeft) / AUTO_REDIRECT_SECONDS) * 100;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-surface px-6 pb-32 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element -- static local SVG, no next/image optimization needed */}
      <img src="/status/success-icon.svg" alt="" width={140} height={140} />

      <h1 className="mt-6 text-2xl font-bold text-black">Akun sudah jadi!</h1>
      <p className="mt-1 text-sm text-black/50">Akun berhasil dibuat dan siap digunakan</p>

      <div
        className="fixed inset-x-0 bottom-0 flex flex-col items-center gap-2 bg-surface px-6 pt-4"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="h-1 w-full max-w-sm overflow-hidden rounded-full bg-black/10">
          <div className="h-full rounded-full bg-main transition-all" style={{ width: `${progress}%` }} />
        </div>
        <PressButton variant="primary" className="w-full max-w-sm" onClick={onDone}>
          Masuk beranda
        </PressButton>
      </div>
    </div>
  );
}
