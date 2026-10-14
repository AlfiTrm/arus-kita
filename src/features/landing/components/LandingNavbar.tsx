"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { InstallButton } from "@/shared/components/InstallButton";

const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Peta Bencana", href: "/peta-bencana" },
  { label: "Penyaluran", href: "/penyaluran" },
  { label: "Transparansi", href: "/transparansi" },
];

export function LandingNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => {
      menuPanelRef.current?.querySelector<HTMLElement>("[data-menu-first-focus]")?.focus();
    });

    const getFocusableElements = () =>
      Array.from(
        menuPanelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ) ?? [],
      );

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const focusIsInsideMenu = menuPanelRef.current?.contains(document.activeElement) ?? false;

      if (event.shiftKey && (!focusIsInsideMenu || document.activeElement === firstElement)) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && (!focusIsInsideMenu || document.activeElement === lastElement)) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <header id="top" className="sticky top-0 z-9999 border-b border-[#103a32]/8 bg-[#fbfaf6]">
        <div className="container relative flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Arus Kita, beranda"
            className="flex min-h-11 shrink-0 items-center focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- local brand mark is a small SVG asset */}
            <img src="/icon/aruskita-icon.svg" alt="" className="h-8 w-auto object-contain" />
            <span className="ml-2 hidden text-base font-semibold tracking-[-0.03em] text-[#008090] md:inline">
              Arus Kita
            </span>
          </Link>

          <nav
            aria-label="Navigasi utama"
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 lg:flex"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center border-b-2 px-3.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main motion-reduce:transition-none",
                    isActive
                      ? "border-main text-[#103a32]"
                      : "border-transparent text-[#40534d] hover:border-[#103a32]/30 hover:text-main",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto hidden lg:block">
            <InstallButton className="min-h-11 rounded-full px-5 py-2 text-sm" />
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="landing-mobile-menu"
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
            className="ml-auto inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-[#103a32]/18 px-3.5 text-sm font-medium text-[#103a32] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main motion-reduce:transition-none lg:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X size={18} strokeWidth={1.8} /> : <Menu size={18} strokeWidth={1.8} />}
            <span>Menu</span>
          </button>
        </div>
      </header>

      <div
        id="landing-mobile-menu"
        ref={menuPanelRef}
        data-lenis-prevent
        role="dialog"
        aria-modal={isMenuOpen || undefined}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        aria-label="Menu navigasi Arus Kita"
        className={cn(
          "fixed inset-0 z-10000 flex h-[100svh] flex-col overflow-y-auto bg-[#fbfaf6] px-5 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:px-8 lg:hidden",
          isMenuOpen ? "visible translate-x-0 opacity-100" : "invisible translate-x-full opacity-0",
        )}
      >
        <div className="container flex min-h-16 w-full items-center justify-between border-b border-[#103a32]/10">
          <Link
            href="/"
            aria-label="Arus Kita, beranda"
            data-menu-first-focus
            onClick={closeMenu}
            className="flex min-h-11 items-center focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- local brand mark is a small SVG asset */}
            <img src="/icon/aruskita-icon.svg" alt="" className="h-8 w-auto object-contain" />
            <span className="ml-2 hidden text-base font-semibold tracking-[-0.03em] text-[#008090] md:inline">
              Arus Kita
            </span>
          </Link>
          <button
            type="button"
            onClick={() => {
              closeMenu();
              menuButtonRef.current?.focus();
            }}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#103a32]/18 px-4 text-sm font-medium text-[#103a32] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main motion-reduce:transition-none"
          >
            <X size={17} aria-hidden="true" />
            Tutup
          </button>
        </div>

        <div className="container flex w-full flex-1 flex-col py-8">
          <h2 className="font-editorial text-3xl font-normal tracking-[-0.03em] text-[#262626] sm:text-4xl">
            Pilih halaman.
          </h2>

          <nav aria-label="Halaman Arus Kita" className="mt-6 flex flex-col">
            {NAV_LINKS.map((link, index) => {
              const isActive = pathname === link.href;

              return (
                <div
                  key={link.href}
                  className={cn(
                    "translate-y-2 opacity-0 transition-[opacity,transform] duration-300 motion-reduce:transition-none",
                    isMenuOpen && "translate-y-0 opacity-100",
                  )}
                  style={{ transitionDelay: isMenuOpen ? `${90 + index * 55}ms` : "0ms" }}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={closeMenu}
                    className={cn(
                      "group flex min-h-[4.5rem] items-center justify-between border-b border-[#103a32]/12 py-3 text-[1.35rem] tracking-[-0.025em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main sm:text-2xl",
                      isActive
                        ? "font-semibold text-main"
                        : "font-medium text-[#103a32] hover:text-main",
                    )}
                  >
                    <span>{link.label}</span>
                    <span className="flex items-center gap-3 text-sm font-normal text-[#789087]">
                      <span>0{index + 1}</span>
                      <ArrowUpRight
                        size={18}
                        className="opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="mt-auto pt-8">
            {isMenuOpen && <InstallButton className="min-h-12 w-full justify-center rounded-full px-5 py-3 text-sm" />}
          </div>
        </div>
      </div>
    </>
  );
}
