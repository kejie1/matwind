import { createContext, useContext, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { RippleLayer, useRipple } from "./ripple";

const Ctx = createContext<{ value: string; set: (v: string) => void } | null>(null);

export function BottomNavigation({
  value,
  onChange,
  children,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Ctx.Provider value={{ value, set: onChange }}>
      <div className={cn("flex h-14 justify-center bg-white", className)}>{children}</div>
    </Ctx.Provider>
  );
}

export function BottomNavigationAction({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: ReactNode;
}) {
  const g = useContext(Ctx);
  const selected = g?.value === value;
  const ripple = useRipple();
  return (
    <button
      type="button"
      aria-selected={selected}
      ref={(node) => {
        ripple.ref.current = node;
      }}
      {...ripple.bind}
      onClick={() => g?.set(value)}
      className={cn(
        "relative flex h-full min-w-20 max-w-[168px] flex-1 flex-col items-center justify-center overflow-hidden border-0 bg-transparent px-3",
        "cursor-pointer text-[0.75rem] leading-none tracking-[0.03333em]",
        "transition-colors duration-[var(--md-duration-short)] ease-[var(--md-ease)]",
        selected ? "text-[var(--md-primary)]" : "text-[var(--md-text-secondary)]",
      )}
    >
      <RippleLayer ripples={ripple.ripples} />
      <span className="relative z-[1] inline-flex [&>svg]:size-6">{icon}</span>
      <span className={cn("relative z-[1] mt-1", selected && "text-sm")}>{label}</span>
    </button>
  );
}
