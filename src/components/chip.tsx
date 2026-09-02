import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "../lib/cn";
import { RippleLayer, useRipple } from "./ripple";

export function Chip({
  variant = "filled",
  size = "medium",
  color,
  onDelete,
  icon,
  className,
  disabled,
  children,
  onClick,
}: {
  variant?: "filled" | "outlined";
  size?: "medium" | "small";
  color?: "default" | "primary";
  onDelete?: () => void;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
}) {
  const clickable = !!onClick;
  const ripple = useRipple(disabled || !clickable);
  return (
    <span
      role={clickable ? "button" : undefined}
      tabIndex={clickable && !disabled ? 0 : undefined}
      onClick={disabled ? undefined : onClick}
      ref={(node) => {
        ripple.ref.current = node;
      }}
      onPointerDown={clickable ? ripple.bind.onPointerDown : undefined}
      onPointerUp={clickable ? ripple.bind.onPointerUp : undefined}
      onPointerCancel={clickable ? ripple.bind.onPointerCancel : undefined}
      onKeyDown={clickable ? ripple.bind.onKeyDown : undefined}
      onKeyUp={clickable ? ripple.bind.onKeyUp : undefined}
      className={cn(
        "relative inline-flex max-w-full items-center overflow-hidden border-0 align-middle",
        "text-[13px] leading-[1.4] tracking-[0.01em] text-[rgba(0,0,0,0.87)]",
        size === "small" ? "h-6 rounded-xl" : "h-8 rounded-2xl",
        variant === "filled" && !color && "bg-[var(--md-chip)]",
        variant === "filled" && color === "primary" && "bg-[var(--md-primary)] text-white",
        variant === "outlined" && "bg-transparent shadow-[inset_0_0_0_1px_var(--md-divider)]",
        variant === "outlined" && color === "primary" && "text-[var(--md-primary)] shadow-[inset_0_0_0_1px_var(--md-outlined-border)]",
        clickable && "cursor-pointer hover:brightness-[0.96]",
        !clickable && "cursor-default",
        disabled && "pointer-events-none opacity-[0.38]",
        className,
      )}
    >
      {clickable ? <RippleLayer ripples={ripple.ripples} /> : null}
      {icon ? <span className="relative z-[1] ml-1 inline-flex [&>svg]:size-[1.125rem]">{icon}</span> : null}
      <span className={cn("relative z-[1] overflow-hidden text-ellipsis whitespace-nowrap px-3", icon ? "pl-1" : null)}>
        {children}
      </span>
      {onDelete ? (
        <span
          role="button"
          tabIndex={0}
          className="relative z-[1] mr-1 inline-flex cursor-pointer text-[rgba(0,0,0,0.26)] hover:text-[rgba(0,0,0,0.4)]"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]" aria-hidden>
            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
          </svg>
        </span>
      ) : null}
    </span>
  );
}
