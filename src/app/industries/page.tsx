import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries } from "@/lib/content/site";
import { Icon } from "@/components/icon";
import { CtaSection } from "@/components/layout/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Industries Rynevo Technologys works in: healthcare, finance, retail & e-commerce, manufacturing, education and SaaS — with sector-specific engineering considerations.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 md:pt-40" aria-labelledby="industries-hero">
        <div className="absolute inset-0 grid-backdrop" aria-hidden />
        <div className="glow-orb glow-orb-cyan right-1/4 top-0 h-72 w-72" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-accent2">
              Industries
            </span>
            <h1 id="industries-hero" className="font-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              Your industry has <span className="gradient-text">its own physics.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
              Compliance rules, data sensitivity, buyer behaviour, integration reality — domains differ
              in ways templates don&apos;t capture. We work in six sectors where we&apos;ve built real
              operational depth.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-24" aria-label="Industry list">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {industries.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 2) * 0.07}>
                <article className="h-full rounded-2xl border border-line bg-card/60 p-7 transition-all hover:-translate-y-1 hover:border-accent/40">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent2">
                      <Icon name={ind.icon} className="h-5 w-5" />
                    </span>
                    <Link
                      href={`/contact`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent2 opacity-80 transition-all hover:opacity-100"
                    >
                      Discuss your sector
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                  <h2 className="mt-4 font-display text-xl font-semibold">{ind.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{ind.intro}</p>
                  <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-ink">Typical engagements</h3>
                  <ul className="mt-2.5 grid gap-2 sm:grid-cols-2">
                    {ind.useCases.map((u) => (
                      <li key={u} className="flex items-start gap-2 text-[13px] leading-snug text-ink-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent2" />
                        {u}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 rounded-xl border border-line bg-bg-2/50 p-4 text-xs leading-relaxed text-ink-2">
                    <strong className="text-ink">What we weigh first:</strong> {ind.considerations}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        headline="Don't see your industry?"
        subline="Our engineering process is domain-agnostic by design. Tell us your sector and problem — we'll assess it honestly and tell you where our experience maps."
      />
    </>
  );
}
