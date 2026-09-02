import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { Paper } from "./paper";

export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <Paper elevation={1} {...rest} className={cn("overflow-hidden", className)} />;
}

export function CardContent({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div {...rest} className={cn("px-4 py-4", className)} />;
}

export function CardActions({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("flex items-center gap-2 px-2 pb-2", className)}>{children}</div>;
}

export function CardMedia({
  image,
  src,
  alt,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { image?: string; src?: string; alt?: string }) {
  if (src) {
    return <img src={src} alt={alt ?? ""} className={cn("block w-full object-cover", className)} />;
  }
  return (
    <div
      {...rest}
      role="img"
      className={cn("block bg-cover bg-center bg-no-repeat", className)}
      style={{ backgroundImage: image ? `url(${image})` : undefined, ...rest.style }}
    />
  );
}

export function CardHeader({ title, subheader }: { title: ReactNode; subheader?: ReactNode }) {
  return (
    <div className="px-4 pb-0 pt-4">
      <div className="text-xl font-medium leading-[1.6] tracking-[0.0075em]">{title}</div>
      {subheader ? <div className="text-sm text-[var(--md-text-secondary)]">{subheader}</div> : null}
    </div>
  );
}

export function CardActionArea({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative block w-full cursor-pointer overflow-hidden border-0 bg-transparent p-0 text-left",
        "hover:bg-[var(--md-action-hover)]",
        className,
      )}
    >
      {children}
    </button>
  );
}
