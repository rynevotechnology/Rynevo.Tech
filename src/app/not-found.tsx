import Link from "next/link";
import { Compass } from "lucide-react";
import { services } from "@/lib/content/services";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[75svh] items-center overflow-hidden pt-24" aria-labelledby="notfound-heading">
      <div className="absolute inset-0 grid-backdrop" aria-hidden />
      <div className="glow-orb glow-orb-blue left-1/3 top-10 h-80 w-96" aria-hidden />
      <div className="glow-orb glow-orb-cyan right-1/4 bottom-0 h-60 w-60" aria-hidden />

      <div className="relative mx-auto max-w-2xl px-4 py-20 text-center md:px-6">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-line bg-card/70 text-accent2">
          <Compass className="h-6 w-6" />
        </span>
        <p className="gradient-text mt-8 font-display text-7xl font-bold md:text-8xl">404</p>
        <h1 id="notfound-heading" className="mt-4 font-display text-2xl font-semibold md:text-3xl">
          This page took a wrong turn in the architecture.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-2 md:text-base">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Here&apos;s a compass and a
          few useful destinations:
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#6E7BFF]"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-line px-6 py-3 text-sm font-medium transition-all hover:border-accent hover:text-accent"
          >
            Contact us
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {services.slice(0, 5).map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="rounded-full border border-line bg-card/50 px-4 py-2 text-xs text-ink-2 transition-colors hover:border-accent/50 hover:text-accent"
            >
              {s.shortTitle}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
