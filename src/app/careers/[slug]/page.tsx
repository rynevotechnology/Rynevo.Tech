import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, ChevronRight, MapPin, Clock3, Info } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { jobCategoryLabels } from "@/lib/content/jobs";
import { ApplicationForm } from "@/components/forms/application-form";
import { Reveal } from "@/components/ui/reveal";

export const dynamic = "force-dynamic";

type Params = { params: { slug: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const job = await prisma.job.findUnique({ where: { slug: params.slug } });
  if (!job) return { title: "Position not found" };
  return {
    title: `${job.title} — Careers`,
    description: job.summary,
    alternates: { canonical: `/careers/${job.slug}` },
  };
}

/** Render the "\n" separated bullet blocks into readable lists. */
function BulletBlock({ text }: { text: string }) {
  const lines = text.split("\n").filter((l) => l.trim());
  return (
    <ul className="space-y-3">
      {lines.map((line, i) => (
        <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent2" />
          <span>{line.replace(/^-\s*/, "")}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function JobDetailPage({ params }: Params) {
  const job = await prisma.job.findUnique({ where: { slug: params.slug } });
  if (!job || !job.published) notFound();

  const isSample = job.title.includes("SAMPLE");

  return (
    <article className="pb-8">
      {/* Hero */}
      <header className="relative overflow-hidden pt-32 md:pt-40" aria-labelledby="job-hero">
        <div className="absolute inset-0 grid-backdrop" aria-hidden />
        <div className="glow-orb glow-orb-blue left-1/4 top-0 h-72 w-96" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-ink-2">
              <Link href="/" className="hover:text-accent">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/careers" className="hover:text-accent">Careers</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-ink">{job.category ? jobCategoryLabels[job.category] : job.slug}</span>
            </nav>
            <Link href="/careers" className="inline-flex items-center gap-2 text-xs text-ink-2 transition-colors hover:text-accent">
              <ArrowLeft className="h-3.5 w-3.5" /> All positions
            </Link>
            <div className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-3.5 py-1.5 text-xs font-medium text-accent2">
                {job.category ? jobCategoryLabels[job.category] : ""}
              </span>
              <h1 id="job-hero" className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight md:text-5xl">
                {job.title.replace(" — SAMPLE LISTING", " — Sample Listing")}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-2">
                <span className="inline-flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-accent2" /> {job.location}</span>
                <span className="inline-flex items-center gap-1.5"><Clock3 className="h-4 w-4 text-accent2" /> <span className="capitalize">{job.jobType}</span></span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-accent2" /> {job.experience}</span>
                {job.remote && <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent2">Remote-friendly</span>}
              </div>
            </div>
            {isSample && (
              <div className="mt-7 flex items-start gap-2.5 rounded-xl border border-line bg-card/60 px-4 py-3 text-xs leading-relaxed text-ink-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent2" />
                <p>
                  This is a <strong className="text-ink">sample listing</strong> demonstrating our format.
                  It is not a live vacancy. You may still submit a proactive application — it will be
                  routed to our talent pipeline.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto grid max-w-5xl gap-12 px-4 py-16 md:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <div className="space-y-12">
          <Reveal>
            <section aria-labelledby="about-role">
              <h2 id="about-role" className="font-display text-2xl font-semibold">About the role</h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink-2">
                {job.description.split("\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          </Reveal>
          <Reveal>
            <section aria-labelledby="resp">
              <h2 id="resp" className="font-display text-2xl font-semibold">What you&apos;ll do</h2>
              <div className="mt-4">
                <BulletBlock text={job.responsibilities} />
              </div>
            </section>
          </Reveal>
          <Reveal>
            <section aria-labelledby="reqs">
              <h2 id="reqs" className="font-display text-2xl font-semibold">What we&apos;re looking for</h2>
              <div className="mt-4">
                <BulletBlock text={job.requirements} />
              </div>
            </section>
          </Reveal>
        </div>

        {/* Application */}
        <aside className="top-28 self-start rounded-3xl border border-line bg-card/50 p-6 md:p-8 lg:sticky" aria-label="Apply">
          <h2 className="font-display text-xl font-semibold">Apply for this position</h2>
          <p className="mt-1.5 text-sm text-ink-2">Attach your resume and tell us about yourself.</p>
          <div className="mt-7">
            <ApplicationForm jobId={job.id} jobTitle={job.title.replace(" — SAMPLE LISTING", "")} />
          </div>
        </aside>
      </div>
    </article>
  );
}
