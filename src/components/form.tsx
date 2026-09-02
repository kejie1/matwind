import type { HTMLAttributes, LabelHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export function FormControl({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div {...rest} className={cn("inline-flex flex-col align-top", className)} />;
}

export function FormGroup({ row, className, ...rest }: HTMLAttributes<HTMLDivElement> & { row?: boolean }) {
  return <div {...rest} className={cn("flex", row ? "flex-row flex-wrap" : "flex-col", className)} />;
}

export function FormLabel({ className, ...rest }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      {...rest}
      className={cn("mb-1 text-xs leading-[1.66] tracking-[0.03333em] text-[var(--md-text-secondary)]", className)}
    />
  );
}

export function FormHelperText({ className, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...rest}
      className={cn("mx-[14px] mt-[3px] mb-0 text-xs leading-[1.66] tracking-[0.03333em] text-[var(--md-text-secondary)]", className)}
    />
  );
}
