import { Camera, Link2, Lock, WifiOff } from "lucide-react";

const FEATURES = [
  {
    icon: Lock,
    title: "Dana terkunci ke barang",
    description: "100% donasi menjadi pesanan barang. Target tak tercapai 7 hari? Refund otomatis ke saldo Anda.",
  },
  {
    icon: Link2,
    title: "Rantai kustodi QR",
    description:
      "Setiap perpindahan barang toko → kurir → posko disegel scan QR dinamis dan hash ledger yang tak bisa diubah.",
  },
  {
    icon: Camera,
    title: "Bukti foto + geofence",
    description:
      "Pesanan selesai hanya lewat kamera langsung di dalam radius posko — foto galeri & lokasi palsu ditolak sistem.",
  },
  {
    icon: WifiOff,
    title: "Tetap jalan saat sinyal putus",
    description:
      "PWA offline-first: aksi tersimpan lokal dan tersinkron otomatis dengan timestamp asli begitu koneksi pulih.",
  },
];

export function TrustSection() {
  return (
    <section className="bg-black py-16">
      <div className="container">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-main">Keunggulan</p>
        <h2 className="mt-2 text-center text-3xl font-bold text-white">Empat lapis kepercayaan</h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {FEATURES.map((item) => (
            <div key={item.title} className="flex gap-4 rounded-2xl bg-white/5 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-main/20 text-main">
                <item.icon size={20} />
              </span>
              <div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-white/60">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
