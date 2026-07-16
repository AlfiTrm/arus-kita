"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function RegisterStepHeader({
  title,
  step,
  totalSteps,
  onBack,
}: {
  title: string;
  step: number;
  totalSteps: number;
  onBack?: () => void;
}) {
  const router = useRouter();
  const progress = (step / totalSteps) * 100;

  return (
    <div className="sticky top-0 z-10 bg-surface px-6 pt-6 pb-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack ?? (() => router.back())}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-black hover:bg-black/3"
          aria-label="Kembali"
        >
          <ChevronLeft size={18} />
        </button>
        <div>
          <h1 className="text-base font-semibold text-black">{title}</h1>
          <p className="text-xs text-black/40">
            Langkah {step} dari {totalSteps}
          </p>
        </div>
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
        <div className="h-full rounded-full bg-main transition-all" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
