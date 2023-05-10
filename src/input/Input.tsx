import { forwardRef, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { type HTMLProps } from "../common";

export interface InputProps
  extends Omit<HTMLProps<"input">, "size" | "prefix" | "onChange"> {
  label?: string;

  helperText?: string;

  error?: string;

  disabled?: boolean;

  size?: "md" | "lg";

  prefix?: ReactNode;

  suffix?: ReactNode;
}

const sizeMap = {
  md: twMerge(`py-1.5`),
  lg: twMerge(`py-2.5`),
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      children,
      label,
      helperText,
      error,
      disabled = false,
      size = "md",
      className,
      prefix,
      suffix,
      ...props
    },
    ref
  ) => {
    return (
      <div className={twMerge("text-sm", className)}>
        {typeof label !== "undefined" && (
          <label
            className="block font-medium leading-6 text-gray-900"
            htmlFor={label}
          >
            {label}
          </label>
        )}

        <div
          className={twMerge(
            "flex gap-2 rounded-md px-3 shadow-sm",
            typeof label !== "undefined" && "mt-2",
            "w-full ring-1 ring-inset focus-within:cursor-not-allowed focus-within:bg-gray-50 focus-within:text-gray-500 focus-within:ring-2 focus-within:ring-inset",
            typeof error === "undefined"
              ? `ring-gray-300 focus-within:ring-indigo-600`
              : `ring-red-300 focus-within:ring-red-500`,
            sizeMap[size]
          )}
        >
          {typeof prefix !== "undefined" && (
            <div className="pointer-events-none flex items-center">
              <span className="text-gray-500">{prefix}</span>
            </div>
          )}

          <input
            className={twMerge(
              "flex-1 border-0 bg-inherit p-0 text-sm focus:ring-0 disabled:cursor-not-allowed",
              typeof error === "undefined"
                ? `text-gray-900 placeholder:text-gray-400`
                : `text-red-900 placeholder:text-red-300`
            )}
            disabled={disabled}
            ref={ref}
            type="text"
            {...props}
          />

          {typeof suffix !== "undefined" && (
            <div className="pointer-events-none flex items-center">
              <span className="text-gray-500">{suffix}</span>
            </div>
          )}
        </div>

        {(typeof error !== "undefined" ||
          typeof helperText !== "undefined") && (
          <p
            className={twMerge(
              `mt-2`,
              typeof error !== "undefined" && `text-red-600`,
              typeof error === "undefined" &&
                typeof helperText !== "undefined" &&
                `text-gray-500`
            )}
          >
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  }
);
