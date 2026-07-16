"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { hasShownSplash } from "@/shared/config/pwaSession";
import { useStandaloneMode } from "@/shared/hooks/useStandaloneMode";

export function LandingModeGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isStandalone, isResolved } = useStandaloneMode();

  useEffect(() => {
    if (!isResolved || !isStandalone) return;
    router.replace(hasShownSplash() ? "/login" : "/splashscreen");
  }, [isResolved, isStandalone, router]);

  if (!isResolved || isStandalone) {
    return null;
  }

  return <>{children}</>;
}
