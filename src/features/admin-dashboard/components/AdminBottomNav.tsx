"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Camera, Home, User } from "lucide-react";
import PressButton from "@/shared/components/PressButton";

const HOME_HREF = "/dashboard/admin";
const CREATE_EVENT_HREF = "/dashboard/admin/buat-event";
const PROFILE_HREF = "/dashboard/admin/profil";

export function AdminBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-surface pt-2"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="relative mx-auto flex max-w-md items-end justify-around px-6">
        <Link href={HOME_HREF} className="flex flex-col items-center gap-1 py-1">
          <Home size={22} className={pathname === HOME_HREF ? "text-main" : "text-black/40"} />
          <span className={`text-[11px] font-medium ${pathname === HOME_HREF ? "text-main" : "text-black/40"}`}>
            Home
          </span>
        </Link>

        <div className="-mt-12 flex flex-col items-center gap-1">
          <PressButton
            variant="primary"
            onClick={() => router.push(CREATE_EVENT_HREF)}
            className="flex h-18 w-18 items-center justify-center p-0 shadow-lg"
            aria-label="Buat Event"
          >
            <Camera size={28} />
          </PressButton>
          <span
            className={`text-[11px] font-medium ${
              pathname === CREATE_EVENT_HREF ? "text-main" : "text-black/40"
            }`}
          >
            Buat Event
          </span>
        </div>

        <Link href={PROFILE_HREF} className="flex flex-col items-center gap-1 py-1">
          <User size={22} className={pathname === PROFILE_HREF ? "text-main" : "text-black/40"} />
          <span className={`text-[11px] font-medium ${pathname === PROFILE_HREF ? "text-main" : "text-black/40"}`}>
            Profil
          </span>
        </Link>
      </div>
    </nav>
  );
}
