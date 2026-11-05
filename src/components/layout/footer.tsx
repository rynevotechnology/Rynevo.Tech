import Link from "next/link";
import { ArrowUpRight, Github, Instagram, Mail } from "lucide-react";
import { services } from "@/lib/content/services";
import { site } from "@/lib/content/site";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Expertise", href: "/expertise" },
      { label: "Industries", href: "/industries" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Case Studies", href: "/portfolio" },
      { label: "Careers", href: "/careers" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line bg-bg-2">
      <div className="glow-orb glow-orb-blue -top-40 left-1/4 h-72 w-72" aria-hidden />
      <div className="glow-orb glow-orb-cyan bottom-0 right-0 h-64 w-64" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent2 font-display text-lg font-bold text-white">
                R
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[15px] font-bold tracking-wide">RYNEVO</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-ink-2">Technologys</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-2">
              {site.description}
            </p>
            <div className="mt-5 flex gap-3">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:border-accent hover:text-accent">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={site.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:border-accent hover:text-accent">
                <Github className="h-4 w-4" />
              </a>
              <a href={`mailto:${site.contact.email}`} aria-label="Email" className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:border-accent hover:text-accent">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {columns[0].links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-ink-2 transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {services.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-ink-2 transition-colors hover:text-accent">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="inline-flex items-center gap-1 text-sm font-medium text-accent2 hover:text-accent">
                  All services
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-2">
              <li>
                <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-accent">
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:+91${site.contact.phone}`} className="transition-colors hover:text-accent">
                  {site.contact.phone}
                </a>
                {" · "}
                <a href={`tel:+91${site.contact.phoneAlt}`} className="transition-colors hover:text-accent">
                  {site.contact.phoneAlt}
                </a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent2 transition-colors hover:bg-accent/20"
            >
              Start your project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-ink-2 md:flex-row">
          <p>© {new Date().getFullYear()} Rynevo Technologys. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/sitemap.xml" className="hover:text-accent">Sitemap</Link>
            <Link href="/admin" className="hover:text-accent">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
