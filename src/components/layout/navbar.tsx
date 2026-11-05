"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { mainNav, site } from "@/lib/content/site";
import { Logo } from "../logo";
import { ThemeToggle } from "../theme-toggle";
import { ButtonLink } from "../ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null); // desktop dropdown
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer + dropdowns whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
    setMobileExpanded(null);
  }, [pathname]);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape closes overlays
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const enterMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const exitMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "border-b border-line bg-bg/85 backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-[72px] md:px-6 lg:px-8">
          <Logo />

          {/* ── Desktop nav ─────────────────────────────────────────── */}
          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.map((link) => (
              <li key={link.label} className="relative" onMouseEnter={() => link.children && enterMenu(link.label)} onMouseLeave={exitMenu}>
                <Link
                  href={link.href}
                  aria-expanded={link.children ? openMenu === link.label : undefined}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors",
                    isActive(link.href) ? "text-ink" : "text-ink-2 hover:text-ink"
                  )}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", openMenu === link.label && "rotate-180")} />
                  )}
                  {isActive(link.href) && (
                    <motion.span layoutId="nav-active" className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-accent to-accent2" />
                  )}
                </Link>

                {link.children && (
                  <AnimatePresence>
                    {openMenu === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full z-50 w-[34rem] max-w-[92vw] -translate-x-1/2 pt-3"
                      >
                        <div className="glass grid grid-cols-2 gap-1 rounded-2xl p-3 shadow-2xl shadow-black/30">
                          <Link
                            href={link.href}
                            className="col-span-2 mb-1 flex items-center justify-between rounded-xl border border-line/60 bg-accent/5 px-4 py-3 transition-colors hover:border-accent/40"
                          >
                            <span>
                              <span className="block text-sm font-semibold">All {link.label}</span>
                              <span className="block text-xs text-ink-2">Browse the full overview</span>
                            </span>
                            <ArrowRight className="h-4 w-4 text-accent" />
                          </Link>
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="rounded-xl px-4 py-2.5 transition-colors hover:bg-accent/10"
                            >
                              <span className="block text-[13px] font-medium">{child.label}</span>
                              {child.description && <span className="block text-xs text-ink-2">{child.description}</span>}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>

          {/* ── Actions ─────────────────────────────────────────────── */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex">
              Start a Project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </ButtonLink>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile drawer ───────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[86vw] max-w-sm flex-col overflow-y-auto border-l border-line bg-bg-2 px-6 py-6 lg:hidden"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between">
                <Logo compact={false} />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav aria-label="Mobile" className="mt-8 flex flex-col gap-1">
                {mainNav.map((link) => (
                  <div key={link.label}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href}
                        className={cn(
                          "flex-1 rounded-lg px-3 py-2.5 text-[15px] font-medium",
                          isActive(link.href) ? "text-accent" : "text-ink"
                        )}
                      >
                        {link.label}
                      </Link>
                      {link.children && (
                        <button
                          type="button"
                          aria-label={`Toggle ${link.label} submenu`}
                          aria-expanded={mobileExpanded === link.label}
                          onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                          className="grid h-9 w-9 place-items-center rounded-lg text-ink-2"
                        >
                          <ChevronDown
                            className={cn("h-4 w-4 transition-transform", mobileExpanded === link.label && "rotate-180")}
                          />
                        </button>
                      )}
                    </div>
                    {link.children && mobileExpanded === link.label && (
                      <div className="ml-4 flex flex-col gap-0.5 border-l border-line pl-3">
                        <Link href={link.href} className="rounded-lg px-3 py-2 text-sm text-accent2">
                          All {link.label}
                        </Link>
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="rounded-lg px-3 py-2 text-sm text-ink-2 hover:text-ink"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3 pt-8">
                <ButtonLink href="/contact" size="lg" className="w-full">
                  Start a Project
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <p className="text-center text-xs text-ink-2">{site.contact.responseTime}</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
