import type { ReactElement, ReactNode } from "react";
import { cn } from "../lib/cn";

export function FormControlLabel({
  control,
  label,
  disabled,
  className,
}: {
  control: ReactElement;
  label: ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center align-middle [-webkit-tap-highlight-color:transparent]",
        "-ml-[11px] mr-4",
        disabled && "cursor-default text-[var(--md-text-disabled)]",
        className,
      )}
    >
      {control}
      <span className="text-[1rem] leading-[1.5] tracking-[0.00938em]">{label}</span>
    </label>
  );
}
