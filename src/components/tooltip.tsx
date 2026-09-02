import { useId, useState, type ReactNode } from "react";
import { cn } from "../lib/cn";

export function Tooltip({
  title,
  placement = "top",
  children,
}: {
  title: string;
  placement?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
}) {
  const id = useId();
  const [on, setOn] = useState(false);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      onFocus={() => setOn(true)}
      onBlur={() => setOn(false)}
    >
      {children}
      <span role="tooltip" id={id} data-place={placement} className={cn("md-tooltip", on && "md-tooltip-on")}>
        {title}
      </span>
    </span>
  );
}
