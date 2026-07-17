"use client";

import { Bell, Bike, Check, HelpCircle, LogOut, MapPin, ShieldCheck, Star, User } from "lucide-react";
import { useLogout } from "@/shared/hooks/useLogout";
import type { CourierProfileData } from "../types/courierProfile.types";

function MenuRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Bike;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-black/5 px-4 py-3.5 last:border-b-0">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-main">
        <Icon size={16} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-black">{label}</p>
        <p className="mt-0.5 truncate text-xs text-black/50">{value}</p>
      </div>
    </div>
  );
}

export function CourierProfileView({ profile }: { profile: CourierProfileData }) {
  const { logout, isLoggingOut } = useLogout();

  return (
    <div className="pb-8">
      <div className="flex items-center gap-3 px-6 pt-6">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-secondary text-lg font-bold text-main">
          {profile.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-bold text-black">{profile.name}</p>
          <p className="truncate text-xs text-black/50">Relawan Kurir · {profile.operational_area}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {profile.is_verified && (
              <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
                <Check size={10} /> {profile.verification_text}
              </span>
            )}
            {profile.reputation_score > 0 && (
              <span className="flex items-center gap-1 rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-bold text-warning">
                <Star size={10} fill="currentColor" /> {profile.reputation_score.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mx-6 mt-4 rounded-2xl border border-black/5 bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-black">Siap menerima tugas</p>
            <p className="mt-0.5 text-xs text-black/50">Notifikasi broadcast aktif · lokasi dibagikan saat bertugas</p>
          </div>
          <span
            aria-hidden="true"
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${profile.is_available ? "bg-main" : "bg-black/15"}`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                profile.is_available ? "left-5" : "left-0.5"
              }`}
            />
          </span>
        </div>
      </div>

      <div className="mx-6 mt-4 overflow-hidden rounded-2xl border border-black/5 bg-white">
        <MenuRow icon={Bike} label="Kendaraan" value={profile.vehicle_text} />
        <MenuRow icon={MapPin} label="Wilayah operasi" value={profile.operation_area_text} />
        <MenuRow
          icon={User}
          label="Data diri & verifikasi"
          value={`${profile.verification_text}${profile.waiver_accepted ? " · Waiver disetujui" : ""}`}
        />
        <MenuRow icon={Star} label="Poin kebaikan" value={profile.active_points_text} />

        <div className="flex items-center gap-3 border-b border-black/5 px-4 py-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-main">
            <Bell size={16} />
          </span>
          <span className="flex-1 text-sm font-semibold text-black">Notifikasi tugas mendesak</span>
          <span
            aria-hidden="true"
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${
              profile.urgent_task_notification_enabled ? "bg-main" : "bg-black/15"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                profile.urgent_task_notification_enabled ? "left-5" : "left-0.5"
              }`}
            />
          </span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-main">
            <HelpCircle size={16} />
          </span>
          <span className="flex-1 text-sm font-semibold text-black">Bantuan & lapor insiden</span>
        </div>
      </div>

      <div className="mx-6 mt-4 flex items-start gap-2 rounded-2xl bg-secondary/50 px-4 py-3 text-xs leading-5 text-black/70">
        <ShieldCheck size={16} className="mt-0.5 shrink-0 text-main" />
        Setiap serah terima Anda tercatat di rantai kustodi — bukti objektif bila terjadi tuduhan.
      </div>

      <button
        type="button"
        onClick={logout}
        disabled={isLoggingOut}
        className="mx-6 mt-4 flex items-center gap-3 rounded-2xl border border-error/10 bg-error/5 px-4 py-3.5 text-left disabled:opacity-60"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-error/10 text-error">
          <LogOut size={16} />
        </span>
        <span className="text-sm font-semibold text-error">{isLoggingOut ? "Keluar..." : "Keluar"}</span>
      </button>
    </div>
  );
}
