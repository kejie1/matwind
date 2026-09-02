import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { RippleLayer, useRipple } from "./ripple";
import type { ButtonColor, ButtonSize } from "./button";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color" | "children"> & {
  color?: ButtonColor;
  size?: ButtonSize;
  variant?: "circular" | "extended";
  children: ReactNode;
};

const box: Record<ButtonSize, string> = {
  small: "size-10",
  medium: "size-14",
  large: "size-16",
};

const fill: Record<ButtonColor, string> = {
  primary: "bg-[var(--md-primary)] text-[var(--md-primary-contrast)] hover:bg-[var(--md-primary-dark)]",
  error: "bg-[var(--md-error)] text-[var(--md-error-contrast)] hover:bg-[var(--md-error-dark)]",
  inherit: "bg-[var(--md-inherit-contained)] text-[var(--md-text)] hover:bg-[var(--md-inherit-contained-hover)]",
};

export function Fab({
  color = "primary",
  size = "medium",
  variant = "circular",
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
        "relative inline-flex items-center justify-center overflow-hidden border-0 p-0 leading-none",
        variant === "circular" && "rounded-full",
        variant === "extended" &&
          "h-12 min-w-12 rounded-[24px] px-4 text-sm font-medium uppercase tracking-[0.02857em] leading-[1.75]",
        variant === "circular" && box[size],
        "shadow-[var(--md-elev-6)] hover:shadow-[var(--md-elev-8)] active:shadow-[var(--md-elev-8)]",
        "cursor-pointer [-webkit-tap-highlight-color:transparent]",
        "transition-[background-color,box-shadow] duration-[var(--md-duration-short)] ease-[var(--md-ease)]",
        "md-focus disabled:pointer-events-none disabled:bg-[var(--md-action-disabled-bg)] disabled:text-[var(--md-action-disabled)] disabled:shadow-none",
        fill[color],
        className,
      )}
    >
      <RippleLayer ripples={ripple.ripples} />
      <span className="relative z-[1] inline-flex items-center leading-none [&_svg]:block [&_svg]:size-6">{children}</span>
    </button>
  );
}
