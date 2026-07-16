"use client";

import { useCallback, useEffect, useState } from "react";
import { useStandaloneMode } from "./useStandaloneMode";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

declare global {
  interface Window {
    __pwaDeferredPrompt?: BeforeInstallPromptEvent | null;
    __pwaInstalled?: boolean;
  }
}

export type InstallState =
  | "checking"
  | "standalone"
  | "installable"
  | "ios-manual"
  | "desktop-qr"
  | "manual-fallback";

function detectPlatform() {
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
  return { isIOS, isDesktop: !isMobile };
}

/**
 * State machine for the PWA install affordance. Desktop always gets the
 * "continue on phone" path (this app's core flow is field/mobile use) even
 * when the browser natively supports beforeinstallprompt.
 */
export function useInstallPrompt() {
  const { isStandalone, isResolved } = useStandaloneMode();
  const [state, setState] = useState<InstallState>("checking");

  useEffect(() => {
    function resolveState() {
      if (!isResolved) return;

      if (isStandalone || window.__pwaInstalled) {
        setState("standalone");
        return;
      }

      const { isIOS, isDesktop } = detectPlatform();

      if (isDesktop) {
        setState("desktop-qr");
        return;
      }

      if (window.__pwaDeferredPrompt) {
        setState("installable");
        return;
      }

      setState(isIOS ? "ios-manual" : "manual-fallback");
    }

    resolveState();

    window.addEventListener("pwa-installable", resolveState);
    window.addEventListener("pwa-installed", resolveState);

    return () => {
      window.removeEventListener("pwa-installable", resolveState);
      window.removeEventListener("pwa-installed", resolveState);
    };
  }, [isStandalone, isResolved]);

  const promptInstall = useCallback(async () => {
    const evt = window.__pwaDeferredPrompt;
    if (!evt) return;

    await evt.prompt();
    const choice = await evt.userChoice;
    if (choice.outcome === "accepted") {
      window.__pwaDeferredPrompt = null;
    }
  }, []);

  return { state, promptInstall };
}
