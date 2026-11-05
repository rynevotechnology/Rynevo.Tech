import { processSteps } from "@/lib/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function ProcessTimeline() {
  return (
    <section className="relative border-y border-line bg-bg-2/40 py-20 md:py-28" aria-labelledby="process-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How we work"
          title={<span id="process-heading">A process refined over <span className="gradient-text">hundreds of deliveries</span></span>}
          description="Seven disciplined phases, with visibility for you at every step. No black boxes, no surprise invoices."
        />

        <ol className="relative mt-16 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:gap-y-12">
          {processSteps.map((phase, i) => (
            <Reveal key={phase.step} delay={(i % 3) * 0.08} className="relative">
              <li className="group relative h-full rounded-2xl border border-line bg-card/60 p-6 transition-all duration-300 hover:border-accent/40">
                <span className="font-display text-sm font-bold tracking-[0.2em] text-accent2">{phase.step}</span>
                <span
                  className="absolute right-6 top-6 h-2 w-2 rounded-full bg-accent opacity-40 transition-all duration-300 group-hover:scale-150 group-hover:opacity-100"
                  aria-hidden
                />
                <h3 className="mt-3 font-display text-lg font-semibold">{phase.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{phase.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        {/* Connecting accent line on wide screens */}
        <div className="pointer-events-none absolute inset-x-0 top-[calc(16rem+7rem)] hidden xl:block" aria-hidden>
          <div className="mx-auto h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
        </div>
      </div>
    </section>
  );
}
