import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function HeroSection({ editorialFontClassName }: { editorialFontClassName: string }) {
  return (
    <section
      aria-labelledby="home-title"
      className="relative isolate h-[calc(100svh-4rem)] min-h-[31rem] overflow-hidden bg-[#fbfaf6]"
    >
      <div className="container relative z-10 flex h-full flex-col items-center pt-[clamp(4rem,18svh,7rem)] pb-[max(55vw,13rem)] text-center sm:pt-[clamp(5rem,16svh,10rem)] sm:pb-[clamp(20rem,33vw,35rem)]">
        <div className="hero-copy-enter flex w-full flex-col items-center">
          <h1
            id="home-title"
            className={cn(
              editorialFontClassName,
              "max-w-[900px] text-[clamp(2rem,8.5vw,3rem)] font-normal leading-[1.02] tracking-[-0.04em] text-[#262626] sm:text-[clamp(3.5rem,5.3vw,5rem)]",
            )}
          >
            <span className="block">Bantuan berawal dari</span>
            <span className="block text-main">kebutuhan posko.</span>
          </h1>
          <p className="mt-3 max-w-[620px] text-[0.8125rem] leading-5 text-black/70 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
            Ikuti bantuan dari pengadaan hingga tiba di posko.
          </p>

          <div className="mt-4 flex w-full max-w-[440px] flex-col gap-2.5 sm:mt-7 sm:flex-row sm:justify-center sm:gap-3">
            <Link
              href="/peta-bencana"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-main px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-main-shadow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main motion-reduce:transition-none sm:min-h-12 sm:py-3 sm:whitespace-nowrap"
            >
              Lihat peta bencana
            </Link>
            <Link
              href="#cara-kerja"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/15 bg-white/75 px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:border-main/50 hover:text-main focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main motion-reduce:transition-none sm:min-h-12 sm:py-3 sm:whitespace-nowrap"
            >
              Pelajari alurnya
            </Link>
          </div>
        </div>

      </div>

      <div className="absolute inset-x-0 bottom-0 block aspect-[4/3] max-h-[48svh] w-full sm:h-[clamp(20rem,33vw,35rem)] sm:max-h-none sm:aspect-auto">
        <picture className="relative block h-full w-full">
          <source
            media="(min-width: 640px)"
            srcSet="/images/landing/relief-panorama-flat.webp"
            type="image/webp"
          />
          <Image
            src="/images/landing/relief-journey-flat.webp"
            alt="Ilustrasi alur bantuan dari toko lokal menuju relawan dan posko"
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="object-contain object-bottom"
          />
        </picture>
      </div>
    </section>
  );
}
