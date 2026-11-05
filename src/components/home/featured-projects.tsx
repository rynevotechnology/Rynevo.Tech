import Link from "next/link";
import { ArrowRight, Layers3 } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/lib/content/projects";

/*
 * Homepage selection: real labelled builds are featured first; demo
 * examples fill the remaining slots.
 */
export function FeaturedProjects() {
  const ordered = [
    ...projects.filter((p) => !p.isDemo),
    ...projects.filter((p) => p.isDemo),
  ];
  const featured = ordered.slice(0, 3);

  return (
    <section className="py-20 md:py-28" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Featured work"
            title={<span id="projects-heading">Real builds we've shipped, <span className="gradient-text">documented honestly</span></span>}
            description="AI products, brand websites, and voice assistants — each case study reports verifiable delivery facts instead of invented metrics."
            className="md:max-w-2xl"
          />
          <Link href="/portfolio" className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent">
            View full portfolio
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.07}>
              <Link
                href={`/case-studies/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card/60 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
              >
                {/* Abstract project visual — generated gradient per project */}
                <div className="relative h-44 overflow-hidden" aria-hidden>
                  <div className="absolute inset-0 bg-gradient-to-br" style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgb(var(--c-accent) / 0.35), rgb(var(--c-accent2) / 0.28)), radial-gradient(circle at 70% 30%, rgb(var(--c-accent2) / 0.35), transparent 60%), radial-gradient(circle at 20% 80%, rgb(var(--c-accent) / 0.3), transparent 55%)",
                  }} />
                  <div className="absolute inset-0 grid-backdrop opacity-60" />
                  <Layers3 className="absolute right-5 top-5 h-6 w-6 text-white/60" />
                  <span className="absolute bottom-4 left-5 inline-flex rounded-full bg-black/35 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/90 backdrop-blur">
                    {project.category}
                  </span>
                  {project.isDemo ? (
                    <span className="absolute right-4 bottom-4 rounded-full bg-accent2/20 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-accent2 backdrop-blur">
                      Demo project
                    </span>
                  ) : (
                    <span className="absolute right-4 bottom-4 rounded-full bg-accent/25 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur">
                      Rynevo build
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold transition-colors group-hover:text-accent">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-ink-2">{project.industry}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-2">{project.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((t) => (
                      <span key={t} className="rounded-md border border-line bg-bg-2 px-2 py-1 text-[11px] text-ink-2">{t}</span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent2">
                    View Case Study
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
