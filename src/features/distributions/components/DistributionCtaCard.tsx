import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function DistributionCtaCard() {
  return (
    <section className="grid gap-6 border-y border-[#103a32]/12 bg-[#edf2e4] px-5 py-8 sm:grid-cols-[1fr_auto] sm:items-center sm:px-8 sm:py-10">
      <div className="max-w-2xl">
        <h2 className="font-editorial text-3xl font-normal leading-tight tracking-[-0.03em] text-[#262626] sm:text-4xl">
          Cari kebutuhan berdasarkan lokasi.
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#40534d] sm:text-base">
          Bandingkan lokasi, jenis bencana, dan kebutuhan tiap posko.
        </p>
      </div>
      <Link
        href="/peta-bencana"
        className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full bg-main px-5 text-sm font-semibold text-white transition-colors hover:bg-main-shadow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main motion-reduce:transition-none"
      >
        Buka peta
        <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
    </section>
  );
}
