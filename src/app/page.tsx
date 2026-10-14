import { CtaSection } from "@/features/landing/components/CtaSection";
import { ExploreSection } from "@/features/landing/components/ExploreSection";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { LandingModeGate } from "@/features/landing/components/LandingModeGate";
import { LandingNavbar } from "@/features/landing/components/LandingNavbar";
import { NeedsSection } from "@/features/landing/components/NeedsSection";
import { ProcessSection } from "@/features/landing/components/ProcessSection";
import { TrackingSection } from "@/features/landing/components/TrackingSection";

export default function Home() {
  return (
    <LandingModeGate>
      <div className="landing-page flex flex-1 flex-col">
        <LandingNavbar />
        <main className="flex-1">
          <HeroSection editorialFontClassName="font-editorial" />
          <ProcessSection />
          <NeedsSection />
          <TrackingSection />
          <ExploreSection />
          <CtaSection />
        </main>
        <LandingFooter />
      </div>
    </LandingModeGate>
  );
}
