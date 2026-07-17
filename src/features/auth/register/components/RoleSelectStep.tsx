"use client";

import { useState } from "react";
import { Bike, Check, Heart, Home, Store } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import { ROLE_LABELS, type RegisterRole } from "../types/register.types";

const ROLES: { id: RegisterRole; icon: typeof Heart; description: string }[] = [
  {
    id: "donatur",
    icon: Heart,
    description: "Donasi yang dikunci ke barang nyata & bisa dilacak sampai tiba",
  },
  {
    id: "admin_posko",
    icon: Home,
    description: "Buka event bencana, ajukan kebutuhan, terima barang — tanpa pegang uang",
  },
  {
    id: "toko_mitra",
    icon: Store,
    description: "Terima order bantuan bernilai pasti, dana cair otomatis <30 menit",
  },
  {
    id: "relawan_kurir",
    icon: Bike,
    description: "Antar bantuan, terlindungi rantai kustodi, kumpulkan jejak kebaikan",
  },
];

export function RoleSelectStep({ onNext }: { onNext: (role: RegisterRole) => void }) {
  const [selected, setSelected] = useState<RegisterRole>("donatur");

  return (
    <div className="px-6 pb-28 pt-2">
      <h2 className="text-2xl font-bold leading-snug text-black">Anda ingin berperan sebagai apa?</h2>
      <p className="mt-1 text-sm text-black/50">Bisa menambah peran lain kapan saja dari Profil.</p>

      <div className="mt-6 flex flex-col gap-3">
        {ROLES.map((role) => {
          const isSelected = role.id === selected;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => setSelected(role.id)}
              className={`relative flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                isSelected ? "border-main bg-secondary/25" : "border-black/10 bg-white hover:border-black/20"
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-main">
                <role.icon size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-black">{ROLE_LABELS[role.id]}</p>
                <p className="mt-0.5 text-xs leading-5 text-black/50">{role.description}</p>
              </div>
              {isSelected && (
                <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-main text-white">
                  <Check size={12} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        className="fixed inset-x-0 bottom-0 bg-surface px-6 pt-4"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <PressButton variant="primary" className="w-full" onClick={() => onNext(selected)}>
          Lanjut sebagai {ROLE_LABELS[selected]}
        </PressButton>
      </div>
    </div>
  );
}
