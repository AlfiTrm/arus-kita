import { TrackingRouteIllustration } from "./LandingIllustrations";
import { ScrollReveal } from "@/shared/components/ScrollReveal";

const MILESTONES = [
  {
    time: "09.10",
    title: "Daftar kebutuhan dibuat",
    detail: "Posko Trienggadeng · paket pangan",
  },
  {
    time: "09.42",
    title: "Pesanan diteruskan",
    detail: "12 paket disiapkan toko mitra",
  },
  {
    time: "10.30",
    title: "Barang diserahkan",
    detail: "12 paket dibawa relawan",
  },
  {
    time: "11.05",
    title: "Penerimaan dikonfirmasi",
    detail: "Penerimaan di Posko Trienggadeng",
  },
];

export function TrackingSection() {
  return (
    <section id="jejak-penyaluran" aria-labelledby="tracking-title" className="scroll-mt-16 bg-[#f7f8f1] py-16 sm:py-20 lg:py-24">
      <div className="container grid gap-10 md:grid-cols-[0.78fr_1.22fr] md:items-center md:gap-16">
        <div className="max-w-md">
          <ScrollReveal>
            <h2 id="tracking-title" className="font-editorial text-4xl font-normal leading-tight tracking-[-0.025em] sm:text-5xl">
              Satu pesanan. Catatan yang lengkap.
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="mt-5 text-base leading-7 text-black/65">
              Riwayatnya menunjukkan waktu, tahap, dan pihak yang mencatat.
            </p>
          </ScrollReveal>
        </div>

        <div className="border border-[#103a32]/15 bg-[#fbfaf6] p-5 sm:p-8 lg:p-9">
          <div className="border-b border-black/10 pb-5">
            <ScrollReveal>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-black">Paket pangan</h3>
                  <p className="mt-1 text-sm text-black/60">Untuk Posko Trienggadeng</p>
                </div>
                <span className="border border-main/30 px-3 py-1.5 text-xs font-medium text-main-shadow">No. AK-024</span>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-5 border-b border-black/10 bg-[#eef4e3] px-3 py-2 sm:px-5 sm:py-3">
            <ScrollReveal>
              <TrackingRouteIllustration className="h-auto w-full" />
            </ScrollReveal>
          </div>

          <ol className="pt-5" aria-label="Riwayat pesanan">
            {MILESTONES.map((milestone) => (
              <li key={milestone.title} className="border-b border-black/10 py-4 last:border-b-0">
                <ScrollReveal>
                  <div className="grid grid-cols-[3.25rem_1fr] gap-3 sm:grid-cols-[4rem_1fr] sm:gap-4">
                    <span
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-main/30 bg-[#fbfaf6] font-editorial text-xs text-main"
                    >
                      {milestone.time}
                    </span>
                    <div className="pt-0.5">
                      <h4 className="text-sm font-semibold text-black sm:text-base">{milestone.title}</h4>
                      <p className="mt-1 text-xs leading-5 text-black/60 sm:text-sm">{milestone.detail}</p>
                    </div>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
