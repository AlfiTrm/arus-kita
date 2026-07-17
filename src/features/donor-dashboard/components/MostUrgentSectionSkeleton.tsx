import { Skeleton } from "@/components/ui/skeleton";

export function MostUrgentSectionSkeleton() {
  return (
    <div className="px-6 py-4">
      <Skeleton className="h-4 w-32" />

      <div className="mt-3 flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-3">
            <Skeleton className="h-14 w-14 shrink-0 rounded-xl" />
            <div className="min-w-0 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="mt-2 h-3 w-full" />
              <Skeleton className="mt-2 h-1 w-full rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
