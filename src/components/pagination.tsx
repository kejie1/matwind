import { cn } from "../lib/cn";
import { RippleLayer, useRipple } from "./ripple";

function PageBtn({
  children,
  selected,
  disabled,
  onClick,
  ariaLabel,
}: {
  children: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const ripple = useRipple(disabled);
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-current={selected ? "page" : undefined}
      disabled={disabled}
      ref={(node) => {
        ripple.ref.current = node;
      }}
      {...ripple.bind}
      onClick={onClick}
      className={cn(
        "relative inline-flex size-8 items-center justify-center overflow-hidden rounded-full border-0 text-[0.875rem]",
        "cursor-pointer bg-transparent text-[var(--md-text)]",
        selected && "bg-[var(--md-primary)] text-white",
        disabled && "pointer-events-none text-[var(--md-action-disabled)]",
      )}
    >
      <RippleLayer ripples={ripple.ripples} />
      <span className="relative z-[1]">{children}</span>
    </button>
  );
}

export function Pagination({
  count,
  page,
  onChange,
}: {
  count: number;
  page: number;
  onChange: (page: number) => void;
}) {
  const pages = Array.from({ length: count }, (_, i) => i + 1);
  return (
    <nav className="inline-flex items-center gap-1.5">
      <PageBtn ariaLabel="Go to previous page" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        ‹
      </PageBtn>
      {pages.map((n) => (
        <PageBtn key={n} selected={n === page} onClick={() => onChange(n)}>
          {String(n)}
        </PageBtn>
      ))}
      <PageBtn ariaLabel="Go to next page" disabled={page >= count} onClick={() => onChange(page + 1)}>
        ›
      </PageBtn>
    </nav>
  );
}
