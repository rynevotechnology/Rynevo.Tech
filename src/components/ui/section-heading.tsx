import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-accent2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent2 animate-pulseGlow" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl leading-tight font-semibold md:text-4xl lg:text-[2.6rem]">{title}</h2>
      {description && (
        <p className={cn("max-w-2xl text-base leading-relaxed text-ink-2", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
