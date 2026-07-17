type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-black/10 ${className}`}
      aria-hidden="true"
    />
  );
}

export function SkeletonText({ className = "" }: SkeletonProps) {
  return <Skeleton className={`${className} h-4 w-3/4`} />;
}

export function SkeletonCard({ className = "" }: SkeletonProps) {
  return <Skeleton className={`${className} h-24 w-full rounded-2xl`} />;
}

export function SkeletonCircle({ className = "" }: SkeletonProps) {
  return <Skeleton className={`${className} h-12 w-12 rounded-full`} />;
}
