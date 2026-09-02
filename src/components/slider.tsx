import type { InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export function Slider({
  value = 0,
  min = 0,
  max = 100,
  onChange,
  className,
  disabled,
  ...rest
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> & {
  onChange?: (value: number) => void;
}) {
  const n = Number(value);
  const pct = ((n - Number(min)) / (Number(max) - Number(min))) * 100;
  return (
    <span className={cn("relative inline-flex h-9 w-full items-center", className)}>
      <span className="absolute left-0 right-0 h-1 rounded-sm bg-[var(--md-action-disabled-bg)]" />
      <span
        className="absolute left-0 h-1 rounded-sm bg-[var(--md-primary)]"
        style={{ width: `${pct}%` }}
      />
      <span
        className="absolute size-5 -translate-x-1/2 rounded-full bg-[var(--md-primary)] shadow-[var(--md-elev-1)]"
        style={{ left: `${pct}%` }}
      />
      <input
        {...rest}
        type="range"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        className="md-slider-input"
        onChange={(e) => onChange?.(Number(e.target.value))}
      />
    </span>
  );
}
