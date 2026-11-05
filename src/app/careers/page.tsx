import type { Metadata } from "next";
import { HeartHandshake, GraduationCap, Laptop2, CalendarHeart, Users, Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { JobsList, type JobListing } from "@/components/jobs-list";
import { CtaSection } from "@/components/layout/cta-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build software that matters at Rynevo Technologys. See how we work, what we offer, and where you fit — real openings are posted here as they go live.",
  alternates: { canonical: "/careers" },
};

export const dynamic = "force-dynamic";

const benefits = [
  { icon: Laptop2, title: "Remote-first flexibility", text: "Work where you're most effective, with overlap hours that respect collaboration." },
  { icon: GraduationCap, title: "Learning budget", text: "Courses, conferences, and certifications funded — learning is part of the job, not bootlegged." },
  { icon: HeartHandshake, title: "Mentorship culture", text: "Named mentors for every engineer. Code review is teaching, we treat it that way." },
  { icon: CalendarHeart, title: "Paid time off that's sacred", text: "Vacation is actually respected — handovers are planned into every project calendar." },
  { icon: Users, title: "Small senior teams", text: "No pyramid staffing — you work alongside seniors, not under layers of them." },
  { icon: Sparkles, title: "Real product ownership", text: "You ship to production early and meet the clients who use what you build." },
];

export default async function CareersPage() {
  const jobs = await prisma.job.findMany({
    where: { published: true },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      jobType: true,
      experience: true,
      location: true,
      remote: true,
      summary: true,
    },
  });

  // Published sample jobs carry the "SAMPLE LISTING" suffix — present the
  // sample flag from the title for UI labelling.
  const listings: JobListing[] = jobs.map((j) => ({
    ...j,
    title: j.title.replace(" — SAMPLE LISTING", " — Sample Listing"),
    isSample: j.title.includes("SAMPLE"),
  }));

  return (
    <>
      <section className="relative overflow-hidden pt-32 md:pt-40" aria-labelledby="careers-hero">
        <div className="absolute inset-0 grid-backdrop" aria-hidden />
        <div className="glow-orb glow-orb-cyan right-1/4 top-0 h-72 w-72" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-accent2">
              Careers
            </span>
            <h1 id="careers-hero" className="font-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              Do the best engineering work <span className="gradient-text">of your career.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
              Small teams, modern stacks, direct client access, and delivery standards you&apos;ll be
              proud to put your name on.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Culture */}
      <section className="py-16 md:py-20" aria-labelledby="culture-heading">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Culture"
            title={<span id="culture-heading">How we actually work</span>}
            description="No mystery-meeting bureaucracy. Written decisions, weekly demos, and engineers who talk to clients. If you like visible impact, you'll fit."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-card/60 p-6 transition-colors hover:border-accent/40">
                  <b.icon className="h-5 w-5 text-accent2" />
                  <h3 className="mt-3.5 font-display text-base font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="border-y border-line bg-bg-2/40 py-16 md:py-20" aria-labelledby="openings-heading">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Open positions"
            title={<span id="openings-heading">Roles where you could <span className="gradient-text">make an impact</span></span>}
            description="Filter by discipline, type, and location. Every listing links to a full role description and an application form."
          />
          <div className="mt-12">
            <JobsList jobs={listings} />
          </div>
        </div>
      </section>

      <CtaSection
        headline="No perfect match? Introduce yourself anyway."
        subline="Send a message via our contact form and note the discipline you're interested in — we keep strong profiles on file for the next opening."
        primaryLabel="Introduce Yourself"
        primaryHref="/contact"
        secondaryLabel="Explore Expertise"
      />
    </>
  );
}
