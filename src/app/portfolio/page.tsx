import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { CtaSection } from "@/components/layout/cta-section";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Portfolio and case studies of Rynevo Technologys' real builds — the AI Study Assistant, the Nilkanth Farshan snacks-brand website, and the Mini Voice Assistant.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 md:pt-40" aria-labelledby="portfolio-hero">
        <div className="absolute inset-0 grid-backdrop" aria-hidden />
        <div className="glow-orb glow-orb-blue left-1/4 top-0 h-72 w-96" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-accent2">
              Our work
            </span>
            <h1 id="portfolio-hero" className="font-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              Real builds, documented <span className="gradient-text">the honest way.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
              Every case study below is a project we actually delivered. Our results sections use
              verifiable structural facts — feature counts, timelines, capabilities — instead of
              invented performance metrics.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <PortfolioGrid />
        </div>
      </section>

      <CtaSection
        headline="Want a project like this?"
        subline="Each build here followed the same path: one scoping call, one plan, disciplined sprints, and a launch that holds up. Yours starts the same way."
      />
    </>
  );
}
