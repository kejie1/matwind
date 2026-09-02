import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Fab } from "./fab";
import { Tooltip } from "./tooltip";

export function SpeedDial({
  open,
  onOpen,
  onClose,
  icon,
  children,
  className,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      <div className={cn("flex flex-col items-center pb-2", !open && "invisible pointer-events-none")}>
        {Children.map(children, (child) =>
          isValidElement(child) ? cloneElement(child as ReactElement<{ open?: boolean }>, { open }) : child,
        )}
      </div>
      <Fab aria-label="speed dial" aria-expanded={open} onClick={open ? onClose : onOpen}>
        <span className={cn("inline-flex transition-transform duration-[var(--md-duration-short)] ease-[var(--md-ease)]", open && "rotate-45")}>
          {icon}
        </span>
      </Fab>
    </div>
  );
}

export function SpeedDialAction({
  icon,
  tooltipTitle,
  onClick,
}: {
  icon: ReactNode;
  tooltipTitle: string;
  onClick?: () => void;
  open?: boolean;
}) {
  return (
    <Tooltip title={tooltipTitle}>
      <span className="my-2">
        <Fab size="small" color="inherit" aria-label={tooltipTitle} onClick={onClick}>
          {icon}
        </Fab>
      </span>
    </Tooltip>
  );
}
