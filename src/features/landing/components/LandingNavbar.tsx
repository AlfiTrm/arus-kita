"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MapPin, Menu, X } from "lucide-react";
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

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-70 border-b border-black/5 bg-surface md:bg-surface/95 md:backdrop-blur">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-black" onClick={closeMenu}>
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-main text-white">
              <MapPin size={16} />
            </span>
            PIJARNUSA
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isActive
                      ? "border-b-2 border-main pb-1 text-main"
                      : "border-b-2 border-transparent pb-1 text-black/70 hover:text-black"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <InstallButton className="px-5 py-2 text-xs" />
          </div>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="landing-mobile-menu"
            aria-label={isMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            className="relative flex h-12 w-12 touch-manipulation items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-[0_8px_20px_rgba(38,38,38,0.08)] transition hover:border-main/25 hover:text-main md:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div
        id="landing-mobile-menu"
        className={`fixed inset-0 z-[60] bg-surface transition duration-200 md:hidden ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="container flex min-h-dvh flex-col px-4 pt-24 pb-6">
          <div className="rounded-[28px] bg-white p-6 shadow-[0_24px_64px_rgba(38,38,38,0.12)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-main/70">Navigasi</p>

            <nav className="mt-4 flex flex-col">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={
                      isActive
                        ? "rounded-2xl bg-secondary px-4 py-4 text-base font-semibold text-main"
                        : "rounded-2xl px-4 py-4 text-base font-medium text-black/72 hover:bg-black/[0.03] hover:text-black"
                    }
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto rounded-[28px] bg-secondary/55 p-5 shadow-[0_20px_48px_rgba(2,128,144,0.16)]">
            <p className="max-w-xs text-sm font-medium leading-6 text-black">
              Pasang PijarNusa ke layar utama untuk masuk ke mode app dan langsung mulai dari splash screen.
            </p>
            <div className="mt-4">
              <InstallButton className="w-full justify-center px-5 py-3 text-sm" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
