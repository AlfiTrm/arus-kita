import { DistributionGrid } from "@/features/distributions/components/DistributionGrid";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { LandingNavbar } from "@/features/landing/components/LandingNavbar";
import { PublicScrollProvider } from "@/shared/components/PublicScrollProvider";

export default function PenyaluranPage() {
  return (
    <PublicScrollProvider>
      <div className="flex flex-1 flex-col bg-[#fbfaf6]">
        <LandingNavbar />
        <DistributionGrid />
        <LandingFooter />
      </div>
    </PublicScrollProvider>
  );
}
