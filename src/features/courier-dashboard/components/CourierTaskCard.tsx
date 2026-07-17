"use client";

import { useRouter } from "next/navigation";
import { MapPin, Package } from "lucide-react";
import PressButton from "@/shared/components/PressButton";
import { formatRupiahCompact } from "@/shared/utils/formatCurrency";
import { getTaskStatusLabel } from "../constants/taskStatus";
import { useClaimTask } from "../hooks/useClaimTask";
import type { CourierTask } from "../types/courierTask.types";

function formatKm(value: number | null): string | null {
  return value === null ? null : `${value.toFixed(1)} km`;
}

export function CourierTaskCard({ task }: { task: CourierTask }) {
  const router = useRouter();
  const { claim, isClaiming, claimError } = useClaimTask();

  const totalKm = formatKm(task.total_distance_km);
  const pickupKm = formatKm(task.pickup_distance_km);
  const dropoffKm = formatKm(task.dropoff_distance_km);

  async function handleClaim() {
    const ok = await claim(task.order_id);
    if (ok) router.push(`/dashboard/kurir/antar/${task.order_id}`);
  }

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-main/10 px-2.5 py-1 text-[11px] font-bold text-main">
          {getTaskStatusLabel(task.order_status)}
        </span>
        {totalKm && <span className="text-xs font-semibold text-black/50">{totalKm} total</span>}
      </div>

      <p className="mt-2.5 text-sm font-bold text-black">{task.request_title}</p>
      <p className="text-xs text-black/40">
        {task.order_code} · {task.event_name}
      </p>

      <div className="mt-3 flex flex-col gap-2 border-l-2 border-dashed border-black/10 pl-3">
        <div>
          <p className="flex items-center gap-1 text-xs font-semibold text-black">
            <MapPin size={12} className="text-main" /> Ambil: {task.store_name}
          </p>
          <p className="mt-0.5 text-[11px] text-black/50">
            {task.store_address}
            {pickupKm && ` · ${pickupKm} dari Anda`}
          </p>
        </div>
        <div>
          <p className="flex items-center gap-1 text-xs font-semibold text-black">
            <MapPin size={12} className="text-error" /> Antar: {task.post_name}
          </p>
          <p className="mt-0.5 text-[11px] text-black/50">
            {task.post_address}
            {dropoffKm && ` · ${dropoffKm} dari titik ambil`}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-2.5 text-xs text-black/50">
        <span className="flex items-center gap-1">
          <Package size={13} /> {task.item_count} jenis · {task.total_quantity} unit
        </span>
        <span className="font-semibold text-black">{formatRupiahCompact(task.total_amount)}</span>
      </div>

      <PressButton
        variant="primary"
        className="mt-3 w-full"
        disabled={isClaiming}
        onClick={handleClaim}
      >
        {isClaiming ? "Mengambil..." : "Ambil Tugas Ini"}
      </PressButton>
      {claimError && <p className="mt-1.5 text-center text-xs text-error">{claimError}</p>}
    </div>
  );
}
