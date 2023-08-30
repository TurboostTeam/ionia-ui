import { twMerge } from "tailwind-merge";

import { forwardRef } from "../utils";

export interface CheckboxProps {
  label: string;
  helpText?: string;
  disabled?: boolean;
}

export const Checkbox = forwardRef<CheckboxProps, "input">(
  ({ label, helpText, disabled, className, ...props }, ref) => {
    return (
      <div className={twMerge("relative flex items-start py-1", className)}>
        <div className="flex h-5 items-center">
          <input
            className={twMerge(
              "h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-600",
              disabled === true &&
                "cursor-not-allowed bg-gray-100 checked:bg-gray-300 checked:hover:bg-gray-300",
            )}
            disabled={disabled}
            ref={ref}
            type="checkbox"
            {...props}
          />
        </div>

        <div className="ml-2 text-sm">
          <label
            className={twMerge(
              "text-gray-900",
              disabled === true && "text-gray-400",
            )}
          >
            {label}
          </label>

          {typeof helpText !== "undefined" && (
            <p className="mt-2 text-gray-500">{helpText}</p>
          )}
        </div>
      </div>
    );
  },
);
