import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

const elev: Record<number, string> = {
  0: "shadow-none",
  1: "shadow-[var(--md-elev-1)]",
  2: "shadow-[var(--md-elev-2)]",
  4: "shadow-[var(--md-elev-4)]",
  8: "shadow-[var(--md-elev-8)]",
  24: "shadow-[var(--md-elev-24)]",
};

export function Paper({
  elevation = 1,
  variant = "elevation",
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { elevation?: 0 | 1 | 2 | 4 | 8 | 24; variant?: "elevation" | "outlined" }) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-[var(--md-radius)] bg-white text-[var(--md-text)]",
        variant === "outlined" ? "shadow-none ring-1 ring-[var(--md-divider)]" : elev[elevation],
        className,
      )}
    />
  );
}
