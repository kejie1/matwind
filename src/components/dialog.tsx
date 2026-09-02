import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../lib/cn";

export function DialogTitle({ children }: { children: ReactNode }) {
  return <h2 className="m-0 px-6 pb-0 pt-4 text-xl font-medium leading-[1.6] tracking-[0.0075em]">{children}</h2>;
}

export function DialogContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("px-6 py-5 text-[1rem] leading-[1.5] tracking-[0.00938em] text-[var(--md-text-secondary)]", className)}>{children}</div>;
}

export function DialogActions({ children }: { children: ReactNode }) {
  return <div className="flex justify-end gap-2 px-2 py-2">{children}</div>;
}

export function DialogContentText({ children }: { children: ReactNode }) {
  return <p className="m-0 text-base leading-[1.5] tracking-[0.00938em] text-[var(--md-text-secondary)]">{children}</p>;
}

export function Dialog({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
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
      className="md-dialog"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="md-dialog-paper" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </dialog>
  );
}
