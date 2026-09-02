import type { SVGAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export function SvgIcon({
  color = "inherit",
  fontSize = "medium",
  viewBox = "0 0 24 24",
  className,
  children,
  ...rest
}: SVGAttributes<SVGSVGElement> & {
  color?: "inherit" | "primary" | "secondary" | "error" | "action" | "disabled";
  fontSize?: "inherit" | "small" | "medium" | "large";
  children?: ReactNode;
}) {
  return (
    <svg
      {...rest}
      viewBox={viewBox}
      aria-hidden
      className={cn(
        "inline-block shrink-0 fill-current select-none",
        fontSize === "small" && "text-[1.25rem]",
        fontSize === "medium" && "text-2xl",
        fontSize === "large" && "text-[2.1875rem]",
        color === "primary" && "text-[var(--md-primary)]",
        color === "secondary" && "text-[var(--md-secondary)]",
        color === "error" && "text-[var(--md-error)]",
        color === "action" && "text-[var(--md-action-active)]",
        color === "disabled" && "text-[var(--md-action-disabled)]",
        className,
      )}
    >
      {children}
    </svg>
  );
}
