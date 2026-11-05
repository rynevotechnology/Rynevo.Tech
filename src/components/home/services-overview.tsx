import { services } from "@/lib/content/services";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const featured = ["website-design-development", "ai-machine-learning", "mobile-app-development", "custom-software-development", "ui-ux-design", "cloud-solutions"];

export function ServicesOverview() {
  const cards = services.filter((s) => featured.includes(s.slug));

  return (
    <section className="relative py-20 md:py-28" aria-labelledby="services-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we do"
          title={<><span id="services-heading">Services engineered around</span> <span className="gradient-text">your outcomes</span></>}
          description="From your first landing page to fully automated AI operations — one partner across the entire digital stack."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.06}>
              <Link
                href={`/services/${service.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_8px_40px_rgba(88,101,242,0.15)]"
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-bg-2 text-accent2 transition-colors duration-300 group-hover:border-accent/50 group-hover:bg-accent/10">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{service.title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-2">{service.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent2">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent">
            View all 16 services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
