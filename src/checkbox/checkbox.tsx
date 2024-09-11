import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { forwardRef } from "../utils";

export interface CheckboxProps {
  label: string;
  helpText?: string;
  indeterminate?: boolean;
  disabled?: boolean;
}

export const CheckboxStyle = tv({
  slots: {
    textContent: "text-default",
  },
  variants: {
    disabled: {
      true: {
        textContent: "text-disabled",
      },
    },
  },
});

export const Checkbox = forwardRef<CheckboxProps, "input">(
  (
    { label, helpText, disabled, className, indeterminate = false, ...props },
    ref,
  ) => {
    const { textContent } = CheckboxStyle({
      disabled,
    });

    return (
      <div className={twMerge("relative flex items-start py-1", className)}>
        <div className="relative flex h-5 items-center">
          <input
            className={twMerge(
              "h-4 w-4 cursor-pointer rounded border-default text-primary outline-none focus-within:ring-0 focus:outline-none",
              disabled === true &&
                "bg-disabled checked:bg-disabled checked:hover:bg-disabled cursor-not-allowed",
            )}
            disabled={disabled}
            ref={ref}
            type="checkbox"
            {...props}
          />

          {indeterminate &&
            ((typeof props.checked !== "undefined" && !props.checked) ||
              typeof props.checked === "undefined") && (
              <span
                className={twMerge(
                  "pointer-events-none absolute inset-0 m-auto h-0.5 w-3/4 rounded bg-fill-primary",
                  disabled === true && "bg-disabled",
                )}
              />
            )}
        </div>

        <div className="ml-2 text-sm">
          <label className={textContent()}>{label}</label>

          {typeof helpText !== "undefined" && (
            <p className="mt-2 text-description">{helpText}</p>
          )}
        </div>
      </div>
    );
  },
);
