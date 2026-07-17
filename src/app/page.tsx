import { CtaSection } from "@/features/landing/components/CtaSection";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { LandingModeGate } from "@/features/landing/components/LandingModeGate";
import { LandingNavbar } from "@/features/landing/components/LandingNavbar";
import { ProblemSection } from "@/features/landing/components/ProblemSection";
import { TrustSection } from "@/features/landing/components/TrustSection";

export default function Home() {
  return (
    <LandingModeGate>
      <>
        <LandingNavbar />
        <main className="flex-1">
          <HeroSection />
          <ProblemSection />
          <TrustSection />
          <CtaSection />
        </main>
        <LandingFooter />
      </>
    </LandingModeGate>
  );
}
