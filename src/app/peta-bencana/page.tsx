import { CrisisMapLoader } from "@/features/crisis-map/components/CrisisMapLoader";
import { LandingNavbar } from "@/features/landing/components/LandingNavbar";

export default function PetaBencanaPage() {
  return (
    <div className="flex h-dvh flex-col">
      <LandingNavbar />
      <main className="min-h-0 flex-1">
        <h1 className="sr-only">Peta Bencana — Lokasi Posko Bantuan</h1>
        <CrisisMapLoader />
      </main>
    </div>
  );
}
