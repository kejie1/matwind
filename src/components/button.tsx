import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { RippleLayer, useRipple } from "./ripple";

export type ButtonVariant = "text" | "outlined" | "contained";
export type ButtonColor = "primary" | "error" | "inherit";
export type ButtonSize = "small" | "medium" | "large";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

const sizeClass: Record<ButtonVariant, Record<ButtonSize, string>> = {
  text: {
    small: "px-[5px] py-1 text-[13px]",
    medium: "px-2 py-1.5 text-sm",
    large: "px-[11px] py-2 text-[15px]",
  },
  outlined: {
    small: "px-[9px] py-[3px] text-[13px]",
    medium: "px-[15px] py-[5px] text-sm",
    large: "px-[21px] py-[7px] text-[15px]",
  },
  contained: {
    small: "px-2.5 py-1 text-[13px]",
    medium: "px-4 py-1.5 text-sm",
    large: "px-[22px] py-2 text-[15px]",
  },
};

const colorClass: Record<ButtonVariant, Record<ButtonColor, string>> = {
  contained: {
    primary:
      "text-[var(--md-primary-contrast)] bg-[var(--md-primary)] shadow-[var(--md-elev-2)] hover:bg-[var(--md-primary-dark)] hover:shadow-[var(--md-elev-4)] active:shadow-[var(--md-elev-8)]",
    error:
      "text-[var(--md-error-contrast)] bg-[var(--md-error)] shadow-[var(--md-elev-2)] hover:bg-[var(--md-error-dark)] hover:shadow-[var(--md-elev-4)] active:shadow-[var(--md-elev-8)]",
    inherit:
      "text-[var(--md-text)] bg-[var(--md-inherit-contained)] shadow-[var(--md-elev-2)] hover:bg-[var(--md-inherit-contained-hover)] hover:shadow-[var(--md-elev-4)] active:shadow-[var(--md-elev-8)]",
  },
  outlined: {
    primary:
      "text-[var(--md-primary)] border-[var(--md-outlined-border)] hover:border-[var(--md-primary)] hover:bg-[color-mix(in_srgb,var(--md-primary)_4%,transparent)] focus-visible:border-[var(--md-primary)]",
    error:
      "text-[var(--md-error)] border-[var(--md-outlined-border-error)] hover:border-[var(--md-error)] hover:bg-[color-mix(in_srgb,var(--md-error)_4%,transparent)]",
    inherit:
      "text-inherit border-current hover:bg-[color-mix(in_srgb,var(--md-text)_4%,transparent)]",
  },
  text: {
    primary: "text-[var(--md-primary)] hover:bg-[color-mix(in_srgb,var(--md-primary)_4%,transparent)]",
    error: "text-[var(--md-error)] hover:bg-[color-mix(in_srgb,var(--md-error)_4%,transparent)]",
    inherit: "text-inherit hover:bg-[var(--md-action-hover)]",
  },
};

export function Button({
  variant = "text",
  color = "primary",
  size = "medium",
  fullWidth,
  startIcon,
  endIcon,
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
      {...ripple.bind}
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
        "relative inline-flex items-center justify-center overflow-hidden align-middle",
        "min-w-16 rounded-[var(--md-radius)]",
        "font-medium uppercase tracking-[0.02857em] leading-[1.75]",
        "transition-[background-color,box-shadow,border-color,color] duration-[var(--md-duration-short)] ease-[var(--md-ease)]",
        "cursor-pointer select-none [-webkit-tap-highlight-color:transparent]",
        "md-focus",
        variant === "outlined" && "border border-solid bg-transparent",
        variant === "text" && "border-0 bg-transparent",
        variant === "contained" && "border-0",
        sizeClass[variant][size],
        colorClass[variant][color],
        fullWidth && "w-full",
        "disabled:pointer-events-none disabled:cursor-default disabled:text-[var(--md-action-disabled)]",
        variant === "contained" && "disabled:bg-[var(--md-action-disabled-bg)] disabled:shadow-none",
        variant !== "contained" && "disabled:bg-transparent",
        variant === "outlined" && "disabled:border-[var(--md-action-disabled-bg)]",
        className,
      )}
    >
      <RippleLayer ripples={ripple.ripples} />
      {startIcon ? <span className="relative z-[1] mr-2 -ml-1 inline-flex text-xl [&>svg]:size-[1em]">{startIcon}</span> : null}
      <span className="relative z-[1]">{children}</span>
      {endIcon ? <span className="relative z-[1] ml-2 -mr-1 inline-flex text-xl [&>svg]:size-[1em]">{endIcon}</span> : null}
    </button>
  );
}
