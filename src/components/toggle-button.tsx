import { createContext, useContext, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { RippleLayer, useRipple } from "./ripple";

const Ctx = createContext<{ value: string; set: (v: string) => void } | null>(null);

export function ToggleButtonGroup({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <Ctx.Provider value={{ value, set: onChange }}>
      <div role="group" className="inline-flex overflow-hidden rounded-[var(--md-radius)]">
        {children}
      </div>
    </Ctx.Provider>
  );
}

export function ToggleButton({
  value,
  children,
  className,
  disabled,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onKeyDown,
  onKeyUp,
  ...rest
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value" | "onChange"> & { value: string }) {
  const g = useContext(Ctx);
  const selected = g?.value === value;
  const ripple = useRipple(disabled);
  return (
    <button
      {...rest}
      type="button"
      value={value}
      aria-pressed={selected}
      disabled={disabled}
      ref={(node) => {
        ripple.ref.current = node;
      }}
      onPointerDown={(e) => {
        ripple.bind.onPointerDown(e);
        onPointerDown?.(e);
      }}
      onPointerUp={(e) => {
        ripple.bind.onPointerUp();
        onPointerUp?.(e);
      }}
      onPointerCancel={(e) => {
        ripple.bind.onPointerCancel();
        onPointerCancel?.(e);
      }}
      onKeyDown={(e) => {
        ripple.bind.onKeyDown(e);
        onKeyDown?.(e);
      }}
      onKeyUp={(e) => {
        ripple.bind.onKeyUp(e);
        onKeyUp?.(e);
      }}
      onClick={() => g?.set(value)}
      className={cn(
        "relative -ml-px min-w-12 overflow-hidden border border-solid border-[var(--md-divider)] bg-transparent px-3 py-[11px]",
        "cursor-pointer text-sm font-medium uppercase tracking-[0.02857em] text-[var(--md-action-active)] first:ml-0",
        selected && "bg-[color-mix(in_srgb,var(--md-primary)_8%,transparent)] text-[var(--md-primary)] z-[1] border-[var(--md-primary)]",
        disabled && "pointer-events-none text-[var(--md-action-disabled)]",
        className,
      )}
    >
      <RippleLayer ripples={ripple.ripples} />
      <span className="relative z-[1]">{children}</span>
    </button>
  );
}
