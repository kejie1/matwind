import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../lib/cn";

export function Menu({
  open,
  onClose,
  anchor,
  children,
}: {
  open: boolean;
  onClose: () => void;
  anchor: HTMLElement | null;
  children: ReactNode;
}) {
  const menu = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (menu.current?.contains(t) || anchor?.contains(t)) return;
      onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, anchor]);

  if (!open || !anchor) return null;
  const r = anchor.getBoundingClientRect();
  return (
    <ul
      ref={menu}
      role="menu"
      className={cn("md-menu")}
      style={{ position: "fixed", top: r.bottom + 4, left: r.left, minWidth: r.width, zIndex: 1300 }}
    >
      {children}
    </ul>
  );
}

export function MenuList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <ul role="menu" className={cn("md-menu", className)}>
      {children}
    </ul>
  );
}

export { MenuItem } from "./select";
