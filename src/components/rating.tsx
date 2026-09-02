import { useState } from "react";
import { cn } from "../lib/cn";

export function Rating({
  value,
  onChange,
  max = 5,
  readOnly,
  size = "medium",
  className,
}: {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
}) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  const px = size === "small" ? 18 : size === "large" ? 30 : 24;
  return (
    <span
      role="radiogroup"
      className={cn("inline-flex text-[var(--md-rating)]", readOnly && "pointer-events-none", className)}
      onMouseLeave={() => setHover(0)}
    >
      {Array.from({ length: max }, (_, i) => {
        const n = i + 1;
        const filled = n <= shown;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} Stars`}
            className="inline-flex cursor-pointer border-0 bg-transparent p-[2px] text-inherit"
            onMouseEnter={() => setHover(n)}
            onClick={() => onChange?.(n)}
          >
            <svg viewBox="0 0 24 24" width={px} height={px} fill="currentColor" className={filled ? undefined : "text-[var(--md-action-disabled)]"} aria-hidden>
              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </button>
        );
      })}
    </span>
  );
}
