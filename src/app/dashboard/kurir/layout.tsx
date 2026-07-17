"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CourierBottomNav } from "@/features/courier-dashboard/components/CourierBottomNav";

const HIDE_NAV_PREFIXES = ["/dashboard/kurir/antar"];

export default function CourierDashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideNav = HIDE_NAV_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-surface">
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      {!hideNav && <CourierBottomNav />}
    </div>
  );
}
