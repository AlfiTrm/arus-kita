import Link from "next/link";
import { Pencil } from "lucide-react";
import type { DonorProfile } from "../types/donorProfile.types";

export function DonorProfileHeaderCard({ profile }: { profile: DonorProfile }) {
  return (
    <div className="flex items-start gap-3 px-6 pt-6">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-secondary text-lg font-bold text-main">
        {profile.initials}
      </span>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-base font-bold text-black">{profile.name}</h1>
        <p className="truncate text-xs text-black/50">{profile.member_since_text}</p>
        <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-bold text-success">
          🏆 {profile.level.toUpperCase()}
        </span>
      </div>

      <Link
        href="/dashboard/donatur/profil/edit"
        aria-label="Edit profil"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/50 hover:bg-black/3"
      >
        <Pencil size={15} />
      </Link>
    </div>
  );
}
