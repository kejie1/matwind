import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

type Severity = "error" | "warning" | "info" | "success";

const skin: Record<Severity, string> = {
  error: "bg-[var(--md-alert-error-bg)] text-[var(--md-error-dark)]",
  warning: "bg-[var(--md-alert-warning-bg)] text-[var(--md-warning-dark)]",
  info: "bg-[var(--md-alert-info-bg)] text-[var(--md-info-dark)]",
  success: "bg-[var(--md-alert-success-bg)] text-[var(--md-success-dark)]",
};

const ink: Record<Severity, string> = {
  error: "text-[var(--md-error)]",
  warning: "text-[var(--md-warning)]",
  info: "text-[var(--md-info)]",
  success: "text-[var(--md-success)]",
};

function Icon({ severity, className }: { severity: Severity; className?: string }) {
  const d =
    severity === "success"
      ? "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      : severity === "warning"
        ? "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
        : severity === "error"
          ? "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          : "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z";
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn("size-6", className ?? ink[severity])} aria-hidden>
      <path d={d} />
    </svg>
  );
}

const filled: Record<Severity, string> = {
  error: "bg-[var(--md-error)] text-white",
  warning: "bg-[var(--md-warning)] text-white",
  info: "bg-[var(--md-info)] text-white",
  success: "bg-[var(--md-success)] text-white",
};

export function AlertTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("-mt-0.5 mb-2 font-medium leading-[1.5] tracking-[0.00938em]", className)}>{children}</div>;
}

export function Alert({
  severity = "success",
  variant = "standard",
  onClose,
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  severity?: Severity;
  variant?: "standard" | "filled" | "outlined";
  onClose?: () => void;
  children: ReactNode;
}) {
  return (
    <div
      {...rest}
      role="alert"
      className={cn(
        "flex items-center gap-3 rounded-[var(--md-radius)] px-4 py-1.5 text-[0.875rem] leading-[1.43] tracking-[0.01071em]",
        variant === "standard" && skin[severity],
        variant === "filled" && filled[severity],
        variant === "outlined" && cn("bg-transparent shadow-[inset_0_0_0_1px_currentColor]", ink[severity]),
        className,
      )}
    >
      <Icon severity={severity} className={variant === "filled" ? "text-white" : undefined} />
      <div className="min-w-0 flex-1 py-2">{children}</div>
      {onClose ? (
        <button
          type="button"
          aria-label="close"
          className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-inherit"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}
