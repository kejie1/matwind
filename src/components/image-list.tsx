import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export function ImageList({
  cols = 2,
  gap = 4,
  rowHeight = 180,
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLUListElement> & {
  cols?: number;
  gap?: number;
  rowHeight?: number | "auto";
  children?: ReactNode;
}) {
  return (
    <ul
      {...rest}
      className={cn("m-0 grid list-none overflow-auto p-0", className)}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, ...rest.style }}
    >
      {children}
    </ul>
  );
}

export function ImageListItem({
  children,
  className,
  rowHeight = 180,
  ...rest
}: HTMLAttributes<HTMLLIElement> & { rowHeight?: number | "auto"; children?: ReactNode }) {
  return (
    <li
      {...rest}
      className={cn("relative overflow-hidden [&>img]:size-full [&>img]:object-cover", className)}
      style={{ height: rowHeight === "auto" ? undefined : rowHeight, ...rest.style }}
    >
      {children}
    </li>
  );
}

export function ImageListItemBar({
  title,
  subtitle,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-x-0 bottom-0 bg-[rgba(0,0,0,0.5)] px-3 py-2 text-white", className)}>
      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">{title}</div>
      {subtitle ? <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xs opacity-80">{subtitle}</div> : null}
    </div>
  );
}
