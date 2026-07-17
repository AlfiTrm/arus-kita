"use client";

import dynamic from "next/dynamic";

const CrisisMap = dynamic(() => import("./CrisisMap").then((mod) => mod.CrisisMap), {
  ssr: false,
});

export function CrisisMapLoader() {
  return <CrisisMap />;
}
