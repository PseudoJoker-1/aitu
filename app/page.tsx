import { HeroSection } from "@/components/blocks/hero-section-5"
import { ServicesSection } from "@/components/blocks/services-section"
import { PortfolioSection } from "@/components/blocks/portfolio-section"
import { ProcessSection } from "@/components/blocks/process-section"
import { CTASection } from "@/components/blocks/cta-section"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      <CTASection />
    </main>
  )
}
