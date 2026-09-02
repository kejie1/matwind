import { createElement, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "button"
  | "caption"
  | "overline";

const skin: Record<TypographyVariant, string> = {
  h1: "text-[6rem] font-light leading-[1.167] tracking-[-0.01562em]",
  h2: "text-[3.75rem] font-light leading-[1.2] tracking-[-0.00833em]",
  h3: "text-[3rem] font-normal leading-[1.167]",
  h4: "text-[2.125rem] font-normal leading-[1.235] tracking-[0.00735em]",
  h5: "text-2xl font-normal leading-[1.334]",
  h6: "text-xl font-medium leading-[1.6] tracking-[0.0075em]",
  subtitle1: "text-base font-normal leading-[1.75] tracking-[0.00938em]",
  subtitle2: "text-sm font-medium leading-[1.57] tracking-[0.00714em]",
  body1: "text-base font-normal leading-normal tracking-[0.00938em]",
  body2: "text-sm font-normal leading-[1.43] tracking-[0.01071em]",
  button: "text-sm font-medium uppercase leading-[1.75] tracking-[0.02857em]",
  caption: "text-xs font-normal leading-[1.66] tracking-[0.03333em]",
  overline: "text-xs font-normal uppercase leading-[2.66] tracking-[0.08333em]",
};

const tag: Record<TypographyVariant, string> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  button: "span",
  caption: "span",
  overline: "span",
};

export function Typography({
  variant = "body1",
  component,
  gutterBottom,
  color,
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLElement> & {
  variant?: TypographyVariant;
  component?: string;
  gutterBottom?: boolean;
  color?: "primary" | "secondary" | "error" | "inherit";
  children?: ReactNode;
}) {
  return createElement(
    component ?? tag[variant],
    {
      ...rest,
      className: cn(
        "m-0",
        skin[variant],
        gutterBottom && "mb-[0.35em]",
        color === "primary" && "text-[var(--md-primary)]",
        color === "secondary" && "text-[var(--md-text-secondary)]",
        color === "error" && "text-[var(--md-error)]",
        className,
      ),
    },
    children,
  );
}
