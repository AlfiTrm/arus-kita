"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { CourierTaskCard } from "@/features/courier-dashboard/components/CourierTaskCard";
import { CourierTaskCardSkeleton } from "@/features/courier-dashboard/components/CourierTaskCardSkeleton";
import { useCourierTasks } from "@/features/courier-dashboard/hooks/useCourierTasks";
import { useReverseGeocode } from "@/features/courier-dashboard/hooks/useReverseGeocode";
import { getStoredUser } from "@/shared/utils/authSession";

export default function CourierTasksPage() {
  const { tasks, error, isLoading, latitude, longitude } = useCourierTasks();
  const locationLabel = useReverseGeocode(latitude, longitude);
  const [name, setName] = useState("Kurir");

  useEffect(() => {
    const firstName = getStoredUser()?.name?.split(" ")[0];
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading localStorage, unavailable during SSR
    if (firstName) setName(firstName);
  }, []);

  return (
    <div className="pb-6">
      <div className="px-6 pt-6">
        <h1 className="text-xl font-bold text-black">Halo, {name} 👋</h1>
      </div>

      {locationLabel && (
        <div className="mx-6 mt-3 flex items-center gap-2 rounded-xl bg-secondary/60 px-3.5 py-2.5 text-xs font-medium text-black/70">
          <MapPin size={14} className="shrink-0 text-main" />
          Lokasi terdeteksi: {locationLabel}
        </div>
      )}

      <div className="mt-5 px-6">
        <h2 className="text-sm font-bold text-black">
          {isLoading ? "Mencari tugas di sekitar Anda..." : `${tasks.length} tugas di sekitar Anda`}
        </h2>
      </div>

      <div className="mt-3 flex flex-col gap-3 px-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <CourierTaskCardSkeleton key={i} />)
        ) : error ? (
          <p className="rounded-2xl border border-dashed border-black/10 px-4 py-6 text-center text-sm text-error">
            {error}
          </p>
        ) : tasks.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-black/10 px-4 py-6 text-center text-sm text-black/40">
            Belum ada tugas tersedia di sekitar Anda.
          </p>
        ) : (
          tasks.map((task) => <CourierTaskCard key={task.order_id} task={task} />)
        )}
      </div>
    </div>
  );
}
