"use client";

import { PlusSquare, Share, X } from "lucide-react";

const STEPS = {
  ios: [
    { icon: Share, text: 'Tap ikon "Share" di Safari (kotak dengan panah ke atas)' },
    { icon: PlusSquare, text: 'Scroll dan pilih "Add to Home Screen"' },
  ],
  generic: [
    { icon: PlusSquare, text: "Buka menu browser (titik tiga di pojok)" },
    { icon: PlusSquare, text: 'Pilih "Add to Home Screen" atau "Install App"' },
  ],
} as const;

export function InstallInstructionsModal({
  variant,
  onClose,
}: {
  variant: "ios" | "generic";
  onClose: () => void;
}) {
  const steps = STEPS[variant];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl bg-surface p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-black">Pasang Arus Kita</h2>
          <button onClick={onClose} className="text-black/40 hover:text-black" aria-label="Tutup">
            <X size={20} />
          </button>
        </div>

        <ol className="mt-4 flex flex-col gap-4">
          {steps.map((step, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-black/70">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-main">
                <step.icon size={16} />
              </span>
              {step.text}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
