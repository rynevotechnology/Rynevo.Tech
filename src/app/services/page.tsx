import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/content/services";
import { Icon } from "@/components/icon";
import { CtaSection } from "@/components/layout/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Sixteen specialized services across engineering, AI, design, growth and consulting — each with its own depth page: process, technologies, FAQs and examples.",
  alternates: { canonical: "/services" },
};

const categories = ["All", "Engineering", "Intelligence", "Design", "Growth", "Advisory"] as const;

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 md:pt-40" aria-labelledby="services-hero">
        <div className="absolute inset-0 grid-backdrop" aria-hidden />
        <div className="glow-orb glow-orb-cyan right-1/4 top-10 h-72 w-72" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-accent2">
              Services
            </span>
            <h1 id="services-hero" className="font-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              Everything a digital product needs, <span className="gradient-text">under one roof.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
              Sixteen specializations across five disciplines — engineered to slot together, so you never
              have to stitch three vendors into one product.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-10 pt-14" aria-label="Service categories">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          {categories.map((cat) => {
            const list = cat === "All" ? services : services.filter((s) => s.category === cat);
            if (!list.length) return null;
            return (
              <div key={cat} className="mb-14 last:mb-0">
                <SectionHeading align="left" eyebrow={cat === "All" ? "All disciplines" : cat} title={<h2 className="font-display text-2xl font-semibold md:text-3xl">{cat === "All" ? "Browse every service" : `${cat} services`}</h2>} />
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((s, i) => (
                    <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                      <Link
                        href={`/services/${s.slug}`}
                        className={cn(
                          "group flex h-full flex-col rounded-2xl border border-line bg-card/60 p-6 transition-all duration-300",
                          "hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_8px_40px_rgba(88,101,242,0.15)]"
                        )}
                      >
                        <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-bg-2 text-accent2 transition-colors group-hover:border-accent/50 group-hover:bg-accent/10">
                          <Icon name={s.icon} className="h-5 w-5" />
                        </span>
                        <h3 className="mt-4 font-display text-[17px] font-semibold">{s.title}</h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">{s.tagline}</p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent2">
                          Service details
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
