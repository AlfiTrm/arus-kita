import Image from "next/image";
import { ScrollReveal } from "@/shared/components/ScrollReveal";

const STEPS = [
  {
    title: "Posko mencatat kebutuhan",
    description: "Barang dan jumlahnya menjadi awal pengadaan.",
    image: "/images/landing/illustrations/process-recording.png",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    title: "Toko lokal menyiapkan pesanan",
    description: "Barang dikemas mengikuti daftar posko.",
    image: "/images/landing/illustrations/process-packing.png",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    title: "Barang diterima di posko",
    description: "Posko mencatat paket saat barang tiba.",
    image: "/images/landing/illustrations/process-arrival.png",
    imageWidth: 1536,
    imageHeight: 1024,
  },
];

export function ProcessSection() {
  return (
    <section id="cara-kerja" aria-labelledby="process-title" className="scroll-mt-16 bg-[#f2f6e8] lg:min-h-[100svh]">
      <div className="container flex flex-col justify-center py-16 sm:py-20 lg:min-h-[100svh] lg:py-24">
        <ScrollReveal>
          <h2
            id="process-title"
            className="mx-auto max-w-4xl text-center font-editorial text-4xl font-normal leading-tight tracking-[-0.025em] sm:text-5xl lg:text-6xl"
          >
            Dari catatan posko sampai barang diterima.
          </h2>
        </ScrollReveal>

        <ol className="mt-10 grid gap-10 sm:mt-14 md:grid-cols-3 md:gap-7 lg:mt-16" aria-label="Tiga tahap penyaluran bantuan">
          {STEPS.map(({ title, description, image, imageWidth, imageHeight }, index) => (
            <li key={title} className="min-w-0">
              <ScrollReveal>
                <div className="mx-auto max-w-[390px]">
                  <span className="mb-1 block pl-2 font-editorial text-2xl text-main/75" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <div className="flex h-[230px] items-center justify-center sm:h-[275px]">
                    <Image
                      src={image}
                      alt=""
                      width={imageWidth}
                      height={imageHeight}
                      sizes="(max-width: 767px) 88vw, 30vw"
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
                <div className="mx-auto mt-5 max-w-[390px] border-t border-main/25 pt-4 md:mt-6">
                  <h3 className="text-lg font-semibold text-[#103a32] sm:text-xl">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-black/65">{description}</p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
