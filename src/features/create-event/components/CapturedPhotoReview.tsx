"use client";

import { Check, RotateCcw } from "lucide-react";
import PressButton from "@/shared/components/PressButton";

export function CapturedPhotoReview({
  image,
  onRetake,
  onConfirm,
}: {
  image: string;
  onRetake: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-black">
      <div className="relative min-h-0 flex-1">
        {/* eslint-disable-next-line @next/next/no-img-element -- captured data URL, not an optimizable static asset */}
        <img src={image} alt="Hasil jepretan" className="h-full w-full object-cover" />
      </div>

      <div
        className="flex shrink-0 items-center gap-3 px-6 pt-4"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <button
          type="button"
          onClick={onRetake}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 py-3 text-sm font-semibold text-white"
        >
          <RotateCcw size={16} /> Jepret Ulang
        </button>
        <PressButton
          variant="primary"
          onClick={onConfirm}
          className="flex flex-1 items-center justify-center gap-2 py-3 text-sm"
        >
          <Check size={16} /> Pakai Foto
        </PressButton>
      </div>
    </div>
  );
}
