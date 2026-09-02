import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { RippleLayer, useRipple } from "./ripple";
import type { ButtonColor, ButtonSize } from "./button";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color" | "children"> & {
  color?: ButtonColor;
  size?: ButtonSize;
  children: ReactNode;
  "aria-label": string;
};

const pad: Record<ButtonSize, string> = {
  small: "p-[5px] text-[1.125rem]",
  medium: "p-2 text-2xl",
  large: "p-3 text-[1.75rem]",
};

const ink: Record<ButtonColor, string> = {
  primary: "text-[var(--md-primary)] hover:bg-[color-mix(in_srgb,var(--md-primary)_4%,transparent)]",
  error: "text-[var(--md-error)] hover:bg-[color-mix(in_srgb,var(--md-error)_4%,transparent)]",
  inherit: "text-[var(--md-action-active)] hover:bg-[var(--md-action-hover)]",
};

export function IconButton({
  color = "inherit",
  size = "medium",
  className,
  disabled,
  children,
  type = "button",
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onKeyDown,
  onKeyUp,
  ...rest
}: Props) {
  const ripple = useRipple(disabled);
  return (
    <button
      {...rest}
      ref={(node) => {
        ripple.ref.current = node;
      }}
      type={type}
      disabled={disabled}
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
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full border-0 bg-transparent",
        "cursor-pointer select-none align-middle [-webkit-tap-highlight-color:transparent]",
        "transition-[background-color] duration-[var(--md-duration-shortest)] ease-[var(--md-ease)]",
        "md-focus",
        pad[size],
        ink[color],
        "disabled:pointer-events-none disabled:text-[var(--md-action-disabled)] disabled:bg-transparent",
        className,
      )}
    >
      <RippleLayer ripples={ripple.ripples} />
      <span className="relative z-[1] inline-flex [&>svg]:size-[1em]">{children}</span>
    </button>
  );
}
