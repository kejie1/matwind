import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export function Divider({
  className,
  orientation = "horizontal",
  children,
  flexItem,
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
  children?: ReactNode;
  flexItem?: boolean;
}) {
  if (children) {
    return (
      <div role="separator" className={cn("flex items-center gap-4 text-sm text-[var(--md-text-secondary)]", className)}>
        <span className="h-px flex-1 bg-[var(--md-divider)]" />
        {children}
        <span className="h-px flex-1 bg-[var(--md-divider)]" />
      </div>
    );
  }
  if (orientation === "vertical") {
    return (
      <hr
        className={cn(
          "m-0 w-0 self-stretch border-0 border-l border-solid border-[var(--md-divider)]",
          flexItem && "h-auto",
          className,
        )}
      />
    );
  }
  return <hr className={cn("m-0 border-0 border-t border-solid border-[var(--md-divider)]", className)} />;
}
