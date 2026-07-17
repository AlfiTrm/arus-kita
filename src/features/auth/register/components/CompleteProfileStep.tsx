"use client";

import { useState } from "react";
import { AlertCircle, Check, Trophy } from "lucide-react";
import PressButton from "@/shared/components/PressButton";

const AFFILIATION_OPTIONS = [
  "RT/RW setempat",
  "Organisasi Kemasyarakatan",
  "Lembaga Swadaya Masyarakat (LSM)",
  "Pemerintah Desa/Kelurahan",
  "Relawan Independen",
  "Lainnya",
];

export function CompleteProfileStep({
  onNext,
}: {
  onNext: (profile: { fullName: string; nik: string; affiliation: string }) => Promise<void>;
}) {
  const [fullName, setFullName] = useState("");
  const [nik, setNik] = useState("");
  const [affiliation, setAffiliation] = useState(AFFILIATION_OPTIONS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isNikValid = /^\d{16}$/.test(nik);
  const isNikInvalid = nik.length > 0 && !isNikValid;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await onNext({ fullName, nik, affiliation });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim profil");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 pb-28 pt-2">
      <label className="flex flex-col gap-1.5 text-sm font-medium text-black">
        Nama lengkap (sesuai KTP)
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Nama sesuai KTP"
          required
          disabled={isLoading}
          className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-main focus:ring-2 focus:ring-main/20 disabled:opacity-50"
        />
      </label>

      <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium text-black">
        NIK (16 digit)
        <div className="relative">
          <input
            value={nik}
            onChange={(e) => setNik(e.target.value.replace(/\D/g, "").slice(0, 16))}
            inputMode="numeric"
            placeholder="16 digit NIK"
            required
            disabled={isLoading}
            aria-invalid={isNikInvalid}
            className={`w-full rounded-lg border px-4 py-3 pr-24 text-sm outline-none focus:ring-2 disabled:opacity-50 ${
              isNikInvalid
                ? "border-error focus:border-error focus:ring-error/20"
                : isNikValid
                  ? "border-success focus:border-success focus:ring-success/20"
                  : "border-black/10 focus:border-main focus:ring-main/20"
            }`}
          />
          {isNikValid && (
            <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 text-xs font-semibold text-success">
              <Check size={14} /> VALID
            </span>
          )}
          {isNikInvalid && (
            <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 text-xs font-semibold text-error">
              <AlertCircle size={14} /> {nik.length}/16
            </span>
          )}
        </div>
        {isNikInvalid && <p className="text-xs text-error">NIK harus 16 digit angka.</p>}
      </label>

      <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium text-black">
        Afiliasi organisasi
        <select
          value={affiliation}
          onChange={(e) => setAffiliation(e.target.value)}
          disabled={isLoading}
          className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-main focus:ring-2 focus:ring-main/20 disabled:opacity-50"
        >
          {AFFILIATION_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-warning/10 px-4 py-3 text-xs text-black/70">
        <Trophy size={16} className="mt-0.5 shrink-0 text-warning" />
        Akun aktif sebagai Donatur dulu. Fitur buat event terbuka setelah verifikasi disetujui.
      </div>

      {error && <p className="mt-3 text-sm text-error">{error}</p>}

      <div
        className="fixed inset-x-0 bottom-0 bg-surface px-6 pt-4"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <PressButton type="submit" variant="primary" className="w-full" disabled={isLoading}>
          {isLoading ? "Mengirim..." : "Kirim untuk Ditinjau"}
        </PressButton>
      </div>
    </form>
  );
}
