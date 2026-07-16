import { TransparencyDashboard } from "@/features/transparency/components/TransparencyDashboard";
import { LandingNavbar } from "@/features/landing/components/LandingNavbar";

export default function TransparansiPage() {
  return (
    <>
      <LandingNavbar />
      <main className="flex-1 bg-black/[0.015]">
        <TransparencyDashboard />
      </main>
    </>
  );
}
