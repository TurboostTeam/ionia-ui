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
              "h-4 w-4 cursor-pointer rounded border-default text-primary focus:outline-none  focus:ring-0 focus:ring-offset-0",
              disabled === true &&
                "cursor-not-allowed bg-gray-100 checked:bg-fill-disabled checked:hover:bg-fill-disabled",
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
                  "absolute pointer-events-none inset-0 m-auto h-0.5 w-3/4 rounded bg-fill-primary ",
                  disabled === true && "bg-fill-disabled ",
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
