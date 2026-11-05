import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Atom, CloudCog, Database, Gauge, Layers, Smartphone, Workflow } from "lucide-react";
import { CtaSection } from "@/components/layout/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TechIcon } from "@/components/tech-icon";

export const metadata: Metadata = {
  title: "Our Expertise",
  description:
    "The engineering depth of Rynevo Technologys: platform architecture, AI systems, cloud operations, data engineering and product design — and how we apply them.",
  alternates: { canonical: "/expertise" },
};

const competencies = [
  {
    icon: Layers,
    title: "Product & Platform Architecture",
    body: "Modular monoliths and microservices chosen on merit, API-first design, event-driven patterns, and data models designed to survive five years of growth — not just the launch demo.",
    tags: ["System design", "API contracts", "Event-driven", "Domain modelling"],
  },
  {
    icon: Atom,
    title: "AI & Applied Intelligence",
    body: "From data audits and model prototyping to production MLOps and LLM systems with guardrails. We ship AI that measurably beats baselines — and tell you when it won't.",
    tags: ["ML pipelines", "LLM/RAG", "MLOps", "Evaluation harnesses"],
  },
  {
    icon: Smartphone,
    title: "Frontend & Mobile Craft",
    body: "React, Next.js, Flutter — interfaces where performance budgets, accessibility, and design systems are enforced by CI, not by goodwill.",
    tags: ["Core Web Vitals", "Design systems", "Flutter", "Accessibility"],
  },
  {
    icon: CloudCog,
    title: "Cloud & DevOps",
    body: "Infrastructure as code, containerized platforms, zero-drama CI/CD, observability, and cost governance on AWS, Azure, or GCP.",
    tags: ["IaC", "CI/CD", "Observability", "Cost optimization"],
  },
  {
    icon: Database,
    title: "Data Engineering",
    body: "Warehousing and pipelines that turn scattered operational data into one trusted reporting layer — with lineage, tests, and freshness guarantees.",
    tags: ["ETL", "Warehousing", "Data quality", "Analytics layers"],
  },
  {
    icon: Workflow,
    title: "Automation & Integration",
    body: "Process automation across SaaS and custom systems, third-party integrations, and workflow engines with retries, audit trails, and monitoring.",
    tags: ["Workflow engines", "ESB patterns", "Webhooks", "RPA-lite"],
  },
];

const stackGroups: { name: string; items: string[] }[] = [
  { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { name: "Backend", items: ["Node.js", "Python", "PHP", "Laravel", "Flask"] },
  { name: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "TensorFlow"] },
  { name: "Mobile", items: ["Flutter", "Swift", "Kotlin"] },
  { name: "Cloud", items: ["AWS", "Kubernetes", "Docker", "Firebase", "Stripe", "OpenAI"] },
];

const engMetrics = [
  { title: "Peer-reviewed", note: "Every change is code-reviewed before merge — no exceptions." },
  { title: "CI-gated", note: "Builds, tests, and lint pass in CI on every branch." },
  { title: "Documented", note: "Architecture and runbooks shipped with every project." },
  { title: "Monitored", note: "Observability installed before launch, not after incidents." },
];

export default function ExpertisePage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 md:pt-40" aria-labelledby="expertise-hero">
        <div className="absolute inset-0 grid-backdrop" aria-hidden />
        <div className="glow-orb glow-orb-blue left-1/4 top-0 h-72 w-96" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-accent2">
              Our expertise
            </span>
            <h1 id="expertise-hero" className="font-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              Depth where it matters. <span className="gradient-text">Discipline everywhere.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
              Six competency pillars and a stack chosen for maintainability — plus engineering metrics
              clients can verify without an audit.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Competencies */}
      <section className="py-20 md:py-24" aria-labelledby="competencies">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Competencies"
            title={<span id="competencies">Six pillars of <span className="gradient-text">engineering depth</span></span>}
            description="These are the areas where our specialists build on real production experience — the pillars combine to cover the full product lifecycle."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {competencies.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.06}>
                <div className="group flex h-full flex-col rounded-2xl border border-line bg-card/60 p-6 transition-all hover:-translate-y-1 hover:border-accent/40">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent2">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">{c.body}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.tags.map((t) => (
                      <span key={t} className="rounded-md border border-line bg-bg-2 px-2 py-1 text-[11px] text-ink-2">{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="border-y border-line bg-bg-2/40 py-20 md:py-24" aria-labelledby="stack-heading">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Technology stack"
            title={<span id="stack-heading">A deliberately <span className="gradient-text">maintainable stack</span></span>}
            description="Core technologies we build with weekly — chosen for durability, hiring depth, and tooling maturity."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            {stackGroups.map((g, gi) => (
              <Reveal key={g.name} delay={gi * 0.06}>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent2">{g.name}</h3>
                  <ul className="mt-4 space-y-3">
                    {g.items.map((t) => (
                      <li key={t} className="flex items-center gap-2.5 rounded-xl border border-line bg-card/60 px-3.5 py-2.5 text-sm text-ink-2">
                        <TechIcon name={t} className="h-5 w-5" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering practice */}
      <section className="py-20 md:py-24" aria-labelledby="practice-heading">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Engineering practice"
                title={<span id="practice-heading">Verifiable by design</span>}
                description="We show the practices instead of quoting unverifiable statistics. Any client can inspect these in-repo at any point in an engagement."
              />
              <p className="mt-6 max-w-xl inline-flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent/5 p-5 text-sm leading-relaxed text-ink-2">
                <Gauge className="mt-0.5 h-5 w-5 shrink-0 text-accent2" />
                Our published case studies report verifiable delivery facts. Marketing performance
                claims appear only when backed by tracking data — the same standard applies to our
                own site.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {engMetrics.map((m, i) => (
                <Reveal key={m.title} delay={i * 0.06}>
                  <div className="h-full rounded-2xl border border-line bg-card/60 p-6">
                    <h3 className="font-display text-lg font-semibold text-accent2">{m.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">{m.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.2}>
            <Link href="/services" className="mt-14 inline-flex items-center gap-2 text-sm font-medium text-accent2 hover:text-accent">
              See how expertise turns into services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
