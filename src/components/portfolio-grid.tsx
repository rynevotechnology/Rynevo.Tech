"use client";

import Link from "next/link";
import { ArrowRight, Layers3 } from "lucide-react";
import { useMemo, useState } from "react";
import { portfolioCategories, projects } from "@/lib/content/projects";
import { cn } from "@/lib/utils";

export function PortfolioGrid() {
  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Project categories">
        {portfolioCategories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all",
              active === cat
                ? "border-accent bg-accent/15 text-accent2"
                : "border-line bg-card/50 text-ink-2 hover:border-accent/50 hover:text-ink"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <div
            key={project.slug}
            className="group animate-in flex flex-col overflow-hidden rounded-2xl border border-line bg-card/60 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <Link href={`/case-studies/${project.slug}`} className="flex h-full flex-col">
              <div className="relative h-40 overflow-hidden" aria-hidden>
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgb(var(--c-accent) / 0.32), rgb(var(--c-accent2) / 0.24)), radial-gradient(circle at 75% 25%, rgb(var(--c-accent2) / 0.3), transparent 55%), radial-gradient(circle at 20% 85%, rgb(var(--c-accent) / 0.3), transparent 50%)",
                  }}
                />
                <div className="absolute inset-0 grid-backdrop opacity-60" />
                <Layers3 className="absolute right-4 top-4 h-5 w-5 text-white/50" />
                <span className="absolute bottom-3 left-4 rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/90 backdrop-blur">
                  {project.category}
                </span>
                {project.isDemo ? (
                  <span className="absolute right-3 bottom-3 rounded-full bg-accent2/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent2 backdrop-blur">
                    Demo
                  </span>
                ) : (
                  <span className="absolute right-3 bottom-3 rounded-full bg-accent/25 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur">
                    Rynevo build
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-lg font-semibold transition-colors group-hover:text-accent">
                  {project.title}
                </h2>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-ink-2">{project.industry}</p>
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
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-ink-2">No projects in this category yet.</p>
      )}
    </div>
  );
}
