import { type DetailedHTMLProps, forwardRef } from "react";

export type RadioProps = DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  helpText?: string;
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, helpText, className, ...props }, ref) => {
    return (
      <div className="relative flex items-start py-1.5">
        <div className="flex h-5 items-center">
          <input
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            ref={ref}
            type="radio"
            {...props}
          />
        </div>
        <div className="ml-2 text-sm">
          <label className="font-medium text-gray-900">{label}</label>

          {typeof helpText !== "undefined" && (
            <p className="mt-2 text-gray-500">{helpText}</p>
          )}
        </div>
      </div>
    );
  }
);
