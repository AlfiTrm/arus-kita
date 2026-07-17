import type { DonorProfile } from "../types/donorProfile.types";

export function DonorStatsBar({ profile }: { profile: DonorProfile }) {
  return (
    <div className="mx-6 mt-4 flex items-center justify-between rounded-2xl bg-main px-5 py-4 text-white">
      <div className="text-center">
        <p className="text-base font-bold">{profile.total_donated_amount_text}</p>
        <p className="text-[11px] text-white/70">Total tersalurkan</p>
      </div>
      <div className="h-8 w-px bg-white/20" />
      <div className="text-center">
        <p className="text-base font-bold">{profile.supported_post_count}</p>
        <p className="text-[11px] text-white/70">Posko dibantu</p>
      </div>
      <div className="h-8 w-px bg-white/20" />
      <div className="text-center">
        <p className="text-base font-bold">{profile.active_points.toLocaleString("id-ID")}</p>
        <p className="text-[11px] text-white/70">Poin aktif</p>
      </div>
    </div>
  );
}
