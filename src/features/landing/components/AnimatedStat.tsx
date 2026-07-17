"use client";

import { useCountUp } from "@/shared/hooks/useCountUp";

export function AnimatedStat({
  value,
  label,
  delayMs,
}: {
  value: string;
  label: string;
  delayMs: number;
}) {
  const animatedValue = useCountUp(value);

  return (
    <div className="animate-fade-in" style={{ animationDelay: `${delayMs}ms` }}>
      <dt className="text-2xl font-bold text-main tabular-nums">{animatedValue}</dt>
      <dd className="mt-1 text-sm text-black/50">{label}</dd>
    </div>
  );
}
