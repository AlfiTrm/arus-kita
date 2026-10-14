"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ScrollReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setElement = useCallback((element: HTMLDivElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;

    if (
      !element ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = element.getBoundingClientRect();
    const elementHeight = bounds.height;
    const visibleHeight = Math.max(
      0,
      Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 0),
    );
    const visibleTarget = Math.min(window.innerHeight * 0.6, elementHeight);

    if (visibleHeight > 0) {
      element.dataset.revealed = "true";
      return;
    }

    const threshold = Math.max(
      0.01,
      Math.min(1, visibleTarget / Math.max(elementHeight, 1)),
    );

    const reveal = () => {
      element.dataset.revealed = "true";
      delete element.dataset.revealPending;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < threshold) return;
        reveal();
        observer.disconnect();
        observerRef.current = null;
      },
      { threshold },
    );

    element.dataset.revealPending = "true";
    observerRef.current = observer;
    observer.observe(element);
  }, []);

  return (
    <div ref={setElement} className={cn("scroll-reveal", className)}>
      {children}
    </div>
  );
}
