import { Children, cloneElement, isValidElement, useLayoutEffect, useRef, useState, type ReactElement, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { RippleLayer, useRipple } from "./ripple";

export function Tab({
  value,
  label,
  selected,
  onPick,
}: {
  value: string;
  label: string;
  selected?: boolean;
  onPick?: (value: string) => void;
}) {
  const ripple = useRipple();
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      ref={(node) => {
        ripple.ref.current = node;
      }}
      {...ripple.bind}
      data-tab={value}
      className={cn(
        "relative min-h-12 min-w-[90px] overflow-hidden border-0 bg-transparent px-4 py-3",
        "cursor-pointer text-sm font-medium uppercase tracking-[0.02857em] leading-[1.25]",
        selected ? "text-[var(--md-primary)]" : "text-[var(--md-text-secondary)]",
      )}
      onClick={() => onPick?.(value)}
    >
      <RippleLayer ripples={ripple.ripples} />
      <span className="relative z-[1]">{label}</span>
    </button>
  );
}

export function Tabs({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  const list = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState({ left: 0, width: 0 });
  const tabs = Children.toArray(children).filter(isValidElement) as ReactElement<{
    value: string;
    selected?: boolean;
    onPick?: (value: string) => void;
  }>[];

  useLayoutEffect(() => {
    const el = list.current?.querySelector(`[data-tab="${CSS.escape(value)}"]`) as HTMLElement | null;
    if (!el || !list.current) return;
    setBar({ left: el.offsetLeft, width: el.offsetWidth });
  }, [value, children]);

  return (
    <div className="relative">
      <div ref={list} role="tablist" className="flex min-h-12">
        {tabs.map((child) =>
          cloneElement(child, {
            selected: child.props.value === value,
            onPick: onChange,
          }),
        )}
      </div>
      <span className="md-tab-bar" style={{ transform: `translateX(${bar.left}px)`, width: bar.width }} />
    </div>
  );
}
