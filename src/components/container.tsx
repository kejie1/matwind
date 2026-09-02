import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

const max: Record<string, string> = {
  xs: "max-w-[444px]",
  sm: "max-w-[600px]",
  md: "max-w-[900px]",
  lg: "max-w-[1200px]",
  xl: "max-w-[1536px]",
};

export function Container({
  maxWidth = "lg",
  disableGutters,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  disableGutters?: boolean;
}) {
  return (
    <div
      {...rest}
      className={cn(
        "mx-auto w-full box-border",
        maxWidth !== false && max[maxWidth],
        !disableGutters && "px-4 sm:px-6",
        className,
      )}
    />
  );
}
