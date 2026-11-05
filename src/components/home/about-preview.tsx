import Link from "next/link";
import { ArrowRight, CheckCircle2, Target, Telescope, Gem } from "lucide-react";
import { coreValues } from "@/lib/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function AboutPreview() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" aria-labelledby="about-heading">
      <div className="glow-orb glow-orb-blue left-[-6rem] top-1/3 h-80 w-80" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="About Rynevo"
              title={<span id="about-heading">Engineering the Future of <span className="gradient-text">Digital Innovation</span></span>}
              description="Rynevo Technologys is a technology and software development company built for one purpose: turning ambitious ideas into dependable digital products."
            />
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-xl leading-relaxed text-ink-2">
                We work with startups, small businesses, and enterprises across the full product
                lifecycle — strategy, design, engineering, and long-term evolution. Our teams pair
                pragmatic engineering with genuine product thinking, so what ships is fast today and
                extensible tomorrow.
              </p>
            </Reveal>

            {/* Mission / Vision */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Reveal delay={0.2}>
                <div className="h-full rounded-2xl border border-line bg-card/60 p-5">
                  <Target className="h-5 w-5 text-accent2" />
                  <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider">Our Mission</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">
                    Help businesses of every size harness modern software and AI — without jargon, without
                    waste, without compromise on quality.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.26}>
                <div className="h-full rounded-2xl border border-line bg-card/60 p-5">
                  <Telescope className="h-5 w-5 text-accent2" />
                  <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider">Our Vision</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">
                    To be the engineering partner clients trust through every stage of their growth — from
                    first prototype to platform at scale.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.3}>
              <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent2 transition-colors hover:text-accent">
                Learn more about our story, culture, and values
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          {/* Core values */}
          <div className="grid gap-4 sm:grid-cols-2">
            {coreValues.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-line bg-card/60 p-6 transition-colors hover:border-accent/40">
                  <Gem className="h-5 w-5 text-accent" />
                  <h3 className="mt-3 font-display text-base font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{value.description}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.32} className="sm:col-span-2">
              <div className="flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/5 p-5 text-sm">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent2" />
                <p className="text-ink-2">
                  We publish no invented statistics, team credentials, or client logos. Everything on this
                  site is verifiable by design.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
