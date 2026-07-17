"use client";

import { Bell, Check, Clock } from "lucide-react";

export function AdminHomeHeader({
  name,
  verificationText,
  isVerified,
  isLoading,
}: {
  name: string;
  verificationText: string;
  isVerified: boolean;
  isLoading: boolean;
}) {
  const firstName = name.split(" ")[0] || "Admin";
  const StatusIcon = isVerified ? Check : Clock;

  return (
    <div className="flex items-center justify-between px-6 pt-6">
      <div>
        <h1 className="text-lg font-bold text-black">
          Halo, <span className="text-main">{isLoading ? "..." : firstName}</span>
        </h1>
        {!isLoading && (
          <p
            className={`mt-0.5 flex items-center gap-1 text-xs font-semibold ${
              isVerified ? "text-success" : "text-warning"
            }`}
          >
            <StatusIcon size={13} /> {verificationText}
          </p>
        )}
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
