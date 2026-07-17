"use client";

import { useState } from "react";
import { Bike, Car, Check, Clock, Truck } from "lucide-react";
import PressButton from "@/shared/components/PressButton";

const VEHICLE_OPTIONS = [
  { id: "motor", label: "Motor", icon: Bike, capacityKg: 50, capacityLabel: "≤50 kg" },
  { id: "mobil", label: "Mobil", icon: Car, capacityKg: 300, capacityLabel: "≤300 kg" },
  { id: "pickup", label: "Pick-up", icon: Truck, capacityKg: 1000, capacityLabel: "≤1 ton" },
];

const RADIUS_OPTIONS = [5, 10, 15, 20, 30];

const OPERATIONAL_AREA_OPTIONS = [
  "Jakarta Pusat",
  "Jakarta Timur",
  "Jakarta Selatan",
  "Jakarta Barat",
  "Jakarta Utara",
  "Bekasi",
  "Tangerang",
  "Depok",
  "Bogor",
];

export interface CourierProfile {
  fullName: string;
  nik: string;
  vehicleType: string;
  vehicleCapacityKg: number;
  operationalArea: string;
  operationRadiusKm: number;
  waiverAccepted: boolean;
}

export function CourierProfileStep({ onNext }: { onNext: (profile: CourierProfile) => Promise<void> }) {
  const [fullName, setFullName] = useState("");
  const [nik, setNik] = useState("");
  const [vehicleType, setVehicleType] = useState("motor");
  const [operationalArea, setOperationalArea] = useState("");
  const [operationRadiusKm, setOperationRadiusKm] = useState(15);
  const [waiverAccepted, setWaiverAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isNikValid = /^\d{16}$/.test(nik);
  const vehicle = VEHICLE_OPTIONS.find((v) => v.id === vehicleType) ?? VEHICLE_OPTIONS[0];
  const canProceed = fullName.trim().length > 0 && isNikValid && operationalArea.trim().length > 0 && waiverAccepted;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await onNext({
        fullName,
        nik,
        vehicleType,
        vehicleCapacityKg: vehicle.capacityKg,
        operationalArea,
        operationRadiusKm,
        waiverAccepted,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan data diri");
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
          placeholder="Nama lengkap Anda"
          required
          className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-main focus:ring-2 focus:ring-main/20"
        />
      </label>

      <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium text-black">
        NIK (16 digit)
        <div className="flex items-center gap-2 rounded-lg border border-black/10 px-4 py-3 focus-within:border-main focus-within:ring-2 focus-within:ring-main/20">
          <input
            value={nik}
            onChange={(e) => setNik(e.target.value.replace(/\D/g, "").slice(0, 16))}
            inputMode="numeric"
            placeholder="3175064507980002"
            required
            className="w-full bg-transparent text-sm outline-none"
          />
          {isNikValid && (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-bold text-success">
              <Check size={11} /> VALID
            </span>
          )}
        </div>
      </label>

      <div className="mt-5 rounded-xl border border-black/5 bg-white p-4">
        <p className="text-sm font-semibold text-black">Kendaraan & kapasitas</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {VEHICLE_OPTIONS.map((opt) => {
            const isSelected = vehicleType === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setVehicleType(opt.id)}
                className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-center transition ${
                  isSelected ? "border-main bg-main/5" : "border-black/10"
                }`}
              >
                <opt.icon size={20} className={isSelected ? "text-main" : "text-black/40"} />
                <span className={`text-xs font-bold ${isSelected ? "text-main" : "text-black/60"}`}>{opt.label}</span>
                <span className="text-[10px] text-black/40">{opt.capacityLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium text-black">
        Wilayah operasi
        <select
          value={operationalArea}
          onChange={(e) => setOperationalArea(e.target.value)}
          required
          className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-main focus:ring-2 focus:ring-main/20"
        >
          <option value="" disabled>
            Pilih wilayah
          </option>
          {OPERATIONAL_AREA_OPTIONS.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium text-black">
        Radius operasi
        <select
          value={operationRadiusKm}
          onChange={(e) => setOperationRadiusKm(Number(e.target.value))}
          className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-main focus:ring-2 focus:ring-main/20"
        >
          {RADIUS_OPTIONS.map((km) => (
            <option key={km} value={km}>
              radius {km} km
            </option>
          ))}
        </select>
      </label>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-warning/10 px-4 py-3 text-xs leading-5 text-black/70">
        <Clock size={16} className="mt-0.5 shrink-0 text-warning" />
        <span>
          Masa percobaan: maks. <span className="font-bold text-warning">1 order aktif</span> di 48 jam pertama
          sampai reputasi terbentuk.
        </span>
      </div>

      <label className="mt-4 flex items-start gap-2.5 text-xs leading-5 text-black/60">
        <input
          type="checkbox"
          checked={waiverAccepted}
          onChange={(e) => setWaiverAccepted(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-main"
        />
        Saya menyetujui waiver risiko kerelawanan bencana & kebijakan privasi.
      </label>

      {error && <p className="mt-3 text-sm text-error">{error}</p>}

      <div
        className="fixed inset-x-0 bottom-0 bg-surface px-6 pt-4"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <PressButton type="submit" variant="primary" className="w-full" disabled={!canProceed || isLoading}>
          {isLoading ? "Menyimpan..." : "Selesaikan Pendaftaran"}
        </PressButton>
      </div>
    </form>
  );
}
