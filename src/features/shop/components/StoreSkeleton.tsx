import { Skeleton, SkeletonCard, SkeletonCircle, SkeletonText } from "@/shared/components/Skeleton";

export function StoreOrderViewSkeleton() {
  return (
    <div className="pb-28">
      <div className="flex items-center justify-between px-6 pb-4 pt-10">
        <div className="w-full max-w-[70%]">
          <Skeleton className="h-7 w-48" />
          <div className="mt-2 flex items-center gap-2">
            <SkeletonCircle className="h-2 w-2" />
            <SkeletonText className="w-56" />
          </div>
        </div>
        <SkeletonCircle className="h-10 w-10" />
      </div>

      <div className="mt-2 px-6">
        <SkeletonCard className="h-[420px] border-2 border-transparent" />
      </div>

      <div className="mt-8 px-6">
        <Skeleton className="h-4 w-16" />
        <div className="mt-3 flex flex-col gap-3">
          <SkeletonCard className="h-20" />
          <SkeletonCard className="h-20" />
        </div>
      </div>
    </div>
  );
}

export function StorePencairanSkeleton() {
  return (
    <div className="pb-28">
      <div className="px-6 pt-10">
        <Skeleton className="h-8 w-48" />
        <SkeletonText className="mt-2 w-64" />
      </div>

      <div className="mt-6 px-6">
        <SkeletonCard className="h-40 bg-main/10" />
      </div>

      <div className="mt-8 px-6">
        <Skeleton className="h-5 w-40" />
        <div className="mt-4 flex flex-col gap-3">
          <SkeletonCard className="h-28" />
          <SkeletonCard className="h-28" />
          <SkeletonCard className="h-28" />
        </div>
      </div>

      <div className="mt-6 px-6">
        <SkeletonCard className="h-24 bg-success/10" />
      </div>
    </div>
  );
}

export function StoreJejakSkeleton() {
  return (
    <div className="pb-28">
      <div className="px-6 pt-10">
        <Skeleton className="h-8 w-48" />
        <SkeletonText className="mt-2 w-56" />
      </div>

      <div className="mt-6 px-6">
        <SkeletonCard className="h-72 bg-main/10" />
      </div>

      <div className="mt-8 px-6">
        <div className="flex items-end justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-14" />
        </div>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          <SkeletonCard className="h-32 w-32 shrink-0" />
          <SkeletonCard className="h-32 w-32 shrink-0" />
          <SkeletonCard className="h-32 w-32 shrink-0" />
        </div>
      </div>

      <div className="mt-8 px-6">
        <Skeleton className="h-5 w-40" />
        <div className="mt-4 flex flex-col gap-3">
          <SkeletonCard className="h-20" />
          <SkeletonCard className="h-20" />
        </div>
      </div>
    </div>
  );
}

export function StoreProfileSkeleton() {
  return (
    <div className="pb-28">
      <div className="px-6 pt-10">
        <div className="flex items-center gap-4">
          <SkeletonCircle className="h-16 w-16 rounded-2xl" />
          <div className="flex-1">
            <Skeleton className="h-6 w-48" />
            <SkeletonText className="mt-1 w-3/4" />
            <div className="mt-2 flex gap-2">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 px-6">
        <SkeletonCard className="h-20" />
      </div>

      <div className="mt-4 px-6">
        <SkeletonCard className="h-80" />
      </div>

      <div className="mt-4 px-6">
        <SkeletonCard className="h-20 bg-warning/10" />
      </div>

      <div className="mt-4 px-6">
        <SkeletonCard className="h-14" />
      </div>
    </div>
  );
}
