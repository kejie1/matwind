import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export function ButtonGroup({
  variant = "outlined",
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { variant?: "contained" | "outlined" | "text" }) {
  return (
    <div
      {...rest}
      role="group"
      className={cn(
        "inline-flex",
        "[&>button]:rounded-none [&>button:first-child]:rounded-l-[var(--md-radius)] [&>button:last-child]:rounded-r-[var(--md-radius)]",
        variant === "contained" &&
          "rounded-[var(--md-radius)] shadow-[var(--md-elev-2)] [&>button]:shadow-none [&>button]:hover:shadow-none [&>button]:active:shadow-none [&>button:not(:last-child)]:border-r [&>button:not(:last-child)]:border-[rgba(255,255,255,0.32)]",
        variant === "outlined" && "[&>button]:-ml-px [&>button:first-child]:ml-0",
        variant === "text" && "[&>button]:-ml-px [&>button:first-child]:ml-0",
        className,
      )}
    />
  );
}
