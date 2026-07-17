import { PackageX, ShieldAlert, Wallet } from "lucide-react";

const PROBLEMS = [
  {
    icon: Wallet,
    title: "Dana tunai tak terlacak",
    description: (
      <>
        Donasi tunai berpindah tangan tanpa jejak. Di Arus Kita,{" "}
        <strong className="font-semibold text-black">dana dikunci ke pesanan barang</strong> — tak pernah
        jadi tunai di tangan siapa pun.
      </>
    ),
  },
  {
    icon: ShieldAlert,
    title: "Posko fiktif & penipuan",
    description: (
      <>
        Admin posko <strong className="font-semibold text-black">diverifikasi identitas & afiliasi</strong>,
        dipantau flag komunitas, dan ditinjau tim Trust & Safety dengan SLA ketat.
      </>
    ),
  },
  {
    icon: PackageX,
    title: "Logistik kacau, barang menumpuk",
    description: (
      <>
        Kebutuhan riil posko dipesan ke{" "}
        <strong className="font-semibold text-black">toko lokal terdekat</strong> & diantar relawan —
        barang yang tepat, di tempat yang tepat, ekonomi lokal ikut pulih.
      </>
    ),
  },
];

export function ProblemSection() {
  return (
    <section className="container py-16">
      <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold leading-tight text-black">
        Donasi bencana sering hilang di tengah jalan. Kami menutup celahnya.
      </h2>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {PROBLEMS.map((item) => (
          <div key={item.title} className="rounded-2xl border border-black/5 bg-secondary/30 p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-main">
              <item.icon size={20} />
            </span>
            <h3 className="mt-4 font-semibold text-black">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-black/60">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
