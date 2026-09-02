import { useEffect, type ReactNode } from "react";

export function Snackbar({
  open,
  onClose,
  message,
  autoHideDuration = 4000,
  action,
}: {
  open: boolean;
  onClose: () => void;
  message: string;
  autoHideDuration?: number;
  action?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(onClose, autoHideDuration);
    return () => window.clearTimeout(t);
  }, [open, autoHideDuration, onClose]);

  if (!open) return null;
  return (
    <div className="md-snack" role="status">
      <span className="min-w-0 flex-1">{message}</span>
      {action ? <span className="ml-4 shrink-0">{action}</span> : null}
    </div>
  );
}
