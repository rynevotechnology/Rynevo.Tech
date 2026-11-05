import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight, CircleDot, Info } from "lucide-react";
import { getProjectBySlug, projects } from "@/lib/content/projects";
import { CtaSection } from "@/components/layout/cta-section";
import { Reveal } from "@/components/ui/reveal";
import { escapeJsonLd } from "@/lib/utils";
import { site } from "@/lib/content/site";

type Params = { params: { slug: string } };

// Every valid slug is known at build time; unknown slugs should hard-404
// (notFound() alone can render the 404 UI with HTTP 200 in fallback mode).
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
    alternates: { canonical: `/case-studies/${project.slug}` },
    openGraph: { title: `${project.title} — Case Study`, description: project.summary, type: "article" },
  };
}

export default function CaseStudyPage({ params }: Params) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();
  const study = project.caseStudy;

  const related = projects.filter((p) => p.slug !== project.slug && p.category === project.category).slice(0, 3);
  const fallbackRelated = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const relatedList = related.length ? related : fallbackRelated;

  const caseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${project.title} — Case Study`,
    description: project.summary,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/case-studies/${project.slug}`,
    ...(project.isDemo ? { note: "Demo/illustrative case study" } : {}),
  };

  return (
    <>
      <article>
        {/* Hero */}
        <header className="relative overflow-hidden pt-32 md:pt-40" aria-labelledby="case-hero">
          <div className="absolute inset-0 grid-backdrop" aria-hidden />
          <div className="glow-orb glow-orb-blue left-1/4 top-0 h-72 w-96" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
            <Reveal>
              <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-ink-2">
                <Link href="/" className="hover:text-accent">Home</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/portfolio" className="hover:text-accent">Portfolio</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-ink">{project.title}</span>
              </nav>
              <Link href="/portfolio" className="inline-flex items-center gap-2 text-xs text-ink-2 transition-colors hover:text-accent">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to portfolio
              </Link>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-line bg-card/70 px-3.5 py-1.5 text-xs font-medium text-accent2">{project.category}</span>
                <span className="rounded-full border border-line bg-card/70 px-3.5 py-1.5 text-xs font-medium text-ink-2">{project.industry}</span>
                <span className="rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-xs font-medium text-accent2">
                  {project.isDemo ? "Demo project · illustrative" : "Rynevo build"} · {study.projectType}
                </span>
              </div>
              <h1 id="case-hero" className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">{project.summary}</p>
            </Reveal>
          </div>
        </header>

        {/* Results strip */}
        <section className="mx-auto max-w-6xl px-4 pt-14 md:px-6 lg:px-8" aria-label="Outcomes">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-3">
              {study.results.map((r) => (
                <div key={r.label} className="rounded-2xl border border-line bg-card/60 p-6 text-center">
                  <p className="gradient-text font-display text-4xl font-bold">{r.metric}</p>
                  <p className="mt-1.5 text-sm font-medium">{r.label}</p>
                  <p className="mt-1 text-[11px] text-ink-2">{r.note}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Body */}
        <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 lg:px-8" aria-label="Case study details">
          <div className="grid gap-8 sm:grid-cols-3">
            <Reveal className="rounded-2xl border border-line bg-card/60 p-5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-ink">Project type</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{study.projectType}</p>
            </Reveal>
            <Reveal delay={0.05} className="rounded-2xl border border-line bg-card/60 p-5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-ink">Duration</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{study.duration}</p>
            </Reveal>
            <Reveal delay={0.1} className="rounded-2xl border border-line bg-card/60 p-5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-ink">Technologies</h2>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <span key={t} className="rounded-md border border-line bg-bg-2 px-2 py-1 text-[11px] text-ink-2">{t}</span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-14">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">The business challenge</h2>
            <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink-2">
              {study.challenge.map((c, i) => <p key={i}>{c}</p>)}
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">Our solution</h2>
            <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink-2">
              {study.solution.map((s, i) => <p key={i}>{s}</p>)}
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">Key features delivered</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {study.keyFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 rounded-xl border border-line bg-card/50 px-4 py-3 text-sm leading-relaxed text-ink-2">
                  <CircleDot className="mt-0.5 h-4 w-4 shrink-0 text-accent2" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">Development process</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{study.process}</p>
          </Reveal>

          <Reveal className="mt-10">
            {project.isDemo ? (
              <div className="flex items-start gap-2.5 rounded-xl border border-line bg-card/60 px-4 py-3 text-xs leading-relaxed text-ink-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent2" />
                <p>
                  This case study is a <strong className="text-ink">fictional demo project</strong> created to
                  illustrate Rynevo&apos;s delivery format and standards. It will be replaced by real,
                  client-approved case studies as engagements conclude.
                </p>
              </div>
            ) : (
              <div className="flex items-start gap-2.5 rounded-xl border border-line bg-card/60 px-4 py-3 text-xs leading-relaxed text-ink-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent2" />
                <p>
                  This is a <strong className="text-ink">real Rynevo project</strong>. Where client-sensitive
                  details exist they are generalised, and reported results are limited to verifiable
                  delivery facts rather than performance claims.
                </p>
              </div>
            )}
          </Reveal>
        </div>

        {/* Related */}
        <section className="mx-auto max-w-6xl px-4 pb-8 md:px-6 lg:px-8" aria-label="Related case studies">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold">Related case studies</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {relatedList.map((p) => (
                <Link
                  key={p.slug}
                  href={`/case-studies/${p.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-card/60 p-6 transition-all hover:-translate-y-1 hover:border-accent/40"
                >
                  <span className="text-xs font-medium uppercase tracking-wider text-accent2">{p.category}</span>
                  <h3 className="mt-2 font-display text-lg font-semibold transition-colors group-hover:text-accent">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">{p.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent2">
                    View case study
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      </article>

      <CtaSection
        headline="Have a project like this in mind?"
        subline="Tell us your version of this challenge. If we can't genuinely help, we'll say so in the first call — and point you somewhere better."
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: escapeJsonLd(caseJsonLd) }} />
    </>
  );
}
