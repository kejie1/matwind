import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export function Collapse({
  in: show,
  children,
  className,
}: {
  in: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("md-collapse", show && "md-collapse-on", className)}>
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

export function Fade({
  in: show,
  children,
  className,
}: {
  in: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("transition-opacity duration-[var(--md-duration-short)] ease-[var(--md-ease)]", show ? "opacity-100" : "pointer-events-none opacity-0", className)}>
      {children}
    </div>
  );
}

export function Grow({
  in: show,
  children,
  className,
}: {
  in: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "origin-center transition-[opacity,transform] duration-[var(--md-duration-short)] ease-[var(--md-ease)]",
        show ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Zoom({
  in: show,
  children,
  className,
}: {
  in: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "origin-center transition-[opacity,transform] duration-[var(--md-duration-shortest)] ease-[var(--md-ease)]",
        show ? "scale-100 opacity-100" : "pointer-events-none scale-0 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Slide({
  in: show,
  direction = "up",
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  in: boolean;
  direction?: "up" | "down" | "left" | "right";
  children: ReactNode;
}) {
  const off =
    direction === "up"
      ? "translate-y-full"
      : direction === "down"
        ? "-translate-y-full"
        : direction === "left"
          ? "translate-x-full"
          : "-translate-x-full";
  return (
    <div
      {...rest}
      className={cn(
        "transition-transform duration-[var(--md-duration-short)] ease-[var(--md-ease)]",
        show ? "translate-x-0 translate-y-0" : off,
        className,
      )}
    >
      {children}
    </div>
  );
}
