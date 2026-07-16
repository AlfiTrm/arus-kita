"use client";

import { useEffect, useState } from "react";

function getStandaloneMode() {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export function useStandaloneMode() {
  const [isStandalone, setIsStandalone] = useState(false);
  const [isResolved, setIsResolved] = useState(false);

  useEffect(() => {
    const syncStandaloneMode = () => {
      setIsStandalone(getStandaloneMode());
      setIsResolved(true);
    };

    syncStandaloneMode();

    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    mediaQuery.addEventListener("change", syncStandaloneMode);
    window.addEventListener("appinstalled", syncStandaloneMode);

    return () => {
      mediaQuery.removeEventListener("change", syncStandaloneMode);
      window.removeEventListener("appinstalled", syncStandaloneMode);
    };
  }, []);

  return { isStandalone, isResolved };
}
