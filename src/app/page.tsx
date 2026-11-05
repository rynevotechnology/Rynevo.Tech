import { Hero } from "@/components/home/hero";
import { TechMarquee } from "@/components/home/tech-marquee";
import { ServicesOverview } from "@/components/home/services-overview";
import { AboutPreview } from "@/components/home/about-preview";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { CtaSection } from "@/components/layout/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <ServicesOverview />
      <AboutPreview />
      <WhyChooseUs />
      <FeaturedProjects />
      <ProcessTimeline />
      <CtaSection />
    </>
  );
}
