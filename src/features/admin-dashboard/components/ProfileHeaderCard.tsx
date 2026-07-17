import { Check } from "lucide-react";
import type { AdminProfile } from "../types/adminProfile.types";

const DISPLAY_ROLE_LABELS: Record<string, string> = {
  admin_posko: "Admin Posko",
};

export function ProfileHeaderCard({ profile }: { profile: AdminProfile }) {
  const roleLabel = DISPLAY_ROLE_LABELS[profile.display_role] ?? profile.display_role;

  return (
    <div className="flex items-center gap-3 px-6 pt-6">
      <div className="relative shrink-0">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-lg font-bold text-main">
          {profile.initials}
        </span>
        {profile.is_verified && (
          <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-success text-white ring-2 ring-surface">
            <Check size={12} />
          </span>
        )}
      </div>

      <div className="min-w-0">
        <h1 className="truncate text-base font-bold text-black">{profile.name}</h1>
        <p className="truncate text-xs text-black/50">
          {roleLabel} · {profile.affiliation}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span
            className={`flex items-center gap-1 text-xs font-semibold ${
              profile.is_verified ? "text-success" : "text-warning"
            }`}
          >
            <Check size={12} /> {profile.verification_text}
          </span>
          <span className="text-xs font-medium text-black/40">{profile.successful_events_text}</span>
        </div>
      </div>
    </div>
  );
}
