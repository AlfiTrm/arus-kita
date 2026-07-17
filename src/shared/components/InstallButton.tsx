"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useInstallPrompt } from "@/shared/hooks/useInstallPrompt";
import PressButton from "./PressButton";
import { InstallInstructionsModal } from "./InstallInstructionsModal";
import { InstallQRModal } from "./InstallQRModal";

type Modal = "ios" | "manual" | "qr" | null;

export function InstallButton({ className }: { className?: string }) {
  const { state, promptInstall } = useInstallPrompt();
  const [modal, setModal] = useState<Modal>(null);
  const router = useRouter();

  if (state === "checking") return null;

  async function handleClick() {
    switch (state) {
      case "standalone":
        router.push("/splashscreen");
        break;
      case "installable":
        await promptInstall();
        break;
      case "ios-manual":
        setModal("ios");
        break;
      case "desktop-qr":
        setModal("qr");
        break;
      case "manual-fallback":
        setModal("manual");
        break;
    }
  }

  return (
    <>
      <PressButton variant="primary" onClick={handleClick} className={className}>
        {state === "standalone" ? "Buka App" : "Install App"}
      </PressButton>

      {modal === "ios" && <InstallInstructionsModal variant="ios" onClose={() => setModal(null)} />}
      {modal === "manual" && <InstallInstructionsModal variant="generic" onClose={() => setModal(null)} />}
      {modal === "qr" && <InstallQRModal onClose={() => setModal(null)} />}
    </>
  );
}
