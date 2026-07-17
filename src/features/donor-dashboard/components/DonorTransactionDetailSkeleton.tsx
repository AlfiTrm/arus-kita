import { Skeleton } from "@/components/ui/skeleton";

export function DonorTransactionDetailSkeleton() {
  return (
    <div className="pb-10">
      <div className="flex items-center gap-3 px-6 pt-6">
        <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
        <div className="min-w-0 flex-1">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-1.5 h-3 w-56" />
        </div>
      </div>

      <Skeleton className="mx-6 mt-4 aspect-video w-auto rounded-2xl" />

      <div className="mx-6 mt-4 rounded-2xl border border-black/5 bg-white p-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="mt-2 h-7 w-32" />
        <Skeleton className="mt-1 h-3 w-24" />
        <div className="mt-3 flex flex-col gap-2 border-t border-black/5 pt-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-3 w-full" />
          ))}
        </div>
      </div>

      <div className="mx-6 mt-4 rounded-2xl border border-black/5 bg-white p-4">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="mt-2 h-6 w-40" />
        <Skeleton className="mt-3 h-1.5 w-full rounded-full" />
      </div>

      <div className="mx-6 mt-4">
        <Skeleton className="h-4 w-40" />
        <div className="mt-2 rounded-2xl border border-black/5">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className={`flex items-center justify-between p-3 ${i > 0 ? "border-t border-black/5" : ""}`}>
              <div>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-1.5 h-3 w-20" />
              </div>
              <Skeleton className="h-4 w-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
