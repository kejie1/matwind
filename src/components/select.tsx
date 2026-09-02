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

export function MenuItem({
  value,
  children,
  selected,
  onPick,
}: {
  value: string;
  children: ReactNode;
  selected?: boolean;
  onPick?: (value: string) => void;
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
        <span className="relative z-[1]">{children}</span>
      </button>
    </li>
  );
}

export function Select({
  label,
  value,
  onChange,
  children,
  fullWidth,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLUListElement>(null);
  const id = useId();
  const shrink = open || value.length > 0;

  const items = Children.toArray(children).filter(isValidElement) as ReactElement<{
    value: string;
    children: ReactNode;
    selected?: boolean;
    onPick?: (value: string) => void;
  }>[];
  const shown = items.find((c) => c.props.value === value)?.props.children ?? "";

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
        className="md-field-wrap cursor-pointer border-0 bg-transparent text-left disabled:cursor-default"
        onClick={() => !disabled && setOpen((o) => !o)}
      >
        <span className="md-field-input flex min-h-[1.4375em] items-center pr-8">{shown || "\u00a0"}</span>
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
          {items.map((child) =>
            cloneElement(child, {
              selected: child.props.value === value,
              onPick: (v: string) => {
                onChange(v);
                setOpen(false);
              },
            }),
          )}
        </ul>
      ) : null}
    </div>
  );
}
