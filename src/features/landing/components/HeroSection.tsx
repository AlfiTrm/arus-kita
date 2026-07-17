import Link from "next/link";
import PressButton from "@/shared/components/PressButton";
import { AnimatedStat } from "./AnimatedStat";
import { HeroMapPreviewLoader } from "./HeroMapPreviewLoader";

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
            Arus Kita mengunci donasi Anda ke pesanan barang nyata di toko lokal dekat bencana — diantar
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
        </div>

        <HeroMapPreviewLoader />
      </div>

      <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-black/5 pt-10 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <AnimatedStat key={stat.label} value={stat.value} label={stat.label} delayMs={i * 100} />
        ))}
      </dl>
    </section>
  );
}
