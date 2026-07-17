"use client";

import PressButton from "@/shared/components/PressButton";

export function SuccessStep({ onDone }: { onDone: () => void }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-surface px-6 pb-32 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element -- static local SVG, no next/image optimization needed */}
      <img src="/status/success-icon.svg" alt="" width={140} height={140} />

      <h1 className="mt-6 text-2xl font-bold text-black">Akun sudah jadi!</h1>
      <p className="mt-1 text-sm text-black/50">Akun berhasil dibuat dan siap digunakan</p>

      <div
        className="fixed inset-x-0 bottom-0 flex flex-col items-center bg-surface px-6 pt-4"
        style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}
      >
        <PressButton variant="primary" className="w-full max-w-sm" onClick={onDone}>
          Masuk beranda
        </PressButton>
      </div>
    </div>
  );
}
