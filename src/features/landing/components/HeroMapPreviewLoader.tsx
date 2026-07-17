"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const HeroMapPreview = dynamic(() => import("./HeroMapPreview").then((mod) => mod.HeroMapPreview), {
  ssr: false,
  loading: () => <Skeleton className="aspect-4/3 w-full rounded-2xl" />,
});

export function HeroMapPreviewLoader() {
  return <HeroMapPreview />;
}
