"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- gating on document.body, unavailable during SSR
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
}
