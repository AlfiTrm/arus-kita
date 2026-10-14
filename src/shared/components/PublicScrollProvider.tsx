"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export function PublicScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      stopInertiaOnNavigate: true,
      respectReducedMotion: true,
    });

    return () => lenis.destroy();
  }, []);

  return children;
}
