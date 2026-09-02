import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export function CircularProgress({
  size = 40,
  value,
  className,
}: {
  size?: number;
  value?: number;
  className?: string;
}) {
  const determinate = value != null;
  const c = 2 * Math.PI * 20.2;
  return (
    <span
      role="progressbar"
      aria-valuenow={determinate ? Math.round(value) : undefined}
      className={cn("inline-flex text-[var(--md-primary)]", className)}
      style={{ width: size, height: size }}
    >
      <svg className={cn("size-full", determinate ? "-rotate-90" : "md-spin")} viewBox="22 22 44 44">
        <circle
          cx="44"
          cy="44"
          r="20.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.6"
          strokeDasharray={determinate ? c : "80px, 200px"}
          strokeDashoffset={determinate ? c - (value / 100) * c : undefined}
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function LinearProgress({
  value,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { value?: number }) {
  const determinate = value != null;
  return (
    <div
      {...rest}
      role="progressbar"
      aria-valuenow={determinate ? Math.round(value) : undefined}
      className={cn("relative h-1 overflow-hidden rounded bg-[color-mix(in_srgb,var(--md-primary)_24%,transparent)]", className)}
    >
      {determinate ? (
        <span
          className="absolute inset-y-0 left-0 bg-[var(--md-primary)] transition-[width] duration-[var(--md-duration-short)] ease-[var(--md-ease)]"
          style={{ width: `${value}%` }}
        />
      ) : (
        <span className="md-lin absolute inset-y-0 bg-[var(--md-primary)]" />
      )}
    </div>
  );
}

export function Skeleton({
  variant = "text",
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement> & { variant?: "text" | "circular" | "rectangular" }) {
  return (
    <span
      {...rest}
      className={cn(
        "md-skel",
        variant === "text" && "h-[1.2em] w-full rounded-[var(--md-radius)]",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded-[var(--md-radius)]",
        className,
      )}
    />
  );
}
