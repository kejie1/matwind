import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { cn } from "../lib/cn";

export function Stepper({
  activeStep = 0,
  children,
  className,
}: {
  activeStep?: number;
  children: ReactNode;
  className?: string;
}) {
  const steps = Children.toArray(children);
  return (
    <ol className={cn("m-0 flex list-none items-center p-0", className)}>
      {steps.map((child, i) => (
        <li key={i} className={cn("flex items-center", i < steps.length - 1 && "flex-1")}>
          {isValidElement(child)
            ? cloneElement(child as ReactElement<{ index?: number; active?: boolean; completed?: boolean }>, {
                index: i,
                active: i === activeStep,
                completed: i < activeStep,
              })
            : child}
          {i < steps.length - 1 ? (
            <span
              aria-hidden
              className={cn("mx-2 h-px min-w-6 flex-1", i < activeStep ? "bg-[var(--md-primary)]" : "bg-[var(--md-step-line)]")}
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function Step({
  children,
  index = 0,
  active,
  completed,
}: {
  children: ReactNode;
  index?: number;
  active?: boolean;
  completed?: boolean;
}) {
  const on = !!active || !!completed;
  return (
    <span className="inline-flex shrink-0 items-center gap-2">
      <span
        className={cn(
          "inline-flex size-6 items-center justify-center rounded-full text-[0.75rem]",
          on ? "bg-[var(--md-primary)] text-white" : "bg-[var(--md-action-disabled)] text-white",
        )}
      >
        {completed ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]" aria-hidden>
            <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        ) : (
          index + 1
        )}
      </span>
      <span className={cn("whitespace-nowrap text-sm leading-[1.43]", on ? "font-medium text-[var(--md-text)]" : "text-[var(--md-text-secondary)]")}>
        {children}
      </span>
    </span>
  );
}
