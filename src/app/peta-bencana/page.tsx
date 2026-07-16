import { CrisisMapLoader } from "@/features/crisis-map/components/CrisisMapLoader";
import { LandingNavbar } from "@/features/landing/components/LandingNavbar";

export default function PetaBencanaPage() {
  return (
    <div className="flex h-dvh flex-col">
      <LandingNavbar />
      <div className="min-h-0 flex-1">
        <CrisisMapLoader />
      </div>
    </div>
  );
}
