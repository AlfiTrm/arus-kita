"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1200;

interface ParsedValue {
  prefix: string;
  number: number;
  decimals: number;
  suffix: string;
}

function parseValue(text: string): ParsedValue | null {
  const match = text.match(/^([^\d]*)([\d.,]+)([^\d]*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const normalized = numStr.replace(/\./g, "").replace(",", ".");
  const number = parseFloat(normalized);
  if (Number.isNaN(number)) return null;
  const decimals = numStr.includes(",") ? numStr.split(",")[1].length : 0;
  return { prefix, number, decimals, suffix };
}

function formatNumber(value: number, decimals: number): string {
  return value.toLocaleString("id-ID", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function useCountUp(value: string): string {
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(value);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!parsed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- unparseable value, just sync the prop through as-is
      setDisplay(value);
      return;
    }

    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = parsed!.number * eased;
      setDisplay(parsed!.prefix + formatNumber(current, parsed!.decimals) + parsed!.suffix);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return display;
}
