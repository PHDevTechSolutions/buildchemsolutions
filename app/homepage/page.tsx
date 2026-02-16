import { Hero } from "@/components/homepage/hero";
import { LogoSection } from "@/components/homepage/logo-section";
import { ProblemSection } from "@/components/homepage/problem-section";
import { SolutionSection } from "@/components/homepage/solution-section";
import { FeaturesSection } from "@/components/homepage/features-section";
import { TestimonialsSection } from "@/components/homepage/testimonials-section";
import { PricingSection } from "@/components/homepage/pricing-section";
import { FaqSection } from "@/components/homepage/faq-section";
import { CtaSection } from "@/components/homepage/cta-section";
import { Footer } from "@/components/homepage/footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <LogoSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
