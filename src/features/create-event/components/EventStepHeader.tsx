"use client";

import { HelpCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function EventStepHeader({
  step,
  totalSteps,
  subtitle,
  onClose,
  onInfoClick,
  variant = "dark",
}: {
  step: number;
  totalSteps: number;
  subtitle: string;
  onClose?: () => void;
  onInfoClick?: () => void;
  variant?: "dark" | "light";
}) {
  const router = useRouter();
  const isDark = variant === "dark";
  const progress = (step / totalSteps) * 100;

  return (
    <div className={`shrink-0 px-6 pt-6 pb-4 ${isDark ? "bg-black" : "bg-surface"}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose ?? (() => router.back())}
            aria-label="Tutup"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
              isDark ? "border-white/15 text-white hover:bg-white/5" : "border-black/10 text-black hover:bg-black/3"
            }`}
          >
            <X size={18} />
          </button>
          <div>
            <h1 className={`text-base font-semibold ${isDark ? "text-white" : "text-black"}`}>
              Buat Event — Langkah {step}/{totalSteps}
            </h1>
            <p className={`text-xs ${isDark ? "text-white/50" : "text-black/50"}`}>{subtitle}</p>
          </div>
        </div>

        {onInfoClick && (
          <button
            type="button"
            onClick={onInfoClick}
            aria-label="Info mekanisme kamera"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
              isDark
                ? "border-white/15 text-white/70 hover:bg-white/5"
                : "border-black/10 text-black/60 hover:bg-black/3"
            }`}
          >
            <HelpCircle size={18} />
          </button>
        )}
      </div>

      <div className={`mt-4 h-1.5 w-full overflow-hidden rounded-full ${isDark ? "bg-white/10" : "bg-black/10"}`}>
        <div className="h-full rounded-full bg-main transition-all" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
