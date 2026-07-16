import { DistributionGrid } from "@/features/distributions/components/DistributionGrid";
import { LandingNavbar } from "@/features/landing/components/LandingNavbar";

export default function PenyaluranPage() {
  return (
    <>
      <LandingNavbar />
      <main className="flex-1">
        <DistributionGrid />
      </main>
    </>
  );
}
