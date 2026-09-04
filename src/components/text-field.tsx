import { useState, type ChangeEvent, type FocusEvent, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label: string;
  variant?: "outlined" | "filled";
  size?: "medium" | "small";
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  minRows?: number;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
};

export function TextField({
  label = "",
  variant = "outlined",
  size = "medium",
  error,
  helperText,
  fullWidth,
  className,
  disabled,
  value,
  defaultValue,
  onFocus,
  onBlur,
  onChange,
  id,
  multiline,
  minRows = 3,
  startAdornment,
  endAdornment,
  ...rest
}: Props) {
  const [focused, setFocused] = useState(false);
  const [inner, setInner] = useState(String(defaultValue ?? ""));
  const current = value !== undefined ? String(value) : inner;
  const shrink = focused || current.length > 0 || !!startAdornment;
  const inputId = id ?? (label.replace(/\s+/g, "-").toLowerCase() || "field");

  const field = {
    id: inputId,
    disabled,
    className: cn("md-field-input", multiline && "md-field-area"),
    placeholder: " ",
    ...(value !== undefined ? { value } : { defaultValue }),
    onFocus: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(true);
      onFocus?.(e as FocusEvent<HTMLInputElement>);
    },
    onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(false);
      onBlur?.(e as FocusEvent<HTMLInputElement>);
    },
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (value === undefined) setInner(e.target.value);
      onChange?.(e as ChangeEvent<HTMLInputElement>);
    },
  };

  return (
    <div
      className={cn("md-field", fullWidth && "md-field-full", className)}
      data-variant={variant}
      data-size={size}
      data-focus={focused ? "1" : "0"}
      data-shrink={shrink ? "1" : "0"}
      data-error={error ? "1" : "0"}
      data-disabled={disabled ? "1" : "0"}
      data-start={startAdornment ? "1" : "0"}
      data-end={endAdornment ? "1" : "0"}
    >
      <label className="md-field-label" htmlFor={inputId}>
        {label}
      </label>
      <div className="md-field-wrap">
        {startAdornment ? <span className="md-field-adorn">{startAdornment}</span> : null}
        {multiline ? (
          <textarea
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            {...field}
            rows={minRows}
          />
        ) : (
          <input {...rest} {...field} />
        )}
        {endAdornment ? <span className="md-field-adorn">{endAdornment}</span> : null}
        {variant === "outlined" ? (
          <fieldset className="md-field-notch" aria-hidden>
            <legend className="md-field-legend">
              <span>{label}</span>
            </legend>
          </fieldset>
        ) : (
          <span className="md-field-underline" aria-hidden />
        )}
      </div>
      {helperText ? <p className="md-field-helper">{helperText}</p> : null}
    </div>
  );
}
