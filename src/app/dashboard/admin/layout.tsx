"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AdminBottomNav } from "@/features/admin-dashboard/components/AdminBottomNav";

const FULLSCREEN_ROUTE_PREFIXES = [
  "/dashboard/admin/buat-event",
  "/dashboard/admin/event",
  "/dashboard/admin/order",
];

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isFullscreen = FULLSCREEN_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isFullscreen) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-dvh bg-surface pb-24">
      {children}
      <AdminBottomNav />
    </div>
  );
}
