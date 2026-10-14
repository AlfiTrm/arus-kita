import Image from "next/image";
import { ScrollReveal } from "@/shared/components/ScrollReveal";

const SAMPLE_NEEDS = ["Air minum", "Paket makanan", "Selimut"];

export function NeedsSection() {
  return (
    <section id="kebutuhan" aria-labelledby="needs-title" className="bg-[#fbfaf6] py-16 sm:py-20 lg:py-24">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <ScrollReveal>
            <h2 id="needs-title" className="font-editorial text-4xl font-normal leading-tight tracking-[-0.025em] sm:text-5xl">
              Yang dibutuhkan posko.
            </h2>
          </ScrollReveal>
        </div>

        <div className="mx-auto mt-8 max-w-[1000px] sm:mt-10 lg:mt-12">
          <ScrollReveal>
            <Image
              src="/images/landing/illustrations/supply-examples.png"
              alt=""
              width={2172}
              height={724}
              sizes="(max-width: 1023px) 90vw, 1000px"
              className="h-auto w-full"
            />
          </ScrollReveal>
        </div>

        <ul className="mt-3 grid grid-cols-3 border-t border-black/15" aria-label="Barang bantuan">
          {SAMPLE_NEEDS.map((item) => (
            <li key={item} className="border-b border-black/15 py-4 text-center text-sm font-medium text-[#103a32] sm:py-5 sm:text-base">
              <ScrollReveal>{item}</ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
