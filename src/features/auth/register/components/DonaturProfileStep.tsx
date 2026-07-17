"use client";

import { useState } from "react";
import PressButton from "@/shared/components/PressButton";

const DISASTER_OPTIONS = [
  { id: "banjir", label: "Banjir" },
  { id: "gempa", label: "Gempa" },
  { id: "longsor", label: "Longsor" },
  { id: "erupsi", label: "Erupsi" },
];

const REGION_OPTIONS = [
  { id: "jabodetabek", label: "Jabodetabek" },
  { id: "seluruh_indonesia", label: "Seluruh Indonesia" },
];

export interface DonaturProfile {
  fullName: string;
  phone: string;
  email: string;
  disasterPreferences: string[];
  regionPreference: string | null;
}

export function DonaturProfileStep({ onNext }: { onNext: (profile: DonaturProfile) => Promise<void> }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [disasterPreferences, setDisasterPreferences] = useState<string[]>([]);
  const [regionPreference, setRegionPreference] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleDisaster(id: string) {
    setDisasterPreferences((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]));
  }

  const canProceed = fullName.trim().length > 0 && phone.trim().length >= 8 && agreed;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await onNext({ fullName, phone, email, disasterPreferences, regionPreference });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan data diri");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 pb-28 pt-2">
      <label className="flex flex-col gap-1.5 text-sm font-medium text-black">
        Nama lengkap
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Nama lengkap Anda"
          required
          className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-main focus:ring-2 focus:ring-main/20"
        />
      </label>

      <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium text-black">
        Nomor HP
        <div className="flex overflow-hidden rounded-lg border border-black/10 focus-within:border-main focus-within:ring-2 focus-within:ring-main/20">
          <span className="flex items-center border-r border-black/10 bg-black/3 px-3 text-sm font-medium text-black/60">
            +62
          </span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            inputMode="numeric"
            placeholder="812-3456-7890"
            required
            className="w-full px-3 py-3 text-sm outline-none"
          />
        </div>
      </label>

      <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium text-black">
        <span>
          Email <span className="font-normal text-black/40">(opsional)</span>
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nama@email.com — untuk kuitansi"
          className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-main focus:ring-2 focus:ring-main/20"
        />
      </label>

      <div className="mt-5 rounded-xl border border-black/5 bg-white p-4">
        <p className="text-sm font-semibold text-black">Preferensi donasi</p>
        <p className="mt-0.5 text-xs text-black/40">
          Untuk mode otonom — jenis bencana & wilayah prioritas Anda
        </p>

        <p className="mt-4 text-xs font-medium text-black/50">Jenis bencana</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {DISASTER_OPTIONS.map((opt) => {
            const isSelected = disasterPreferences.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleDisaster(opt.id)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                  isSelected ? "border-main bg-main/10 text-main" : "border-black/10 text-black/60"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-xs font-medium text-black/50">Wilayah</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {REGION_OPTIONS.map((opt) => {
            const isSelected = regionPreference === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setRegionPreference(isSelected ? null : opt.id)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                  isSelected ? "border-main bg-main/10 text-main" : "border-black/10 text-black/60"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <label className="mt-4 flex items-center gap-2.5 text-xs leading-5 text-black/60">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="h-4 w-4 shrink-0 accent-main"
        />
        Saya menyetujui Syarat Layanan & Kebijakan Privasi (UU PDP 27/2022).
      </label>

      {error && <p className="mt-3 text-sm text-error">{error}</p>}

      <div
        className="fixed inset-x-0 bottom-0 bg-surface px-6 pt-4"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <PressButton type="submit" variant="primary" className="w-full" disabled={!canProceed || isLoading}>
          {isLoading ? "Menyimpan..." : "Lanjut"}
        </PressButton>
      </div>
    </form>
  );
}
