import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Peta Bencana", href: "/peta-bencana" },
  { label: "Penyaluran", href: "/penyaluran" },
  { label: "Transparansi", href: "/transparansi" },
];

export function LandingFooter() {
  return (
    <footer className="overflow-hidden bg-[#eff4e8] text-[#103a32]">
      <div className="container py-8 sm:py-9">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2.5">
              <Image
                src="/icon/aruskita-icon.svg"
                alt=""
                width={541}
                height={250}
                unoptimized
                className="h-8 w-auto"
              />
              <span className="text-lg font-semibold tracking-[-0.03em] text-[#008090]">
                Arus Kita
              </span>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[#103a32]/75">
              Platform logistik bantuan bencana.
            </p>
          </div>

          <nav
            aria-label="Navigasi footer"
            className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-2 md:justify-end"
          >
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 w-fit items-center text-[#103a32] transition-colors hover:text-main hover:underline hover:decoration-main hover:underline-offset-4 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main motion-reduce:transition-none"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-1 text-xs text-[#103a32]/70 sm:text-sm">
          <p>© {new Date().getFullYear()} Arus Kita</p>
          <Link
            href="#top"
            className="inline-flex min-h-11 items-center text-[#103a32] transition-colors hover:text-main hover:underline hover:decoration-main hover:underline-offset-4 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main motion-reduce:transition-none"
          >
            Kembali ke atas
          </Link>
        </div>
      </div>
    </footer>
  );
}
