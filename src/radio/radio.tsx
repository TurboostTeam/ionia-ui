import { twMerge } from "tailwind-merge";

import { forwardRef } from "../utils";

export interface RadioProps {
  label: string;
  helpText?: string;
}

export const Radio = forwardRef<RadioProps, "input">(
  ({ label, helpText, className, ...props }, ref) => {
    return (
      <div className={twMerge("relative flex items-start py-1", className)}>
        <div className="flex h-5 items-center">
          <input
            className="h-4 w-4 cursor-pointer border-secondary text-primary focus-within:ring-0"
            ref={ref}
            type="radio"
            {...props}
          />
        </div>
        <div className="ml-2 text-sm">
          <label className="text-default">{label}</label>

          {typeof helpText !== "undefined" && (
            <p className="mt-2 text-description">{helpText}</p>
          )}
        </div>
      </div>
    );
  },
);
