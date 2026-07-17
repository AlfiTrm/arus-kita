import { Skeleton } from "@/components/ui/skeleton";

export function CourierProfileSkeleton() {
  return (
    <div className="pb-8">
      <div className="flex items-center gap-3 px-6 pt-6">
        <Skeleton className="h-14 w-14 shrink-0 rounded-full" />
        <div className="min-w-0 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-1.5 h-3 w-40" />
          <Skeleton className="mt-2 h-4 w-24 rounded-full" />
        </div>
      </div>

      <Skeleton className="mx-6 mt-4 h-16 rounded-2xl" />
      <Skeleton className="mx-6 mt-4 h-64 rounded-2xl" />
      <Skeleton className="mx-6 mt-4 h-12 rounded-2xl" />
    </div>
  );
}
