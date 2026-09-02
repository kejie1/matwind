import type { SelectHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export function NativeSelect({ className, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...rest}
      className={cn(
        "m-0 w-full cursor-pointer border-0 border-b border-solid border-[var(--md-action-active)] bg-transparent py-[5px] pr-6 text-base",
        "appearance-none md-focus focus:border-[var(--md-primary)] focus:border-b-2",
        className,
      )}
    />
  );
}
