import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/shared/components/ScrollReveal";

const DESTINATIONS = [
  {
    href: "/peta-bencana",
    title: "Kebutuhan posko",
    description: "Temukan daftar kebutuhan yang dicatat posko.",
    image: "/images/landing/illustrations/explore-map.png",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    href: "/penyaluran",
    title: "Catatan penyaluran",
    description: "Lihat tahapan pada setiap pesanan bantuan.",
    image: "/images/landing/illustrations/explore-delivery.png",
    imageWidth: 1254,
    imageHeight: 1254,
  },
  {
    href: "/transparansi",
    title: "Ringkasan transparansi",
    description: "Baca ringkasan dan sumber data yang ditampilkan.",
    image: "/images/landing/illustrations/explore-transparency.png",
    imageWidth: 1536,
    imageHeight: 1024,
  },
];

export function ExploreSection() {
  return (
    <section aria-labelledby="explore-title" className="bg-[#fbfaf6] py-16 sm:py-20 lg:py-24">
      <div className="container">
        <div className="max-w-2xl">
          <ScrollReveal>
            <h2 id="explore-title" className="font-editorial text-4xl font-normal leading-tight tracking-[-0.025em] sm:text-5xl">
              Pilih yang ingin kamu telusuri.
            </h2>
          </ScrollReveal>
        </div>

        <ul className="mt-8 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-7" aria-label="Halaman publik Arus Kita">
          {DESTINATIONS.map(({ href, title, description, image, imageWidth, imageHeight }) => (
            <li key={href} className="group min-w-0 border-t border-black/15">
              <Link
                href={href}
                className="block min-h-full py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main motion-reduce:transition-none"
              >
                <ScrollReveal>
                  <Image
                    src={image}
                    alt=""
                    width={imageWidth}
                    height={imageHeight}
                    sizes="(max-width: 767px) 88vw, 30vw"
                    className="mx-auto h-[190px] w-full object-contain sm:h-[220px]"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-[#103a32] transition-colors group-hover:text-main motion-reduce:transition-none sm:text-xl">{title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-black/65">{description}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-main underline decoration-main/40 underline-offset-4 group-hover:decoration-main">
                    Buka halaman <span aria-hidden="true">→</span>
                  </span>
                </ScrollReveal>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
