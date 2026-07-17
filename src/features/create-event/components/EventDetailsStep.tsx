"use client";

import { useEffect } from "react";
import { Check, MapPin, Mic, MicOff, RefreshCw } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import { useReverseGeocode } from "../hooks/useReverseGeocode";
import { useSpeechToText } from "../hooks/useSpeechToText";
import type { DisasterType, EventPhoto } from "../types/createEvent.types";

const DISASTER_TYPES: { id: DisasterType; label: string }[] = [
  { id: "banjir", label: "Banjir" },
  { id: "gempa", label: "Gempa" },
  { id: "longsor", label: "Longsor" },
  { id: "erupsi", label: "Erupsi" },
  { id: "lainnya", label: "Lainnya" },
];

export function EventDetailsStep({
  photos,
  name,
  onNameChange,
  description,
  onDescriptionChange,
  disasterType,
  onDisasterTypeChange,
  address,
  onAddressChange,
  radiusMeters,
  onRadiusChange,
  onNext,
}: {
  photos: EventPhoto[];
  name: string;
  onNameChange: (value: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
  disasterType: DisasterType;
  onDisasterTypeChange: (value: DisasterType) => void;
  address: string;
  onAddressChange: (value: string) => void;
  radiusMeters: number;
  onRadiusChange: (value: number) => void;
  onNext: () => void;
}) {
  const firstPhoto = photos[0];
  const geocode = useReverseGeocode(firstPhoto?.latitude ?? null, firstPhoto?.longitude ?? null);
  const { isListening, isSupported, start, stop } = useSpeechToText((text) => onNameChange(text));

  useEffect(() => {
    if (geocode.address) onAddressChange(geocode.address);
  }, [geocode.address, onAddressChange]);

  const canProceed = name.trim().length > 0 && description.trim().length > 0 && photos.length > 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-surface">
      <div className="flex-1 overflow-y-auto px-6 pb-28 pt-4">
        {photos[0] && (
          <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-black/10">
            {/* eslint-disable-next-line @next/next/no-img-element -- captured data URL, not an optimizable static asset */}
            <img src={photos[0].dataUrl} alt="Foto bencana" className="h-full w-full object-cover" />
            <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-success text-white">
              <Check size={14} />
            </span>
          </div>
        )}

        <label className="mt-6 flex flex-col gap-1.5 text-sm font-medium text-black">
          Nama bencana
          <div className="relative">
            <input
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="mis. Banjir Kampung Melayu"
              className="w-full rounded-lg border border-black/10 px-4 py-3 pr-11 text-sm outline-none focus:border-main focus:ring-2 focus:ring-main/20"
            />
            {isSupported && (
              <button
                type="button"
                onClick={isListening ? stop : start}
                aria-label={isListening ? "Berhenti merekam suara" : "Isi pakai suara"}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${isListening ? "text-error" : "text-black/40"}`}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
            )}
          </div>
        </label>

        <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium text-black">
          Deskripsi kondisi
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="mis. Banjir setinggi 80cm, warga butuh air dan selimut"
            rows={3}
            className="w-full resize-none rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-main focus:ring-2 focus:ring-main/20"
          />
        </label>

        <div className="mt-5">
          <p className="text-sm font-medium text-black">Jenis bencana</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {DISASTER_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => onDisasterTypeChange(type.id)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold ${
                  disasterType === type.id ? "border-main bg-main/10 text-main" : "border-black/10 text-black/60"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-secondary/40 px-4 py-3">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-black">
            <MapPin size={13} className="text-main" /> GPS otomatis dari foto
          </p>
          <div className="mt-1 flex items-start justify-between gap-2">
            <p className="text-xs text-black/60">
              {firstPhoto ? `${firstPhoto.latitude?.toFixed(4)}, ${firstPhoto.longitude?.toFixed(4)}` : "—"}
              {address ? ` · ${address}` : geocode.isLoading ? " · mencari alamat..." : ""}
              {geocode.error && " · gagal ambil alamat"}
            </p>
            <button
              type="button"
              onClick={geocode.refetch}
              disabled={geocode.isLoading}
              className="flex shrink-0 items-center gap-1 text-xs font-semibold text-main disabled:opacity-50"
            >
              <RefreshCw size={12} className={geocode.isLoading ? "animate-spin" : ""} /> Ubah
            </button>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-black">Radius area posko</span>
            <span className="font-bold text-main">{radiusMeters} m</span>
          </div>
          <input
            type="range"
            min={100}
            max={2000}
            step={50}
            value={radiusMeters}
            onChange={(e) => onRadiusChange(Number(e.target.value))}
            className="mt-2 w-full accent-main"
          />
          <div className="flex justify-between text-[11px] text-black/40">
            <span>100 m</span>
            <span>2 km</span>
          </div>
          <p className="mt-1.5 text-xs text-black/50">
            Radius dipakai untuk geofence verifikasi foto & serah terima barang.
          </p>
        </div>
      </div>

      <div
        className="shrink-0 bg-surface px-6 pt-4"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <PressButton variant="primary" className="w-full" disabled={!canProceed} onClick={onNext}>
          Lanjut — Tambah Kebutuhan →
        </PressButton>
      </div>
    </div>
  );
}
