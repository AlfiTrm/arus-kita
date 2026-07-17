"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Eye, Heart, MapPin, Star, User } from "lucide-react";
import PressButton from "@/shared/components/PressButton";

const MAP_HREF = "/dashboard/donatur";
const TRANSPARENCY_HREF = "/dashboard/donatur/transparansi";
const DONATION_HREF = "/dashboard/donatur/donasi";
const POIN_HREF = "/dashboard/donatur/poin";
const PROFILE_HREF = "/dashboard/donatur/profil";

export function DonorBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav
      className="shrink-0 border-t border-black/5 bg-surface pt-2"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="relative mx-auto grid max-w-md grid-cols-5 items-end px-2">
        <NavLink href={MAP_HREF} label="Peta" icon={MapPin} active={pathname === MAP_HREF} />
        <NavLink
          href={TRANSPARENCY_HREF}
          label="Transparansi"
          icon={Eye}
          active={pathname === TRANSPARENCY_HREF}
        />

        <div className="-mt-8 flex flex-col items-center gap-1">
          <PressButton
            variant="primary"
            onClick={() => router.push(DONATION_HREF)}
            className="flex h-14 w-14 items-center justify-center p-0 shadow-lg"
            aria-label="Donasi"
          >
            <Heart size={20} fill="currentColor" />
          </PressButton>
          <span className={`text-[11px] font-medium ${pathname === DONATION_HREF ? "text-main" : "text-black/40"}`}>
            Donasi
          </span>
        </div>

        <NavLink href={POIN_HREF} label="Poin" icon={Star} active={pathname === POIN_HREF} />
        <NavLink href={PROFILE_HREF} label="Profil" icon={User} active={pathname === PROFILE_HREF} />
      </div>
    </nav>
  );
}

function NavLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: typeof MapPin;
  active: boolean;
}) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 py-1">
      <Icon size={20} className={active ? "text-main" : "text-black/40"} />
      <span className={`text-[11px] font-medium ${active ? "text-main" : "text-black/40"}`}>{label}</span>
    </Link>
  );
}
