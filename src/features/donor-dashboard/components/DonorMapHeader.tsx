import { Bell } from "lucide-react";

export function DonorMapHeader({ activeCount, urgentCount }: { activeCount: number; urgentCount: number }) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-black/5 bg-surface px-6 py-4">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element -- static local SVG wordmark, no next/image optimization needed */}
        <img src="/icon/aruskita-full.svg" alt="Arus Kita" className="h-5 w-auto" />
        <p className="mt-1 text-xs text-black/50">
          {activeCount} posko aktif{urgentCount > 0 && ` · ${urgentCount} mendesak`}
        </p>
      </div>
      <button
        type="button"
        aria-label="Notifikasi"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-black/60 hover:bg-black/3"
      >
        <Bell size={18} />
      </button>
    </div>
  );
}
