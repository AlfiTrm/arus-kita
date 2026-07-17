import { Skeleton } from "@/components/ui/skeleton";

export function CourierGoodnessSkeleton() {
  return (
    <div className="px-6 pt-6">
      <Skeleton className="h-40 rounded-2xl" />
      <Skeleton className="mt-6 h-4 w-32" />
      <div className="mt-3 flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
