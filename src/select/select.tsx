import { XMarkIcon } from "@heroicons/react/24/outline";
import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import {
  Select as SelectWarp,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../atoms/select";
import { FormItem, type FormItemProps } from "../form-item";
import { Spinner } from "../spinner";
import { forwardRef } from "../utils";

export interface SelectOption {
  label: ReactNode;
  value: string;
  description?: ReactNode;
  disabled?: boolean;
}

export interface SelectProps extends FormItemProps {
  className?: string;
  allowClear?: boolean;
  label?: string;
  helpText?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
  options: SelectOption[];
  value?: string;
  onChange?: (value?: string) => void;
}

const sizeMap = {
  sm: twMerge(`py-1`),
  md: twMerge(`py-2`),
  lg: twMerge(`py-3`),
};

export const Select = forwardRef<SelectProps, "div">(
  (
    {
      label,
      allowClear,
      helpText,
      error,
      placeholder,
      disabled = false,
      loading = false,
      size = "md",
      className,
      options = [],
      value,
      onChange,
    },
    ref,
  ) => {
    return (
      <FormItem error={error} helpText={helpText} label={label}>
        <SelectWarp
          disabled={disabled || loading}
          value={value ?? ""}
          onValueChange={onChange}
        >
          <div className="relative">
            <SelectTrigger
              className={twMerge(
                "relative flex w-full cursor-default rounded-md pl-3 pr-10 text-left text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-default-focus",
                sizeMap[size],
                disabled || loading
                  ? "cursor-not-allowed bg-gray-50"
                  : "bg-white",
                typeof error !== "undefined" &&
                  `ring-red-300 focus-within:ring-red-500`,
                className,
              )}
              ref={ref}
            >
              <span className="block h-5 truncate">
                {options.find((item) => item.value === value)?.label ?? (
                  <span
                    className={twMerge(
                      "text-gray-400",
                      typeof error !== "undefined" && "text-red-300",
                    )}
                  >
                    {placeholder}
                  </span>
                )}
              </span>
              {loading && <Spinner size={size} />}
            </SelectTrigger>

            {!loading && typeof allowClear !== "undefined" && allowClear && (
              <span
                className="absolute inset-y-0 right-8 flex cursor-pointer items-center pr-8"
                onClick={(e) => {
                  e.preventDefault();
                  onChange?.(undefined);
                }}
              >
                <XMarkIcon className="h-5 w-5 rounded-full text-gray-400 hover:bg-gray-100" />
              </span>
            )}
          </div>

          <SelectContent>
            {options.map((option) => (
              <SelectItem
                className="hover:bg-surface-emphasis-active active:bg-surface-emphasis-active"
                disabled={option.disabled ?? false}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectWarp>
      </FormItem>
    );
  },
);
