import type { ButtonHTMLAttributes, HTMLAttributes, LiHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { RippleLayer, useRipple } from "./ripple";

export function List({ children, className, ...rest }: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul {...rest} className={cn("m-0 list-none p-0", className)}>
      {children}
    </ul>
  );
}

export function ListItem({ children, className, ...rest }: LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li {...rest} className={cn("flex min-h-12 items-center gap-4 px-4 py-2", className)}>
      {children}
    </li>
  );
}

export function ListItemIcon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex min-w-14 shrink-0 text-[var(--md-action-active)] [&>svg]:size-6", className)}>
      {children}
    </span>
  );
}

export function ListItemAvatar({ children }: { children: ReactNode }) {
  return <span className="mr-0 min-w-14 shrink-0">{children}</span>;
}

export function ListSubheader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <li className={cn("sticky top-0 z-[1] bg-white px-4 py-2 text-sm font-medium text-[var(--md-primary)]", className)}>
      {children}
    </li>
  );
}

export function ListItemText({
  primary,
  secondary,
}: {
  primary: ReactNode;
  secondary?: ReactNode;
}) {
  return (
    <span className="min-w-0 flex-1">
      <span className="block text-base leading-[1.5] tracking-[0.00938em]">{primary}</span>
      {secondary ? (
        <span className="block text-[0.875rem] leading-[1.43] tracking-[0.01071em] text-[var(--md-text-secondary)]">
          {secondary}
        </span>
      ) : null}
    </span>
  );
}

export function ListItemButton({
  children,
  selected,
  className,
  disabled,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onKeyDown,
  onKeyUp,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  const ripple = useRipple(disabled);
  return (
    <li>
      <button
        {...rest}
        type="button"
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
        className={cn(
          "relative flex min-h-12 w-full items-center gap-4 overflow-hidden border-0 bg-transparent px-4 py-2 text-left",
          "cursor-pointer text-[var(--md-text)] hover:bg-[var(--md-action-hover)]",
          selected && "bg-[rgba(25,118,210,0.08)]",
          disabled && "pointer-events-none text-[var(--md-text-disabled)]",
          className,
        )}
      >
        <RippleLayer ripples={ripple.ripples} />
        <span className="relative z-[1] flex w-full items-center gap-4">{children}</span>
      </button>
    </li>
  );
}
