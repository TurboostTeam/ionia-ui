import clsx from "clsx";
import { type FC, type ReactNode } from "react";

import { type HTMLProps } from "../common";

export interface InputProps
  extends Omit<HTMLProps<"input">, "size" | "prefix"> {
  label?: string;

  helperText?: string;

  error?: string;

  disabled?: boolean;

  size?: "md" | "lg";

  prefix?: ReactNode;

  suffix?: ReactNode;
}

const sizeMap = {
  md: clsx(`py-1.5`),
  lg: clsx(`py-2.5`),
};

/**
 * 按钮组件
 */
export const Input: FC<InputProps> = ({
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
}) => {
  return (
    <div className="text-sm">
      {typeof label !== "undefined" && (
        <label
          className="block font-medium leading-6 text-gray-900"
          htmlFor={label}
        >
          {label}
        </label>
      )}

      <div
        className={clsx(
          "flex gap-2 rounded-md px-3 shadow-sm",
          typeof label !== "undefined" && "mt-2",
          "block w-full ring-1 focus-within:cursor-not-allowed focus-within:bg-gray-50 focus-within:text-gray-500 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-200 sm:leading-6",
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
          className={clsx(
            "my-0.5 flex-1 border-0 bg-inherit p-0 text-sm focus:ring-0 disabled:cursor-not-allowed",
            typeof error === "undefined"
              ? `text-gray-900 placeholder:text-gray-400`
              : `text-red-900 placeholder:text-red-300`
          )}
          disabled={disabled}
          type="text"
          {...props}
        />

        {typeof suffix !== "undefined" && (
          <div className="pointer-events-none flex items-center">
            <span className="text-gray-500">{suffix}</span>
          </div>
        )}
      </div>

      {(typeof error !== "undefined" || typeof helperText !== "undefined") && (
        <p
          className={clsx(
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
};
