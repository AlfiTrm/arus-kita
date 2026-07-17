import Link from "next/link";
import { Check } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import { HeroMapPreview } from "./HeroMapPreview";

const STATS = [
  { value: "Rp4,2 M", label: "tersalurkan & terverifikasi" },
  { value: "1.284", label: "pesanan terbukti sampai" },
  { value: "92%", label: "verified fulfillment" },
  { value: "<24 jam", label: "median dana → barang tiba" },
];

export function HeroSection() {
  return (
    <section className="container py-16">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-black lg:text-5xl">
            Donasi yang <span className="text-main">terbukti sampai</span>, bukan sekadar terkirim.
          </h1>
          <p className="mt-5 max-w-md text-black/60">
            PijarNusa mengunci donasi Anda ke pesanan barang nyata di toko lokal dekat bencana — diantar
            relawan, diverifikasi foto &amp; GPS, dan tercatat di ledger yang bisa diaudit siapa pun.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PressButton variant="primary">Mulai Berdonasi</PressButton>
            <Link href="/peta-bencana">
              <PressButton variant="outline" className="w-full">
                Lihat Peta Bencana
              </PressButton>
            </Link>
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-sm text-black/50">
            <Check size={16} className="text-success" />
            Tanpa unduh aplikasi — buka di browser, pasang sebagai PWA di layar utama
          </p>
        </div>

        <HeroMapPreview />
      </div>

      <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-black/5 pt-10 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <dt className="text-2xl font-bold text-main">{stat.value}</dt>
            <dd className="mt-1 text-sm text-black/50">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
