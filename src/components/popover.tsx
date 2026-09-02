import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../lib/cn";

export function ClickAwayListener({
  onClickAway,
  children,
}: {
  onClickAway: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClickAway();
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [onClickAway]);
  return <div ref={ref}>{children}</div>;
}

export function Popover({
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
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (box.current?.contains(t) || anchor?.contains(t)) return;
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
    <div
      ref={box}
      className={cn("rounded-[var(--md-radius)] bg-white shadow-[var(--md-elev-8)]")}
      style={{ position: "fixed", top: r.bottom + 8, left: r.left, zIndex: 1300 }}
    >
      {children}
    </div>
  );
}
