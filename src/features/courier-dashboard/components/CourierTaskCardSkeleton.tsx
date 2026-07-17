import { Skeleton } from "@/components/ui/skeleton";

export function CourierTaskCardSkeleton() {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="mt-2.5 h-4 w-48" />
      <Skeleton className="mt-1.5 h-3 w-32" />
      <div className="mt-3 flex flex-col gap-2 border-l-2 border-black/10 pl-3">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-3 w-40" />
      </div>
      <Skeleton className="mt-3 h-3 w-full" />
    </div>
  );
}
