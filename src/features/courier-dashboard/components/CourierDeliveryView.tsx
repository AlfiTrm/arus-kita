"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Package, ShieldCheck } from "lucide-react";
import { useGeolocation } from "@/shared/hooks/useGeolocation";
import PressButton from "@/shared/components/PressButton";
import { haversineKm } from "@/shared/utils/geo";
import { CourierDeliveryMapLoader } from "./CourierDeliveryMapLoader";
import { CourierHandoffQr } from "./CourierHandoffQr";
import { courierTaskService } from "../services/courierTaskService";
import type { CourierHandoffTokenData, CourierTaskDetail } from "../types/courierTask.types";

export function CourierDeliveryView({ task }: { task: CourierTaskDetail }) {
  const router = useRouter();
  const { latitude, longitude, error: geoError } = useGeolocation();

  const [arrivedAtStore, setArrivedAtStore] = useState(false);
  const [arrivedAt, setArrivedAt] = useState<string | null>(task.picked_up_at);
  const [isMarkingArrival, setIsMarkingArrival] = useState(false);
  const [arrivalError, setArrivalError] = useState<string | null>(null);
  const [handoffToken, setHandoffToken] = useState<CourierHandoffTokenData | null>(null);

  const isPickedUp = arrivedAtStore || Boolean(task.picked_up_at);

  async function handleArriveAtStore() {
    setIsMarkingArrival(true);
    setArrivalError(null);
    try {
      const data = await courierTaskService.arrived(task.order_id);
      setArrivedAt(data.arrived_at);
      setArrivedAtStore(true);
    } catch (err) {
      setArrivalError(err instanceof Error ? err.message : "Gagal menandai kedatangan");
    } finally {
      setIsMarkingArrival(false);
    }
  }

  async function handleArriveAtPost() {
    setIsMarkingArrival(true);
    setArrivalError(null);
    try {
      const data = await courierTaskService.arrivedPost(task.order_id);
      setHandoffToken(data);
    } catch (err) {
      setArrivalError(err instanceof Error ? err.message : "Gagal memulai serah terima");
    } finally {
      setIsMarkingArrival(false);
    }
  }

  if (handoffToken) {
    return (
      <CourierHandoffQr
        orderId={task.order_id}
        initialToken={handoffToken}
        baselineStatus={task.order_status}
        targetName={task.post_name}
        onBack={() => router.push("/dashboard/kurir")}
      />
    );
  }

  const targetPosition: [number, number] = isPickedUp
    ? [task.post_latitude, task.post_longitude]
    : [task.store_latitude, task.store_longitude];
  const targetName = isPickedUp ? task.post_name : task.store_name;

  const courierPosition: [number, number] | null = latitude !== null && longitude !== null ? [latitude, longitude] : null;
  const distanceKm = courierPosition
    ? haversineKm(courierPosition[0], courierPosition[1], targetPosition[0], targetPosition[1])
    : null;

  return (
    <div className="flex h-full flex-col bg-surface">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-black/5 bg-white px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Kembali"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-black"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-black">Menuju {targetName}</p>
            <p className="text-xs text-black/50">
              {distanceKm !== null ? `${distanceKm.toFixed(1)} km lagi` : "Mencari lokasi..."}
            </p>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
            geoError ? "bg-warning/10 text-warning" : "bg-success/10 text-success"
          }`}
        >
          {geoError ? "GPS BERMASALAH" : "GPS AKTIF"}
        </span>
      </div>

      <div className="h-64 shrink-0">
        <CourierDeliveryMapLoader task={task} courierPosition={courierPosition} targetPosition={targetPosition} />
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {isPickedUp && (
          <div className="mb-3 flex items-start gap-2 rounded-2xl bg-main px-4 py-3 text-white">
            <ShieldCheck size={18} className="mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-bold">Kustodi barang: DI TANGAN ANDA</p>
              <p className="text-xs text-white/70">
                {arrivedAt ? `Sejak ${new Date(arrivedAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} · ` : ""}
                menunggu handshake posko
              </p>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-black/5 bg-white p-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-black/50">Muatan</span>
            <span className="font-semibold text-black">
              {task.item_count} jenis · {task.total_quantity} unit
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-black/50">Tujuan saat ini</span>
            <span className="flex items-center gap-1 font-semibold text-black">
              <Package size={13} /> {targetName}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-black/50">Status</span>
            <span className="font-semibold text-black">{task.order_status.replace(/_/g, " ")}</span>
          </div>
        </div>

        {geoError && <p className="mt-3 text-center text-xs text-warning">{geoError}</p>}

        <PressButton
          variant="primary"
          className="mt-4 w-full"
          disabled={isMarkingArrival}
          onClick={isPickedUp ? handleArriveAtPost : handleArriveAtStore}
        >
          {isMarkingArrival ? "Memproses..." : isPickedUp ? "Tiba di Posko" : "Tiba di Toko"}
        </PressButton>
        {arrivalError && <p className="mt-1.5 text-center text-xs text-error">{arrivalError}</p>}
      </div>
    </div>
  );
}
