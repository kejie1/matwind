import { useState, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { RippleLayer, useRipple } from "./ripple";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> & {
  size?: "medium" | "small";
  onChange?: (e: { target: { checked: boolean } }) => void;
};

export function Switch({
  checked,
  defaultChecked,
  disabled,
  size = "medium",
  className,
  onChange,
  ...rest
}: Props) {
  const ripple = useRipple(disabled);
  const [inner, setInner] = useState(!!defaultChecked);
  const on = checked ?? inner;
  const small = size === "small";

  return (
    <span
      className={cn(
        "relative z-0 inline-flex shrink-0 overflow-hidden align-middle",
        small ? "h-6 w-10 p-[7px]" : "h-[38px] w-[58px] p-3",
        className,
      )}
    >
      <span
        ref={(node) => {
          ripple.ref.current = node;
        }}
        className={cn(
          "absolute z-[1] inline-flex items-center justify-center overflow-hidden rounded-full",
          "transition-transform duration-[var(--md-duration-shortest)] ease-[var(--md-ease)]",
          small ? "top-0 left-0 size-6" : "top-0 left-0 size-[38px]",
          on && (small ? "translate-x-4" : "translate-x-5"),
        )}
      >
        <RippleLayer ripples={ripple.ripples} />
        <span
          className={cn(
            "relative z-[1] rounded-full shadow-[var(--md-elev-1)]",
            small ? "size-4" : "size-5",
            on ? "bg-[var(--md-primary)]" : "bg-white",
            disabled && (on ? "bg-[color-mix(in_srgb,var(--md-primary)_38%,white)]" : "bg-[#f5f5f5]"),
          )}
        />
      </span>
      <span
        className={cn(
          "h-full w-full rounded-[7px]",
          "transition-[opacity,background-color] duration-[var(--md-duration-shortest)] ease-[var(--md-ease)]",
          on ? "bg-[var(--md-primary)] opacity-50" : "bg-black opacity-[0.38]",
          disabled && "opacity-[0.12]",
        )}
      />
      <input
        {...rest}
        type="checkbox"
        role="switch"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="absolute z-[2] m-0 cursor-pointer opacity-0 disabled:cursor-default"
        style={{ left: "-100%", width: "300%", height: "100%", top: 0 }}
        onPointerDown={ripple.bind.onPointerDown}
        onPointerUp={ripple.bind.onPointerUp}
        onPointerCancel={ripple.bind.onPointerCancel}
        onKeyDown={ripple.bind.onKeyDown}
        onKeyUp={ripple.bind.onKeyUp}
        onChange={(e) => {
          if (checked === undefined) setInner(e.target.checked);
          onChange?.({ target: { checked: e.target.checked } });
        }}
      />
    </span>
  );
}
