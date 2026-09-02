import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export function Backdrop({
  open,
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { open: boolean; children?: ReactNode }) {
  if (!open) return null;
  return (
    <div
      {...rest}
      className={cn("fixed inset-0 z-[1200] flex items-center justify-center bg-[rgba(0,0,0,0.5)]", className)}
    >
      {children}
    </div>
  );
}
