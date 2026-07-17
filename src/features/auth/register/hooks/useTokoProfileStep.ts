import { useState, useCallback } from "react";
import type { TokoProfile } from "../components/TokoProfileStep";

export function useTokoProfileStep(onNext: (profile: TokoProfile) => Promise<void>) {
  const [namaToko, setNamaToko] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [nib, setNib] = useState("");
  const [npwp, setNpwp] = useState("");
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [bankName, setBankName] = useState("");
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
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
