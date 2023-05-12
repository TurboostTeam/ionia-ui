import { twMerge } from "tailwind-merge";

import { forwardRef } from "../common";

export interface CheckboxProps {
  label: string;
  helpText?: string;
}

export const Checkbox = forwardRef<CheckboxProps, "input">(
  ({ label, helpText, className, ...props }, ref) => {
    return (
      <div className={twMerge("relative flex items-start py-1", className)}>
        <div className="flex h-5 items-center">
          <input
            className="h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            ref={ref}
            type="checkbox"
            {...props}
          />
        </div>

        <div className="ml-2 text-sm">
          <label className="text-gray-900">{label}</label>

          {typeof helpText !== "undefined" && (
            <p className="mt-2 text-gray-500">{helpText}</p>
          )}
        </div>
      </div>
    );
  }
);
