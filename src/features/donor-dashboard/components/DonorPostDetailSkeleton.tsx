import { Skeleton } from "@/components/ui/skeleton";

export function DonorPostDetailSkeleton() {
  return (
    <div className="pb-28">
      <div className="flex items-center justify-between px-6 pt-6">
        <Skeleton className="h-9 w-9 rounded-full" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>

      <div className="mx-6 mt-4 flex items-center justify-between">
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      <Skeleton className="mx-6 mt-3 aspect-video w-auto rounded-2xl" />

      <div className="px-6 pt-4">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="mt-2 h-3 w-1/2" />
        <Skeleton className="mt-2 h-3 w-32" />
      </div>

      <div className="mx-6 mt-4 rounded-2xl border border-black/5 p-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="mt-2 h-7 w-40" />
        <Skeleton className="mt-3 h-1.5 w-full rounded-full" />
        <Skeleton className="mt-2 h-3 w-48" />
      </div>

      <div className="mx-6 mt-4">
        <Skeleton className="h-4 w-32" />
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
