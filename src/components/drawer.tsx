import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../lib/cn";

export function Drawer({
  open,
  onClose,
  anchor = "left",
  children,
}: {
  open: boolean;
  onClose: () => void;
  anchor?: "left" | "right" | "top" | "bottom";
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={cn("md-drawer", `md-drawer-${anchor}`)}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="md-drawer-paper" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </dialog>
  );
}
