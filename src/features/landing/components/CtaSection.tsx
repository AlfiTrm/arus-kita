import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/shared/components/ScrollReveal";

export function CtaSection() {
  return (
    <section aria-labelledby="closing-title" className="overflow-hidden bg-main text-white">
      <div className="container grid min-h-[min(760px,88svh)] items-center gap-8 py-14 sm:py-20 md:grid-cols-[0.82fr_1.18fr] md:gap-4 lg:min-h-[min(820px,92svh)]">
        <ScrollReveal className="relative z-10 max-w-xl">
          <h2 id="closing-title" className="font-editorial text-4xl font-normal leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Lihat kebutuhan posko di peta.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/85 sm:text-base sm:leading-7">
            Jelajahi daftar yang tersedia, lalu tentukan langkah berikutnya.
          </p>
          <Link
            href="/peta-bencana"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-main-shadow transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
          >
            Jelajahi peta bencana
          </Link>
        </ScrollReveal>

        <ScrollReveal className="min-w-0">
          <Image
            src="/images/landing/illustrations/cta-map-explorer.png"
            alt=""
            width={2172}
            height={724}
            sizes="(max-width: 767px) 92vw, (max-width: 1279px) 58vw, 760px"
            className="mx-auto h-auto w-full max-w-[900px] md:w-[125%] md:max-w-none md:translate-x-0 md:min-w-0 lg:w-[125%] lg:-translate-x-6"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
