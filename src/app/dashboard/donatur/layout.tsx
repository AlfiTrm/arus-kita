"use client";

import { Suspense, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { DonorBottomNav } from "@/features/donor-dashboard/components/DonorBottomNav";

const HIDE_NAV_PREFIXES = ["/dashboard/donatur/posko"];

function DonorBottomNavGate() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isDonationFlow = pathname === "/dashboard/donatur/donasi" && Boolean(searchParams.get("postId"));
  const hideNav = isDonationFlow || HIDE_NAV_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  return hideNav ? null : <DonorBottomNav />;
}

export default function DonorDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-surface">
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      <Suspense fallback={null}>
        <DonorBottomNavGate />
      </Suspense>
    </div>
  );
}
