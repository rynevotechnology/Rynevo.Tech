"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/**
 * Floating brand mark: gradient "R" tile + wordmark.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" aria-label="Rynevo Technologys — home" className="group inline-flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-accent to-accent2 shadow-[0_0_18px_rgba(88,101,242,0.5)] transition-transform duration-300 group-hover:scale-105">
        <span className="font-display text-lg font-bold text-white">R</span>
        <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-bold tracking-wide">RYNEVO</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-ink-2">Technologys</span>
        </span>
      )}
    </Link>
  );
}
