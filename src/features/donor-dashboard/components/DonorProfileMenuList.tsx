"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, ChevronRight, FileText, HelpCircle, LogOut, UserPlus } from "lucide-react";
import { clearSession } from "@/shared/utils/authSession";

const MENU_ITEMS = [
  { href: "/dashboard/donatur/profil/riwayat", icon: FileText, label: "Kuitansi & riwayat donasi" },
  { href: "/dashboard/donatur/profil/tambah-peran", icon: UserPlus, label: "Tambah peran" },
];

export function DonorProfileMenuList() {
  const router = useRouter();
  const [notifEnabled, setNotifEnabled] = useState(true);

  function handleLogout() {
    clearSession();
    router.push("/login");
  }

  return (
    <div className="mt-4 flex flex-col gap-3 px-6">
      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 border-b border-black/5 px-4 py-3.5 last:border-b-0 hover:bg-black/3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-main">
              <item.icon size={16} />
            </span>
            <span className="flex-1 text-sm font-medium text-black">{item.label}</span>
            <ChevronRight size={16} className="text-black/30" />
          </Link>
        ))}

        <div className="flex items-center gap-3 border-b border-black/5 px-4 py-3.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-main">
            <Bell size={16} />
          </span>
          <span className="flex-1 text-sm font-medium text-black">Notifikasi bukti sampai</span>
          <button
            type="button"
            role="switch"
            aria-checked={notifEnabled}
            onClick={() => setNotifEnabled((v) => !v)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition ${notifEnabled ? "bg-main" : "bg-black/15"}`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                notifEnabled ? "left-5" : "left-0.5"
              }`}
            />
          </button>
        </div>

        <Link
          href="/dashboard/donatur/profil/bantuan"
          className="flex items-center gap-3 px-4 py-3.5 hover:bg-black/3"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-main">
            <HelpCircle size={16} />
          </span>
          <span className="flex-1 text-sm font-medium text-black">Bantuan & privasi data (UU PDP)</span>
          <ChevronRight size={16} className="text-black/30" />
        </Link>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-2xl border border-error/10 bg-error/5 px-4 py-3.5 text-left"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-error/10 text-error">
          <LogOut size={16} />
        </span>
        <span className="text-sm font-semibold text-error">Keluar</span>
      </button>
    </div>
  );
}
