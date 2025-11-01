"use client"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesGrid } from "@/components/landing/features-grid"
import { BenefitsSection } from "@/components/landing/benefits-section"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="w-full">
      <Navbar />
      <HeroSection />
      <FeaturesGrid />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
