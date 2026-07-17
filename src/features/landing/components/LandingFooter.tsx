import Link from "next/link";
import { MapPin } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
  { label: "Syarat Layanan", href: "/syarat-layanan" },
  { label: "Laporan Audit", href: "/laporan-audit" },
  { label: "Kontak", href: "/kontak" },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-black/5 bg-surface">
      <div className="container flex flex-col items-center gap-4 py-5 text-sm md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-main text-white">
            <MapPin size={13} />
          </span>
          <span className="font-semibold text-black">PijarNusa</span>
          <span className="text-black/50">© 2026 · Terdaftar &amp; patuh UU PDP 27/2022</span>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-black/60">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-black">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
