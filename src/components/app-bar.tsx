import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export function AppBar({
  position = "static",
  color = "primary",
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLElement> & {
  position?: "fixed" | "sticky" | "static" | "relative";
  color?: "primary" | "default" | "transparent";
  children?: ReactNode;
}) {
  return (
    <header
      {...rest}
      className={cn(
        "flex w-full shrink-0 flex-col",
        position === "fixed" && "fixed inset-x-0 top-0 z-[1100]",
        position === "sticky" && "sticky top-0 z-[1100]",
        position === "relative" && "relative",
        color === "primary" && "bg-[var(--md-primary)] text-[var(--md-primary-contrast)] shadow-[var(--md-elev-4)]",
        color === "default" && "bg-[#f5f5f5] text-[var(--md-text)] shadow-[var(--md-elev-4)]",
        color === "transparent" && "bg-transparent text-inherit",
        className,
      )}
    >
      {children}
    </header>
  );
}

export function Toolbar({
  dense,
  disableGutters,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { dense?: boolean; disableGutters?: boolean }) {
  return (
    <div
      {...rest}
      className={cn(
        "relative flex w-full items-center",
        dense ? "min-h-12" : "min-h-14 sm:min-h-16",
        !disableGutters && "px-4 sm:px-6",
        className,
      )}
    />
  );
}
