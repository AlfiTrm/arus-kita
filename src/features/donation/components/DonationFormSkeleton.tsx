import { Skeleton } from "@/components/ui/skeleton";

export function DonationFormSkeleton() {
  return (
    <div className="px-6 pt-4">
      <Skeleton className="h-16 rounded-2xl" />
      <Skeleton className="mt-4 h-40 rounded-2xl" />
      <Skeleton className="mt-4 h-32 rounded-2xl" />
    </div>
  );
}
