import { Skeleton } from "@/components/ui/skeleton";

export function DonorPoskoListItemSkeleton() {
  return (
    <div className="mb-2 w-full rounded-2xl border border-black/5 p-4">
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-8" />
      </div>
      <Skeleton className="mt-2 h-3 w-16" />
      <Skeleton className="mt-3 h-1.5 w-full rounded-full" />
    </div>
  );
}
