import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { LinearProgress } from "./progress";

export function MobileStepper({
  steps,
  activeStep,
  variant = "dots",
  nextButton,
  backButton,
  className,
}: {
  steps: number;
  activeStep: number;
  variant?: "dots" | "text" | "progress";
  nextButton: ReactNode;
  backButton: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between bg-[#fafafa] p-2", className)}>
      {backButton}
      {variant === "text" ? (
        <span className="text-sm text-[var(--md-text-secondary)]">
          {activeStep + 1} / {steps}
        </span>
      ) : null}
      {variant === "dots" ? (
        <span className="flex gap-1.5">
          {Array.from({ length: steps }, (_, i) => (
            <span
              key={i}
              className={cn("size-2 rounded-full", i === activeStep ? "bg-[var(--md-primary)]" : "bg-[var(--md-action-disabled-bg)]")}
            />
          ))}
        </span>
      ) : null}
      {variant === "progress" ? (
        <span className="mx-4 min-w-24 flex-1">
          <LinearProgress value={((activeStep + 1) / steps) * 100} />
        </span>
      ) : null}
      {nextButton}
    </div>
  );
}
