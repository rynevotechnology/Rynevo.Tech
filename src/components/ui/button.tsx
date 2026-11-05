import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-[#6E7BFF] hover:shadow-[0_0_28px_rgba(88,101,242,0.45)] active:scale-[0.98]",
  secondary:
    "border border-line bg-card/60 text-ink hover:border-accent hover:text-accent active:scale-[0.98]",
  ghost: "text-ink-2 hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm md:text-[15px]",
  lg: "px-7 py-3.5 text-[15px] md:text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ariaLabel,
}: CommonProps & { href: string; ariaLabel?: string }) {
  return (
    <Link href={href} aria-label={ariaLabel} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  );
}

export function Button({
  type = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  onClick,
  disabled,
  ariaLabel,
}: CommonProps & {
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </button>
  );
}

export function ExternalLinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ariaLabel,
}: CommonProps & { href: string; ariaLabel?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </a>
  );
}
