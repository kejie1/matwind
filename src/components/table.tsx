import { createContext, useContext, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from "react";
import { cn } from "../lib/cn";

const Lvl = createContext<"head" | "body">("body");

export function TableContainer({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div {...rest} className={cn("w-full overflow-auto", className)} />;
}

export function Table({ className, ...rest }: HTMLAttributes<HTMLTableElement>) {
  return <table {...rest} className={cn("w-full border-collapse caption-bottom text-left", className)} />;
}

export function TableHead({ className, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <Lvl.Provider value="head">
      <thead {...rest} className={className} />
    </Lvl.Provider>
  );
}

export function TableBody({ className, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <Lvl.Provider value="body">
      <tbody {...rest} className={className} />
    </Lvl.Provider>
  );
}

export function TableRow({
  hover,
  selected,
  className,
  ...rest
}: HTMLAttributes<HTMLTableRowElement> & { hover?: boolean; selected?: boolean }) {
  return (
    <tr
      {...rest}
      className={cn(
        hover && "hover:bg-[var(--md-action-hover)]",
        selected && "bg-[color-mix(in_srgb,var(--md-primary)_8%,transparent)]",
        className,
      )}
    />
  );
}

export function TableFooter({ className, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <Lvl.Provider value="body">
      <tfoot {...rest} className={className} />
    </Lvl.Provider>
  );
}

export function TableCell({
  align,
  className,
  ...rest
}: (TdHTMLAttributes<HTMLTableCellElement> | ThHTMLAttributes<HTMLTableCellElement>) & {
  align?: "left" | "right" | "center";
}) {
  const head = useContext(Lvl) === "head";
  const Tag = head ? "th" : "td";
  return (
    <Tag
      {...rest}
      className={cn(
        "border-b border-[var(--md-table-border)] px-4 py-4 text-sm leading-6 tracking-[0.01071em]",
        head && "font-medium",
        align === "right" && "text-right",
        align === "center" && "text-center",
        className,
      )}
    />
  );
}

export function TableSortLabel({
  active,
  direction = "asc",
  onClick,
  children,
}: {
  active?: boolean;
  direction?: "asc" | "desc";
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex cursor-pointer items-center border-0 bg-transparent p-0 font-medium text-inherit"
    >
      {children}
      <svg
        viewBox="0 0 24 24"
        className={cn(
          "ml-1 size-[18px] text-[var(--md-text-secondary)]",
          active ? "opacity-100" : "opacity-0",
          direction === "desc" && "rotate-180",
        )}
        fill="currentColor"
        aria-hidden
      >
        <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
      </svg>
    </button>
  );
}

export function TablePagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
}) {
  const from = count === 0 ? 0 : page * rowsPerPage + 1;
  const to = Math.min(count, (page + 1) * rowsPerPage);
  const last = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
  return (
    <div className="flex items-center justify-end gap-6 px-2 py-1 text-sm text-[var(--md-text-secondary)]">
      <span>
        {from}–{to} of {count}
      </span>
      <span className="flex">
        <button
          type="button"
          aria-label="Go to previous page"
          disabled={page <= 0}
          className="inline-flex size-8 cursor-pointer items-center justify-center border-0 bg-transparent disabled:text-[var(--md-action-disabled)]"
          onClick={() => onPageChange(page - 1)}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Go to next page"
          disabled={page >= last}
          className="inline-flex size-8 cursor-pointer items-center justify-center border-0 bg-transparent disabled:text-[var(--md-action-disabled)]"
          onClick={() => onPageChange(page + 1)}
        >
          ›
        </button>
      </span>
    </div>
  );
}
