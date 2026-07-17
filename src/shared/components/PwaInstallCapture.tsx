"use client";

import { useEffect } from "react";
import type { BeforeInstallPromptEvent } from "@/shared/hooks/useInstallPrompt";

export function PwaInstallCapture() {
  useEffect(() => {
    function handleBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      window.__pwaDeferredPrompt = e as BeforeInstallPromptEvent;
      window.dispatchEvent(new Event("pwa-installable"));
    }

    function handleAppInstalled() {
      window.__pwaInstalled = true;
      window.__pwaDeferredPrompt = null;
      window.dispatchEvent(new Event("pwa-installed"));
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  return null;
}
