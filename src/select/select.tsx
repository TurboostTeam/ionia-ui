import { XMarkIcon } from "@heroicons/react/24/outline";
import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import {
  Select as SelectRoot,
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
        <SelectRoot
          disabled={disabled || loading}
          value={value ?? ""}
          onValueChange={onChange}
        >
          <div className="relative">
            <SelectTrigger
              className={twMerge(sizeMap[size], className)}
              ref={ref}
            >
              <span className="block h-5 truncate">
                {options.find((item) => item.value === value)?.label ?? (
                  <span className="text-gray-400">{placeholder}</span>
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
                <div>
                  <span className="block truncate">{option.label}</span>
                  <span className="text-xs text-description">
                    {option.description}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </FormItem>
    );
  },
);
