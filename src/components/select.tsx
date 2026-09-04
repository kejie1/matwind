import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";
import { RippleLayer, useRipple } from "./ripple";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  );
}

export function SelectGroup({ children }: { children: ReactNode }) {
  return (
    <li role="presentation" className="pointer-events-none sticky top-0 z-[1] bg-white px-4 py-2 text-sm font-medium text-[var(--md-primary)]">
      {children}
    </li>
  );
}

export function MenuItem({
  value,
  children,
  selected,
  onPick,
  checkmark,
}: {
  value: string;
  children: ReactNode;
  selected?: boolean;
  onPick?: (value: string) => void;
  checkmark?: boolean;
}) {
  const ripple = useRipple();
  return (
    <li role="option" aria-selected={selected}>
      <button
        type="button"
        ref={(node) => {
          ripple.ref.current = node;
        }}
        {...ripple.bind}
        className={cn(
          "relative flex min-h-12 w-full items-center overflow-hidden border-0 bg-transparent px-4 text-left text-[1rem] leading-[1.5] tracking-[0.00938em]",
          "cursor-pointer text-[var(--md-text)] hover:bg-[var(--md-action-hover)]",
          selected && "bg-[rgba(25,118,210,0.08)] text-[var(--md-primary)]",
        )}
        onClick={() => onPick?.(value)}
      >
        <RippleLayer ripples={ripple.ripples} />
        {checkmark ? <span className="relative z-[1] mr-3 inline-flex w-6 shrink-0">{selected ? <CheckIcon /> : null}</span> : null}
        <span className="relative z-[1]">{children}</span>
      </button>
    </li>
  );
}

function itemValue(child: ReactElement): string | undefined {
  const v = (child.props as { value?: unknown }).value;
  return typeof v === "string" ? v : undefined;
}

export function Select({
  label,
  value,
  onChange,
  children,
  fullWidth,
  disabled,
  multiple,
  placeholder,
  renderValue,
  checkmark,
}: {
  label: string;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  children: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  placeholder?: string;
  renderValue?: (value: string | string[]) => ReactNode;
  checkmark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLUListElement>(null);
  const id = useId();
  const selected = Array.isArray(value) ? value : value ? [value] : [];
  const hasValue = selected.length > 0;
  const shrink = open || hasValue || !!placeholder;

  const nodes = Children.toArray(children).filter(isValidElement) as ReactElement[];
  const items = nodes.filter((c) => itemValue(c) != null) as ReactElement<{
    value: string;
    children: ReactNode;
    selected?: boolean;
    onPick?: (value: string) => void;
    checkmark?: boolean;
  }>[];
  const labels = selected.map((v) => items.find((c) => c.props.value === v)?.props.children).filter(Boolean);
  const shown = renderValue
    ? renderValue(value)
    : hasValue
      ? multiple
        ? labels.join(", ")
        : labels[0]
      : placeholder ?? "\u00a0";

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (box.current?.contains(t) || menu.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const rect = open ? box.current?.getBoundingClientRect() : undefined;

  const pick = (v: string) => {
    if (multiple) {
      onChange(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);
      return;
    }
    onChange(v);
    setOpen(false);
  };

  return (
    <div
      className={cn("md-field", fullWidth && "md-field-full")}
      data-variant="outlined"
      data-size="medium"
      data-focus={open ? "1" : "0"}
      data-shrink={shrink ? "1" : "0"}
      data-disabled={disabled ? "1" : "0"}
    >
      <span className="md-field-label" id={`${id}-label`}>
        {label}
      </span>
      <button
        type="button"
        ref={box}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label`}
        aria-multiselectable={multiple || undefined}
        className="md-field-wrap cursor-pointer border-0 bg-transparent text-left disabled:cursor-default"
        onClick={() => !disabled && setOpen((o) => !o)}
      >
        <span
          className={cn(
            "md-field-input flex min-h-[1.4375em] flex-wrap items-center gap-1 pr-8",
            !hasValue && placeholder && "text-[var(--md-text-secondary)]",
          )}
        >
          {shown}
        </span>
        <svg
          className={cn(
            "pointer-events-none absolute right-1.5 top-1/2 size-6 -translate-y-1/2 text-[var(--md-action-active)] transition-transform duration-[var(--md-duration-shortest)]",
            open && "rotate-180",
          )}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
        <fieldset className="md-field-notch" aria-hidden>
          <legend className="md-field-legend">
            <span>{label}</span>
          </legend>
        </fieldset>
      </button>
      {open && rect ? (
        <ul
          ref={menu}
          role="listbox"
          className="md-menu"
          style={{
            position: "fixed",
            top: rect.bottom + 4,
            left: rect.left,
            width: rect.width,
            zIndex: 1300,
          }}
        >
          {nodes.map((child, i) => {
            const v = itemValue(child);
            if (v == null) return child;
            return cloneElement(child as ReactElement<{ selected?: boolean; onPick?: (value: string) => void; checkmark?: boolean }>, {
              key: child.key ?? v ?? i,
              selected: selected.includes(v),
              checkmark,
              onPick: pick,
            });
          })}
        </ul>
      ) : null}
    </div>
  );
}
