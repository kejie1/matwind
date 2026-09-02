import { createContext, useContext, useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { SwitchBase } from "./switch-base";

type Group = { name: string; value: string; set: (v: string) => void };
const RadioCtx = createContext<Group | null>(null);

export function RadioGroup({
  name,
  value,
  defaultValue = "",
  onChange,
  row,
  children,
}: {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  row?: boolean;
  children: ReactNode;
}) {
  const auto = useId();
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  return (
    <RadioCtx.Provider
      value={{
        name: name ?? auto,
        value: current,
        set: (v) => {
          if (value === undefined) setInner(v);
          onChange?.(v);
        },
      }}
    >
      <div role="radiogroup" className={cn("flex", row ? "flex-row flex-wrap" : "flex-col")}>
        {children}
      </div>
    </RadioCtx.Provider>
  );
}

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "type"> & {
  size?: "medium" | "small";
  value: string;
};

function Icon({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
      {on ? <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" /> : null}
    </svg>
  );
}

export function Radio({ value, checked, disabled, size, name, ...rest }: Props) {
  const g = useContext(RadioCtx);
  const on = g ? g.value === value : !!checked;
  return (
    <SwitchBase
      {...rest}
      type="radio"
      name={g?.name ?? name}
      value={value}
      checked={on}
      disabled={disabled}
      size={size}
      icon={<Icon on={on} />}
      onChange={() => g?.set(value)}
    />
  );
}
