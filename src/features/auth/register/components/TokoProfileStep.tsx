"use client";

import { useCallback, useState } from "react";
import { Loader2, MapPin, Navigation } from "lucide-react";
import PressButton from "@/shared/components/PressButton";

const CATEGORY_OPTIONS = ["Sembako", "Air mineral", "Apotek", "Bangunan"];

export interface TokoProfile {
  namaToko: string;
  ownerName: string;
  nib: string;
  npwp: string;
  ktpImageUrl: string;
  bankName: string;
  bankAccountNo: string;
  bankAccountName: string;
  categories: string[];
  address: string;
  latitude: number;
  longitude: number;
}

export function TokoProfileStep({ onNext }: { onNext: (profile: TokoProfile) => Promise<void> }) {
  const [namaToko, setNamaToko] = useState("Toko Berkah Jaya");
  const [ownerName, setOwnerName] = useState("Herman T.");
  const [nib, setNib] = useState("8120014782915");
  const [npwp, setNpwp] = useState("09.254.294.3");
  const [ktpImageUrl, setKtpImageUrl] = useState("https://example.com/ktp-herman.jpg");
  const [bankName, setBankName] = useState("BCA");
  const [bankAccountNo, setBankAccountNo] = useState("5271088341");
  const [bankAccountName, setBankAccountName] = useState("Herman S.");
  const [address, setAddress] = useState("Jl. Otista Raya 45, Jaktim");
  const [latitude, setLatitude] = useState(-6.2241);
  const [longitude, setLongitude] = useState(106.8672);
  const [categories, setCategories] = useState<string[]>(["Sembako", "Air mineral"]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [geoError, setGeoError] = useState("");

  const locateMe = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolokasi tidak didukung browser ini");
      return;
    }
    setIsLocating(true);
    setGeoError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=id`,
            { headers: { "User-Agent": "PijarNusa/1.0" } },
          );
          const data = await res.json();
          if (data.display_name) {
            setAddress(data.display_name);
          }
        } catch {
          // reverse geocode gagal, biarkan address diisi manual
        }

        setIsLocating(false);
      },
      (err) => {
        setGeoError(
          err.code === err.PERMISSION_DENIED
            ? "Izin lokasi ditolak. Isi manual."
            : "Gagal mengambil lokasi. Coba lagi.",
        );
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  function toggleCategory(cat: string) {
    setCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onNext({
        namaToko,
        ownerName,
        nib,
        npwp,
        ktpImageUrl,
        bankName,
        bankAccountNo,
        bankAccountName,
        categories,
        address,
        latitude,
        longitude,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 pb-28 pt-2">
      <label className="flex flex-col gap-1.5 text-sm font-bold text-black">
        Nama toko
        <input
          value={namaToko}
          onChange={(e) => setNamaToko(e.target.value)}
          placeholder="Nama toko"
          required
          className="w-full rounded-lg border border-main px-4 py-3 text-sm font-medium outline-none focus:border-main focus:ring-2 focus:ring-main/20"
        />
      </label>

      <label className="mt-4 flex flex-col gap-1.5 text-sm font-bold text-black">
        Nama pemilik
        <input
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          placeholder="Nama pemilik"
          required
          className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm font-medium outline-none focus:border-main focus:ring-2 focus:ring-main/20"
        />
      </label>

      <div className="mt-4 flex gap-4">
        <label className="flex min-w-0 flex-1 flex-col gap-1.5 text-sm font-bold text-black">
          NIB
          <input
            value={nib}
            onChange={(e) => setNib(e.target.value)}
            placeholder="NIB"
            required
            className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm font-medium outline-none focus:border-main focus:ring-2 focus:ring-main/20"
          />
        </label>
        <label className="flex min-w-0 flex-1 flex-col gap-1.5 text-sm font-bold text-black">
          NPWP
          <input
            value={npwp}
            onChange={(e) => setNpwp(e.target.value)}
            placeholder="NPWP"
            required
            className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm font-medium outline-none focus:border-main focus:ring-2 focus:ring-main/20"
          />
        </label>
      </div>

      <div className="mt-5">
        <p className="text-sm font-bold text-black">KTP pemilik + rekening pencairan</p>
        <div className="mt-3 flex flex-col gap-3 rounded-xl border border-black/5 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <label className="flex flex-col gap-1.5 text-xs font-bold text-black">
            URL KTP
            <input
              value={ktpImageUrl}
              onChange={(e) => setKtpImageUrl(e.target.value)}
              placeholder="https://..."
              required
              className="w-full rounded-lg border border-black/10 px-3 py-2 text-xs font-medium outline-none focus:border-main focus:ring-2 focus:ring-main/20"
            />
          </label>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#105EAA]">
              <span className="text-[10px] font-extrabold tracking-tight text-white">{bankName.slice(0, 3)}</span>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label className="text-[10px] font-bold text-black/50">Nama bank</label>
              <input
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="BCA"
                required
                className="w-full rounded-lg border border-black/10 px-3 py-1.5 text-xs font-bold outline-none focus:border-main focus:ring-2 focus:ring-main/20"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <label className="flex min-w-0 flex-1 flex-col gap-1 text-[10px] font-bold text-black/50">
              No. rekening
              <input
                value={bankAccountNo}
                onChange={(e) => setBankAccountNo(e.target.value)}
                placeholder="5271088341"
                required
                className="w-full rounded-lg border border-black/10 px-3 py-1.5 text-xs font-bold outline-none focus:border-main focus:ring-2 focus:ring-main/20"
              />
            </label>
            <label className="flex min-w-0 flex-1 flex-col gap-1 text-[10px] font-bold text-black/50">
              A.n. rekening
              <input
                value={bankAccountName}
                onChange={(e) => setBankAccountName(e.target.value)}
                placeholder="Herman S."
                required
                className="w-full rounded-lg border border-black/10 px-3 py-1.5 text-xs font-bold outline-none focus:border-main focus:ring-2 focus:ring-main/20"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-black/5 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <p className="text-sm font-bold text-black">Kategori barang</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((cat) => {
            const isSelected = categories.includes(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`rounded-full border px-4 py-1.5 text-xs font-bold transition ${
                  isSelected ? "border-main bg-main/5 text-main" : "border-black/10 text-black/60"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <label className="mt-5 flex flex-col gap-1.5 text-sm font-bold text-black">
        Alamat toko
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Alamat lengkap"
          required
          className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm font-medium outline-none focus:border-main focus:ring-2 focus:ring-main/20"
        />
      </label>

      <div className="mt-5 rounded-xl border border-black/5 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-error" />
          <div className="flex-1">
            <p className="text-xs font-bold text-black">Lokasi toko (GPS)</p>
            <p className="mt-1 text-[11px] leading-relaxed text-black/50">
              {latitude.toFixed(6)}, {longitude.toFixed(6)}
            </p>
            {geoError && <p className="mt-1 text-[11px] text-error">{geoError}</p>}
          </div>
          <button
            type="button"
            onClick={locateMe}
            disabled={isLocating}
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-main px-3 py-2 text-xs font-bold text-white active:opacity-80 disabled:opacity-50"
          >
            {isLocating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Navigation className="h-3.5 w-3.5" />}
            {isLocating ? "..." : "Deteksi"}
          </button>
        </div>
      </div>

      <div
        className="fixed inset-x-0 bottom-0 bg-surface px-6 pt-4"
        style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}
      >
        <PressButton type="submit" variant="primary" className="w-full" disabled={isLoading}>
          {isLoading ? "Menyimpan..." : "Kirim Verifikasi KYC"}
        </PressButton>
      </div>
    </form>
  );
}
