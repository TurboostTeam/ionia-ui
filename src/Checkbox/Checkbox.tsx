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
              "h-4 w-4 cursor-pointer rounded border-default text-emphasis focus:outline-none  outline-none focus-within:ring-0",
              disabled === true &&
                "cursor-not-allowed bg-disabled checked:bg-disabled checked:hover:bg-disabled",
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
                  "absolute pointer-events-none inset-0 m-auto h-0.5 w-3/4 rounded bg-emphasis",
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
