import { Skeleton } from "@/components/ui/skeleton";

export function DonorPointsSkeleton() {
  return (
    <div className="pb-8">
      <div className="px-6 pt-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="mt-1.5 h-3 w-56" />
      </div>

      <div className="px-6 pt-4">
        <Skeleton className="h-24 rounded-2xl" />
      </div>

      <div className="px-6 py-4">
        <Skeleton className="h-4 w-24" />
        <div className="mt-3 flex flex-col gap-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-2xl" />
          ))}
        </div>
      </div>

      <div className="px-6 py-4">
        <Skeleton className="h-4 w-24" />
        <div className="mt-3 flex flex-col gap-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
