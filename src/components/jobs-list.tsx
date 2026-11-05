"use client";

import Link from "next/link";
import { ArrowRight, Briefcase, Info, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { jobCategoryLabels } from "@/lib/content/jobs";

export type JobListing = {
  id: string;
  slug: string;
  title: string;
  category: string;
  jobType: string;
  experience: string;
  location: string;
  remote: boolean;
  summary: string;
  isSample: boolean;
};

export function JobsList({ jobs: allJobs }: { jobs: JobListing[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [jobType, setJobType] = useState("All");
  const [locationType, setLocationType] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(allJobs.map((j) => j.category));
    return ["All", ...Array.from(set)];
  }, [allJobs]);

  const jobTypes = useMemo(() => {
    const set = new Set(allJobs.map((j) => j.jobType));
    return ["All", ...Array.from(set)];
  }, [allJobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allJobs.filter((job) => {
      if (category !== "All" && job.category !== category) return false;
      if (jobType !== "All" && job.jobType !== jobType) return false;
      if (locationType !== "All") {
        if (locationType === "Remote" && !job.remote) return false;
        if (locationType === "On-site" && job.remote) return false;
        if (locationType === "Hybrid" && !job.location.toLowerCase().includes("hybrid")) return false;
      }
      if (q) {
        const hay = `${job.title} ${job.summary} ${jobCategoryLabels[job.category] ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allJobs, query, category, jobType, locationType]);

  const selectCls =
    "rounded-xl border border-line bg-bg-2/60 px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none";

  return (
    <div>
      {/* Filters */}
      <div className="rounded-2xl border border-line bg-card/50 p-5">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-2" />
          <input
            type="search"
            role="searchbox"
            aria-label="Search jobs"
            placeholder="Search positions, skills, teams…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-line bg-bg-2/60 py-3 pl-10 pr-4 text-sm text-ink placeholder:text-ink-2/60 focus:border-accent focus:outline-none"
          />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <label htmlFor="job-category" className="mb-1 block text-xs font-medium text-ink-2">Category</label>
            <select id="job-category" className={cn(selectCls, "w-full")} value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (
                <option key={c} value={c}>{c === "All" ? "All categories" : jobCategoryLabels[c] ?? c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="job-type" className="mb-1 block text-xs font-medium text-ink-2">Job type</label>
            <select id="job-type" className={cn(selectCls, "w-full capitalize")} value={jobType} onChange={(e) => setJobType(e.target.value)}>
              {jobTypes.map((t) => (
                <option key={t} value={t}>{t === "All" ? "All types" : t}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="job-location" className="mb-1 block text-xs font-medium text-ink-2">Location</label>
            <select id="job-location" className={cn(selectCls, "w-full")} value={locationType} onChange={(e) => setLocationType(e.target.value)}>
              {["All", "Remote", "Hybrid", "On-site"].map((l) => (
                <option key={l} value={l}>{l === "All" ? "All locations" : l}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="mt-8 flex flex-col gap-4">
        {filtered.map((job) => (
          <Link
            key={job.id}
            href={`/careers/${job.slug}`}
            className="group flex flex-col gap-4 rounded-2xl border border-line bg-card/60 p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg font-semibold transition-colors group-hover:text-accent">{job.title}</h3>
                <span className="rounded-full bg-accent2/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent2">
                  {job.isSample ? "Sample" : "Open"}
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-ink-2">{job.summary}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-2">
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-accent2" />
                  {jobCategoryLabels[job.category] ?? job.category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-accent2" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1.5 capitalize">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {job.jobType} · {job.experience}
                </span>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors group-hover:border-accent group-hover:text-accent">
              View role
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-line bg-card/50 px-6 py-14 text-center">
            <p className="text-sm text-ink-2">
              No openings match your filters right now. New roles are posted here as they go live —
              or send a proactive message via the{" "}
              <Link href="/contact" className="font-medium text-accent2 hover:text-accent">
                contact form
              </Link>
              .
            </p>
          </div>
        )}
      </div>

      {/* Honesty notice */}
      <div className="mt-10 flex items-start gap-2.5 rounded-xl border border-line bg-card/60 px-4 py-3 text-xs leading-relaxed text-ink-2">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent2" />
        <p>
          Job openings appear here only as they go live — we never display placeholder vacancies.
          Nothing matches your filters right now? Send a proactive message via the{" "}
          <Link href="/contact" className="text-accent2 underline underline-offset-2 hover:text-accent">
            contact form
          </Link>{" "}
          and note your discipline.
        </p>
      </div>
    </div>
  );
}
