import { Skeleton } from "@/components/ui/skeleton";

export function DistributionCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
      <Skeleton className="aspect-4/3 w-full rounded-none" />
      <div className="p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="mt-2 h-3 w-1/2" />
        <div className="mt-3 flex items-center justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-14" />
        </div>
      </div>
    </div>
  );
}
