"use client";

import dynamic from "next/dynamic";
import { LoaderCircle } from "lucide-react";

const CrisisMap = dynamic(() => import("./CrisisMap").then((mod) => mod.CrisisMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[24rem] flex-col bg-[#fbfaf6]">
      <div className="flex min-h-14 items-center gap-3 border-b border-[#103a32]/10 px-4 sm:px-6">
        <div className="h-11 flex-1 rounded-full border border-[#103a32]/12 bg-white" />
      </div>
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-0 flex-1 items-center justify-center bg-[#e7f0e0] px-6 text-center text-sm text-[#40534d]"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-[#fbfaf6]/90 px-4 py-3">
          <LoaderCircle size={16} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
          Menyiapkan peta posko…
        </span>
      </div>
    </div>
  ),
});

export function CrisisMapLoader() {
  return <CrisisMap />;
}
