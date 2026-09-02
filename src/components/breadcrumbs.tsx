import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export function Breadcrumbs({ children, className }: { children: ReactNode; className?: string }) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <nav aria-label="breadcrumb" className={cn("text-sm text-[var(--md-text-secondary)]", className)}>
      <ol className="m-0 flex list-none flex-wrap items-center p-0">
        {items.map((child, i) => (
          <li key={i} className="inline-flex items-center">
            {i > 0 ? (
              <svg className="mx-1.5 size-4 opacity-70" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            ) : null}
            {child}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Link({
  href = "#",
  children,
  className,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={cn("text-[var(--md-primary)] no-underline hover:underline", className)}>
      {children}
    </a>
  );
}
