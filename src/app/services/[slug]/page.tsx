import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, MessageSquare } from "lucide-react";
import { services, getServiceBySlug } from "@/lib/content/services";
import { getProjectBySlug } from "@/lib/content/projects";
import { Icon } from "@/components/icon";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { CtaSection } from "@/components/layout/cta-section";
import { escapeJsonLd } from "@/lib/utils";
import { site } from "@/lib/content/site";

type Params = { params: { slug: string } };

// Every valid slug is known at build time; unknown slugs should hard-404
// (notFound() alone can render the 404 UI with HTTP 200 in fallback mode).
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      type: "website",
    },
  };
}

export default function ServicePage({ params }: Params) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const related = service.relatedProjects.map((slug) => getProjectBySlug(slug)).filter(Boolean);
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 4);

  // Schema.org SoftwareService structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    serviceType: service.category,
    areaServed: "Worldwide",
    url: `${site.url}/services/${service.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 md:pt-40" aria-labelledby="service-hero">
        <div className="absolute inset-0 grid-backdrop" aria-hidden />
        <div className="glow-orb glow-orb-blue left-1/4 top-0 h-80 w-96" aria-hidden />
        <div className="glow-orb glow-orb-cyan right-0 top-1/3 h-64 w-64" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-ink-2">
              <Link href="/" className="hover:text-accent">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/services" className="hover:text-accent">Services</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-ink">{service.title}</span>
            </nav>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-card/80 text-accent2 shadow-lg">
                  <Icon name={service.icon} className="h-6 w-6" />
                </span>
                <h1 id="service-hero" className="mt-6 font-display text-4xl font-semibold leading-tight md:text-5xl">
                  {service.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base text-accent2 md:text-lg">{service.tagline}</p>
              </div>
              <ButtonLink href="/contact" size="lg" className="shrink-0">
                <MessageSquare className="h-4 w-4" />
                Discuss this service
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Intro + benefits */}
      <section className="py-20 md:py-24" aria-labelledby="service-intro">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 md:px-6 lg:grid-cols-[1.35fr_1fr] lg:px-8">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl font-semibold md:text-3xl" id="service-intro">
                How we approach it
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-2">
                {service.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-7">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">What you gain</h3>
              <ul className="mt-4 space-y-3">
                {service.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent2" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-line bg-bg-2/40 py-20 md:py-24" aria-labelledby="service-features">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold md:text-4xl" id="service-features">
              What the engagement includes
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-card/60 p-6 transition-colors hover:border-accent/40">
                  <span className="font-display text-sm font-bold text-accent2">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2.5 font-display text-base font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{f.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process + Technologies */}
      <section className="py-20 md:py-24" aria-labelledby="service-process">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 md:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-semibold md:text-3xl" id="service-process">
                Development process
              </h2>
            </Reveal>
            <ol className="relative mt-8 space-y-6 before:absolute before:bottom-2 before:left-[15px] before:top-2 before:w-px before:bg-gradient-to-b before:from-accent/50 before:via-accent/20 before:to-transparent">
              {service.process.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.05}>
                  <li className="relative flex gap-5 pl-0">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-accent/50 bg-bg font-display text-xs font-bold text-accent2">
                      {i + 1}
                    </span>
                    <div className="pb-1">
                      <h3 className="text-[15px] font-semibold">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-2">{step.description}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <Reveal delay={0.1}>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">Technologies we use</h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {service.technologies.map((t, i) => (
                <Reveal key={t} delay={(i % 6) * 0.04}>
                  <div className="grid place-items-center rounded-xl border border-line bg-card/60 px-3 py-4 text-center text-[13px] font-medium text-ink-2 transition-colors hover:border-accent/40 hover:text-ink">
                    {t}
                  </div>
                </Reveal>
              ))}
            </div>

            {related.length > 0 && (
              <Reveal delay={0.15}>
                <div className="mt-10 rounded-2xl border border-line bg-card/60 p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">Relevant project examples</h3>
                  <ul className="mt-4 space-y-3">
                    {related.map(
                      (p) =>
                        p && (
                          <li key={p.slug}>
                            <Link href={`/case-studies/${p.slug}`} className="group flex items-center justify-between rounded-xl border border-line bg-bg-2/50 px-4 py-3 transition-colors hover:border-accent/40">
                              <span>
                                <span className="block text-sm font-medium">{p.title}</span>
                                <span className="block text-xs text-ink-2">{p.industry}</span>
                              </span>
                              <ArrowRight className="h-4 w-4 text-accent2 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-y border-line bg-bg-2/40 py-20 md:py-24" aria-labelledby="service-faqs">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold md:text-4xl" id="service-faqs">
              Frequently asked questions
            </h2>
          </Reveal>
          <div className="mt-10">
            <Accordion items={service.faqs} />
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="py-16 md:py-20" aria-label="Related services">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-semibold">
            Complementary <span className="gradient-text">services</span>
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full items-center justify-between rounded-xl border border-line bg-card/60 px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-accent/50"
                >
                  <span className="flex items-center gap-3 text-sm font-medium">
                    <Icon name={s.icon} className="h-4 w-4 text-accent2" />
                    {s.shortTitle}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ink-2 transition-all group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        headline={`Ready to start your ${service.shortTitle.toLowerCase()} project?`}
        subline={`Book a free 30-minute scoping call. We'll assess fit honestly, outline an approach, and give you a realistic estimate for your ${service.shortTitle.toLowerCase()} needs.`}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: escapeJsonLd(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: escapeJsonLd(faqJsonLd) }} />
    </>
  );
}
