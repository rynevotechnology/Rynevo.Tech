import { whyChooseUs } from "@/lib/content/site";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function WhyChooseUs() {
  return (
    <section className="relative py-20 md:py-28" aria-labelledby="why-heading">
      <div className="glow-orb glow-orb-cyan right-0 top-1/4 h-72 w-72" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Rynevo"
          title={<span id="why-heading">Built for the way modern <span className="gradient-text">software gets made</span></span>}
          description="Not just what we build — how we build, and what it's like to work with us."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.06}>
              <div className="group relative h-full rounded-2xl border border-line bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent2">
                  <Icon name={point.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{point.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
