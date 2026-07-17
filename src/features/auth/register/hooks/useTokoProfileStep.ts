import { useState, useCallback, useEffect } from "react";
import type { TokoProfile } from "../components/TokoProfileStep";

export function useTokoProfileStep(onNext: (profile: TokoProfile) => Promise<void>) {
  const [namaToko, setNamaToko] = useState("Toko Berkah Jaya");
  const [ownerName, setOwnerName] = useState("Herman T.");
  const [nib, setNib] = useState("8120014782915");
  const [npwp, setNpwp] = useState("09.254.294.3");
  const [ktpFile, setKtpFile] = useState<File | null>(null);
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
          // fallback
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

  useEffect(() => {
    locateMe();
  }, [locateMe]);

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
        ktpFile,
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

  return {
    namaToko, setNamaToko,
    ownerName, setOwnerName,
    nib, setNib,
    npwp, setNpwp,
    ktpFile, setKtpFile,
    bankName, setBankName,
    bankAccountNo, setBankAccountNo,
    bankAccountName, setBankAccountName,
    address, setAddress,
    latitude, longitude,
    categories, toggleCategory,
    geoError, isLocating, isLoading,
    locateMe, handleSubmit
  };
}
