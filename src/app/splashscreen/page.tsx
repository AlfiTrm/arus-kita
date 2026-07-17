"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SplashScreen } from "@/shared/components/SplashScreen";
import { hasShownSplash, markSplashShown } from "@/shared/config/pwaSession";

export default function SplashScreenPage() {
  const router = useRouter();
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    // sessionStorage is browser-only; must read post-mount to avoid SSR hydration mismatch.
    if (hasShownSplash()) {
      router.replace("/login");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from a browser API unavailable during SSR
    setShouldPlay(true);
  }, [router]);

  if (!shouldPlay) return null;

  return (
    <SplashScreen
      onFinish={() => {
        markSplashShown();
        router.replace("/login");
      }}
    />
  );
}
