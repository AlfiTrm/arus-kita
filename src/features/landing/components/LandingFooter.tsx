import Link from "next/link";

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
          {/* eslint-disable-next-line @next/next/no-img-element -- static local SVG mark, no next/image optimization needed */}
          <img src="/icon/aruskita-icon.svg" alt="" className="h-5 w-auto" />
          <span className="font-semibold text-black">Arus Kita</span>
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
