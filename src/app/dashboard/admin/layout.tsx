"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AdminBottomNav } from "@/features/admin-dashboard/components/AdminBottomNav";

const FULLSCREEN_ROUTE_PREFIX = "/dashboard/admin/buat-event";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isFullscreen = pathname.startsWith(FULLSCREEN_ROUTE_PREFIX);

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
