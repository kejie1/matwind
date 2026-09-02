import { useEffect, useRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { RippleLayer, useRipple } from "./ripple";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  icon: ReactNode;
  size?: "medium" | "small";
  indeterminate?: boolean;
};

export function SwitchBase({ icon, disabled, size = "medium", className, indeterminate, ...rest }: Props) {
  const ripple = useRipple(disabled);
  const inputRef = useRef<HTMLInputElement>(null);
  const small = size === "small";

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = !!indeterminate;
  }, [indeterminate]);
  return (
    <span
      ref={(node) => {
        ripple.ref.current = node;
      }}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full align-middle",
        small ? "size-8" : "size-[42px]",
        rest.checked || indeterminate ? "text-[var(--md-primary)]" : "text-[var(--md-text-secondary)]",
        disabled && "text-[var(--md-action-disabled)]",
        !disabled && "hover:bg-[color-mix(in_srgb,currentColor_4%,transparent)]",
        className,
      )}
    >
      <RippleLayer ripples={ripple.ripples} />
      <span className={cn("relative z-[1] inline-flex", small ? "[&>svg]:size-5" : "[&>svg]:size-6")}>{icon}</span>
      <input
        {...rest}
        ref={inputRef}
        disabled={disabled}
        className="absolute z-[2] m-0 size-full cursor-pointer opacity-0 disabled:cursor-default"
        onPointerDown={ripple.bind.onPointerDown}
        onPointerUp={ripple.bind.onPointerUp}
        onPointerCancel={ripple.bind.onPointerCancel}
        onKeyDown={ripple.bind.onKeyDown}
        onKeyUp={ripple.bind.onKeyUp}
      />
    </span>
  );
}
