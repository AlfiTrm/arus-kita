"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route, Star, User } from "lucide-react";

const TUGAS_HREF = "/dashboard/kurir";
const JEJAK_HREF = "/dashboard/kurir/jejak";
const PROFILE_HREF = "/dashboard/kurir/profil";

export function CourierBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="shrink-0 border-t border-black/5 bg-surface pt-2"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto grid max-w-md grid-cols-3 px-2">
        <NavLink href={TUGAS_HREF} label="Tugas" icon={Route} active={pathname === TUGAS_HREF} />
        <NavLink href={JEJAK_HREF} label="Jejak" icon={Star} active={pathname === JEJAK_HREF} />
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
  icon: typeof Route;
  active: boolean;
}) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 py-1">
      <Icon size={20} className={active ? "text-main" : "text-black/40"} />
      <span className={`text-[11px] font-medium ${active ? "text-main" : "text-black/40"}`}>{label}</span>
    </Link>
  );
}
