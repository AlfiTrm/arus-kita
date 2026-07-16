import { HeroSection } from "@/features/landing/components/HeroSection";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { LandingModeGate } from "@/features/landing/components/LandingModeGate";
import { LandingNavbar } from "@/features/landing/components/LandingNavbar";

export default function Home() {
  return (
    <LandingModeGate>
      <>
        <LandingNavbar />
        <main className="flex-1">
          <HeroSection />
          {/* testimonials, CTA - next */}
        </main>
        <LandingFooter />
      </>
    </LandingModeGate>
  );
}
