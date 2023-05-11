import { type DetailedHTMLProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type CheckboxProps = DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  helpText?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, helpText, className, ...props }, ref) => {
    return (
      <div className={twMerge("relative flex items-start py-1.5", className)}>
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
