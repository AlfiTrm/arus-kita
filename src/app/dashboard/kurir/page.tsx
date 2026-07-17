"use client";

import { CourierTaskCard } from "@/features/courier-dashboard/components/CourierTaskCard";
import { CourierTaskCardSkeleton } from "@/features/courier-dashboard/components/CourierTaskCardSkeleton";
import { useCourierTasks } from "@/features/courier-dashboard/hooks/useCourierTasks";

export default function CourierTasksPage() {
  const { tasks, error, isLoading } = useCourierTasks();

  return (
    <div className="pb-6">
      <div className="px-6 pt-6">
        <h1 className="text-xl font-bold text-black">Tugas</h1>
        <p className="mt-0.5 text-xs text-black/50">
          {isLoading ? "Mencari tugas di sekitar Anda..." : `${tasks.length} tugas di sekitar Anda`}
        </p>
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
