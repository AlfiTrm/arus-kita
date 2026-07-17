import PressButton from "@/shared/components/PressButton";

export function CtaSection() {
  return (
    <section className="container py-16">
      <div className="rounded-3xl bg-main px-8 py-10 md:flex md:items-center md:justify-between md:gap-8">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold leading-snug text-white md:text-3xl">
            Nyalakan pijar untuk yang terdampak — hari ini.
          </h2>
          <p className="mt-2 text-sm text-white/80">
            Berdonasi, membuka posko, menjadi toko mitra, atau mengantar sebagai relawan — semua dari satu
            PWA.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
          <PressButton variant="secondary">Gunakan Arus Kita</PressButton>
          <PressButton variant="outlineInverse">Daftar sebagai Mitra</PressButton>
        </div>
      </div>
    </section>
  );
}
