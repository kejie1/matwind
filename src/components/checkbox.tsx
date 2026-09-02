import { useState, type InputHTMLAttributes } from "react";
import { SwitchBase } from "./switch-base";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> & {
  size?: "medium" | "small";
  indeterminate?: boolean;
  onChange?: (e: { target: { checked: boolean } }) => void;
};

function Icon({ kind }: { kind: "off" | "on" | "ind" }) {
  if (kind === "on") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    );
  }
  if (kind === "ind") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
    </svg>
  );
}

export function Checkbox({
  checked,
  defaultChecked,
  indeterminate,
  disabled,
  size,
  onChange,
  ...rest
}: Props) {
  const [inner, setInner] = useState(!!defaultChecked);
  const on = checked ?? inner;
  const kind = indeterminate ? "ind" : on ? "on" : "off";
  return (
    <SwitchBase
      {...rest}
      type="checkbox"
      role="checkbox"
      checked={on}
      disabled={disabled}
      size={size}
      icon={<Icon kind={kind} />}
      indeterminate={indeterminate}
      onChange={(e) => {
        if (checked === undefined) setInner(e.target.checked);
        onChange?.({ target: { checked: e.target.checked } });
      }}
    />
  );
}
