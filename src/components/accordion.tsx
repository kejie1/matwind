import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export function AccordionActions({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex justify-end gap-2 px-2 pb-2", className)}>{children}</div>;
}

export function Accordion({
  title,
  children,
  defaultOpen,
  className,
}: {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  return (
    <details
      className={cn("md-acc border-0 border-b border-solid border-[var(--md-divider)] bg-white", className)}
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-base font-medium tracking-[0.0075em] select-none">
        {title}
        <svg
          className="md-acc-icon size-6 shrink-0 text-[var(--md-action-active)] transition-transform duration-[var(--md-duration-shortest)] ease-[var(--md-ease)]"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
        </svg>
      </summary>
      <div className="px-4 pb-4 text-[0.875rem] leading-[1.43] text-[var(--md-text-secondary)]">{children}</div>
    </details>
  );
}
