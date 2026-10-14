import { TransparencyDashboard } from "@/features/transparency/components/TransparencyDashboard";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { LandingNavbar } from "@/features/landing/components/LandingNavbar";
import { PublicScrollProvider } from "@/shared/components/PublicScrollProvider";

export default function TransparansiPage() {
  return (
    <PublicScrollProvider>
      <div className="flex flex-1 flex-col bg-[#fbfaf6]">
        <LandingNavbar />
        <main className="flex-1">
          <TransparencyDashboard />
        </main>
        <LandingFooter />
      </div>
    </PublicScrollProvider>
  );
}
