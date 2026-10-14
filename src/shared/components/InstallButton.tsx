"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useInstallPrompt } from "@/shared/hooks/useInstallPrompt";
import { cn } from "@/lib/utils";
import { InstallInstructionsModal } from "./InstallInstructionsModal";

const InstallQRModal = dynamic(
  () => import("./InstallQRModal").then((module) => module.InstallQRModal),
  { ssr: false },
);

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
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "cursor-pointer rounded-full bg-main px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_0_0_var(--color-main-shadow)] transition-[background-color,box-shadow,transform] duration-150 hover:translate-y-0.5 hover:shadow-[0_2px_0_0_var(--color-main-shadow)] active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--color-main-shadow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main motion-reduce:transition-none",
          className,
        )}
      >
        {state === "standalone" ? "Buka App" : "Install App"}
      </button>

      {modal === "ios" && <InstallInstructionsModal variant="ios" onClose={() => setModal(null)} />}
      {modal === "manual" && <InstallInstructionsModal variant="generic" onClose={() => setModal(null)} />}
      {modal === "qr" && <InstallQRModal onClose={() => setModal(null)} />}
    </>
  );
}
