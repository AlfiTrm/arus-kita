import { Skeleton } from "@/components/ui/skeleton";

export function TransactionStatsCardSkeleton() {
  return (
    <div className="mx-6 mt-4 rounded-2xl bg-main p-4">
      <Skeleton className="h-3 w-20 bg-white/20" />
      <Skeleton className="mt-2 h-7 w-32 bg-white/20" />
      <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex-1 text-center">
            <Skeleton className="mx-auto h-4 w-12 bg-white/20" />
            <Skeleton className="mx-auto mt-1.5 h-2.5 w-16 bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TransactionListItemSkeleton() {
  return (
    <div className="flex items-start gap-2 rounded-2xl border border-black/5 bg-white p-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="mt-2 h-3 w-40" />
        <Skeleton className="mt-1.5 h-3 w-24" />
      </div>
    </div>
  );
}
