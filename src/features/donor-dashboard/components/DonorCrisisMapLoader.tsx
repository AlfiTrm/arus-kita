"use client";

import dynamic from "next/dynamic";
import type { DonorDashboardMapData } from "../types/donorMap.types";

const DonorCrisisMap = dynamic(() => import("./DonorCrisisMap").then((mod) => mod.DonorCrisisMap), {
  ssr: false,
});

export function DonorCrisisMapLoader({
  data,
  error,
}: {
  data: DonorDashboardMapData | null;
  error: string | null;
}) {
  return <DonorCrisisMap data={data} error={error} />;
}
