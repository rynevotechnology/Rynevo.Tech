import type { Metadata } from "next";
import { ArrowRight, Compass, Gem, HeartHandshake, Lightbulb, ShieldCheck, Telescope, Users, Wrench } from "lucide-react";
import { coreValues } from "@/lib/content/site";
import { CtaSection } from "@/components/layout/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Rynevo Technologys is a technology and software development company engineering dependable digital products — our story, mission, vision, values, and culture.",
  alternates: { canonical: "/about" },
};

const philosophy = [
  { icon: Compass, title: "Strategy before stack", text: "Every engagement starts from business goals and user reality — technology choices follow from that, not the other way around." },
  { icon: Wrench, title: "Pragmatism over fashion", text: "We use proven, boring technology where it serves you, and reach for the frontier only where it genuinely helps." },
  { icon: ShieldCheck, title: "Quality as standard", text: "Testing, code review, accessibility, and documentation are baseline practice on every project — not premium add-ons." },
  { icon: HeartHandshake, title: "Partnership over project", text: "We measure our value by our clients' outcomes over years, and design our services to earn that continuity." },
];

const culturePillars = [
  "Direct access to the engineers building your product",
  "Weekly demos and honest progress reporting",
  "Written communication first — decisions get documented",
  "Continuous learning budgeted into every delivery role",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 md:pt-40" aria-labelledby="about-hero">
        <div className="absolute inset-0 grid-backdrop" aria-hidden />
        <div className="glow-orb glow-orb-blue left-1/3 top-0 h-80 w-96" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-accent2">
              <Lightbulb className="h-3.5 w-3.5" />
              About us
            </span>
            <h1 id="about-hero" className="font-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              Engineering the Future of <span className="gradient-text">Digital Innovation.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
              Rynevo Technologys is a technology and software development company helping startups,
              small businesses, and enterprises build innovative digital products — the kind that
              survive scale, teams, and time.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-24" aria-labelledby="story-heading">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <h2 id="story-heading" className="font-display text-3xl font-semibold md:text-4xl">
              Who we are — <span className="gradient-text">and how we work</span>
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-2">
              <p>
                Rynevo Technologys was founded by engineers and product people who kept seeing the same
                failure pattern in the industry: agencies that sell beautifully, start impressively, and
                disappear right after launch. We built the company to be the opposite of that pattern —
                measured in claims, honest in estimates, and present for years after delivery.
              </p>
              <p>
                We don&apos;t make claims we can&apos;t verify. That&apos;s why this page contains no invented
                founding dates, no fabricated team biographies, and no borrowed logos. Everything we
                publish about ourselves is either true, or explicitly marked as an example or placeholder.
              </p>
              <p>
                What defines us is the way we work: small senior teams, transparent communication,
                disciplined quality practice, and technology choices made for your third year — not our
                portfolio this quarter.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Telescope,
                title: "Our Vision",
                text: "To be the engineering partner clients trust through every stage of growth — from first prototype to platform at scale.",
              },
              {
                icon: Gem,
                title: "Our Mission",
                text: "To help businesses of every size harness modern software and AI without jargon, waste, or compromised quality.",
              },
              {
                icon: Users,
                title: "Our Clients",
                text: "Startups validating an idea, SMBs digitizing operations, and enterprises modernizing systems that carry real weight.",
              },
              {
                icon: ShieldCheck,
                title: "Our Standard",
                text: "No black boxes. No vanity metrics. Work you can inspect at any point, from any role on your side.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-line bg-card/60 p-6 transition-colors hover:border-accent/40">
                  <item.icon className="h-5 w-5 text-accent2" />
                  <h3 className="mt-3 font-display text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-line bg-bg-2/40 py-20 md:py-24" aria-labelledby="values-heading">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Core values"
            title={<span id="values-heading">Four principles we <span className="gradient-text">actually enforce</span></span>}
            description="Values mean little in a slide deck. These are the ones our process makes hard to violate."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-line bg-card/60 p-6">
                  <span className="font-display text-sm font-bold text-accent2">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-base font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy & culture */}
      <section className="py-20 md:py-24" aria-labelledby="philosophy-heading">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Development philosophy"
                title={<span id="philosophy-heading">How we approach <span className="gradient-text">engineering</span></span>}
              />
              <div className="mt-10 space-y-6">
                {philosophy.map((p, i) => (
                  <Reveal key={p.title} delay={i * 0.06}>
                    <div className="flex gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent2">
                        <p.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-base font-semibold">{p.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink-2">{p.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading
                align="left"
                eyebrow="Company culture"
                title={<span id="culture-heading">The culture your project <span className="gradient-text">will feel</span></span>}
                description="Culture isn't a perks list — it's what your team notices in week one of working with us."
              />
              <div className="mt-10 rounded-2xl border border-line bg-card/60 p-6">
                <ul className="space-y-4">
                  {culturePillars.map((c, i) => (
                    <Reveal key={c} delay={i * 0.06}>
                      <li className="flex items-start gap-3 text-sm leading-relaxed text-ink-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent2" />
                        {c}
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
              <Reveal delay={0.3}>
                <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/5 p-6">
                  <h3 className="text-sm font-semibold text-ink">A note on our team pages</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">
                    We don&apos;t publish a fabricated leadership team. Our leadership profiles will be
                    added here — with real names, roles, and photos — before public launch. If you need
                    credentials for a proposal, ask us directly and we&apos;ll introduce the people on
                    your project.
                  </p>
                  <a href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent2 hover:text-accent">
                    Request a team introduction
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Technology expertise teaser */}
      <section className="border-t border-line bg-bg-2/40 py-20 md:py-24" aria-labelledby="expertise-heading">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Technology expertise"
            title={<span id="expertise-heading">Deep in the stack, fluent in <span className="gradient-text">the business layer</span></span>}
            description="Web, mobile, cloud, AI/ML, generative AI, automation, and enterprise systems — with architects who connect them."
          />
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {["Web Platforms", "Mobile Apps", "AI & ML", "Generative AI", "Cloud & DevOps", "Enterprise Systems", "Automation", "Data & Analytics"].map((tag, i) => (
              <Reveal key={tag} delay={i * 0.04}>
                <span className="rounded-full border border-line bg-card/70 px-5 py-2.5 text-sm font-medium text-ink-2">{tag}</span>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.25}>
            <a href="/expertise" className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#6E7BFF]">
              Explore our expertise
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
