import { XCircleIcon } from "@heroicons/react/24/outline";
import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { FormItem, type FormItemProps } from "../FormItem";
import { Icon } from "../Icon";
import { forwardRef } from "../utils";

export interface InputProps extends FormItemProps {
  disabled?: boolean;

  size?: "sm" | "md" | "lg";

  prefix?: ReactNode;

  suffix?: ReactNode;

  placeholder?: string;

  value?: string;

  onChange?: (value: string) => void;

  clearButton?: boolean;

  showCharacterCount?: boolean;

  maxLength?: number;
}

const sizeMap = {
  sm: twMerge(`py-1`),
  md: twMerge(`py-2`),
  lg: twMerge(`py-2`),
};

export const Input = forwardRef<InputProps, "input">(
  (
    {
      children,
      label,
      helpText,
      error,
      disabled = false,
      size = "md",
      className,
      prefix,
      maxLength,
      suffix,
      value,
      onChange,
      clearButton = false,
      showCharacterCount = false,
      ...props
    },
    ref,
  ) => {
    return (
      <FormItem
        className={className}
        error={error}
        helpText={helpText}
        label={label}
      >
        <div
          className={twMerge(
            "flex gap-2 rounded-md px-3 shadow-sm",
            "w-full ring-1 ring-inset focus-within:bg-gray-50 focus-within:text-gray-500 focus-within:ring-2 focus-within:ring-inset ring-gray-300 focus-within:ring-indigo-600",
            typeof label !== "undefined" && "mt-2",
            typeof error !== "undefined" &&
              `ring-red-300 focus-within:ring-red-500`,
            sizeMap[size],
          )}
          ref={ref}
        >
          {typeof prefix !== "undefined" && (
            <div className="pointer-events-none flex items-center">
              <span className="text-gray-500">{prefix}</span>
            </div>
          )}

          <input
            className={twMerge(
              "flex-1 min-w-0 border-0 bg-inherit p-0 text-sm focus:ring-0 disabled:cursor-not-allowed text-gray-900 placeholder:text-gray-400 peer",
              typeof error !== "undefined" &&
                `text-red-900 placeholder:text-red-300`,
            )}
            disabled={disabled}
            maxLength={maxLength}
            type="text"
            value={value ?? ""}
            onChange={(event) => onChange?.(event.target.value)}
            {...props}
          />

          {clearButton && value !== "" && (
            <button
              className="hidden peer-focus:block"
              onClick={() => {
                onChange?.("");
              }}
            >
              <Icon as={XCircleIcon} className="text-gray-400" />
            </button>
          )}

          {showCharacterCount && (
            <div className="flex items-center text-gray-400">
              {typeof maxLength === "undefined"
                ? value?.length ?? 0
                : `${maxLength} / ${value?.length ?? 0}`}
            </div>
          )}

          {typeof suffix !== "undefined" && (
            <div className="pointer-events-none flex items-center">
              <span className="text-gray-500">{suffix}</span>
            </div>
          )}
        </div>
      </FormItem>
    );
  },
);
