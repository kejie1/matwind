import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export function Avatar({
  src,
  alt,
  children,
  size = 40,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  src?: string;
  alt?: string;
  children?: ReactNode;
  size?: number;
}) {
  return (
    <div
      {...rest}
      style={{ width: size, height: size, ...rest.style }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--md-avatar)] text-sm font-medium text-white",
        className,
      )}
    >
      {src ? <img src={src} alt={alt ?? ""} className="size-full object-cover" /> : children}
    </div>
  );
}

export function Badge({
  badgeContent,
  color = "error",
  variant = "standard",
  max = 99,
  children,
  className,
}: {
  badgeContent?: ReactNode;
  color?: "error" | "primary";
  variant?: "standard" | "dot";
  max?: number;
  children: ReactNode;
  className?: string;
}) {
  const show = variant === "dot" || (badgeContent !== undefined && badgeContent !== null && badgeContent !== false);
  const label =
    variant === "dot"
      ? null
      : typeof badgeContent === "number" && badgeContent > max
        ? `${max}+`
        : badgeContent;
  return (
    <span className={cn("relative inline-flex", className)}>
      {children}
      {show ? (
        <span
          className={cn(
            "absolute z-[1] box-border flex items-center justify-center rounded-[10px] text-[0.75rem] font-medium leading-none text-white",
            color === "error" ? "bg-[var(--md-error)]" : "bg-[var(--md-primary)]",
            variant === "dot" ? "-right-0.5 -top-0.5 size-2 p-0" : "-right-1 -top-1 min-h-[20px] min-w-[20px] px-[6px]",
          )}
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}

export function AvatarGroup({
  max = 5,
  children,
  className,
}: {
  max?: number;
  children: ReactNode;
  className?: string;
}) {
  const items = Array.isArray(children) ? children : [children];
  const extra = items.length - max;
  const shown = extra > 0 ? items.slice(0, max - 1) : items;
  return (
    <div className={cn("flex flex-row-reverse justify-end", className)}>
      {extra > 0 ? <Avatar className="-ml-2 border-2 border-solid border-white">+{extra + 1}</Avatar> : null}
      {[...shown].reverse().map((child, i) => (
        <span key={i} className="-ml-2 first:ml-0 [&>*]:border-2 [&>*]:border-solid [&>*]:border-white">
          {child}
        </span>
      ))}
    </div>
  );
}
