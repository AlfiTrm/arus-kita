import { Skeleton } from "@/components/ui/skeleton";

export function DonorProfileSkeleton() {
  return (
    <div className="pb-8">
      <div className="flex items-start gap-3 px-6 pt-6">
        <Skeleton className="h-14 w-14 shrink-0 rounded-full" />
        <div className="min-w-0 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-1.5 h-3 w-24" />
          <Skeleton className="mt-2 h-5 w-28 rounded-full" />
        </div>
        <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
      </div>

      <div className="mx-6 mt-4 flex items-center justify-between rounded-2xl bg-main/10 px-5 py-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="text-center">
            <Skeleton className="mx-auto h-4 w-12" />
            <Skeleton className="mx-auto mt-1.5 h-2.5 w-16" />
          </div>
        ))}
      </div>

      <Skeleton className="mx-6 mt-4 h-16 rounded-2xl" />

      <div className="mt-4 flex flex-col gap-3 px-6">
        <Skeleton className="h-56 rounded-2xl" />
        <Skeleton className="h-14 rounded-2xl" />
      </div>
    </div>
  );
}
