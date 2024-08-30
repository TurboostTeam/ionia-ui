import { XMarkIcon } from "@heroicons/react/24/outline";
import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../atoms/select";
import { FormItem, type FormItemProps } from "../form-item";
import { Spinner } from "../spinner";
import { forwardRef } from "../utils";

export const select = tv({
  slots: {
    trigger: "py-2",
    triggerLabel: "block h-5 truncate",
    itemLabel: "block truncate",
    itemDescription: "text-xs text-description",
    allowClearButton:
      "absolute inset-y-0 right-8 flex cursor-pointer items-center",
    allowClearIcon: "h-5 w-5 rounded-full text-gray-400 hover:bg-gray-100",
  },
  variants: {
    size: {
      sm: { trigger: "py-1" },
      md: { trigger: "py-2" },
      lg: { trigger: "py-3" },
    },
  },
});

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
    const {
      itemLabel,
      itemDescription,
      trigger,
      triggerLabel,
      allowClearButton,
      allowClearIcon,
    } = select({ size });
    return (
      <FormItem error={error} helpText={helpText} label={label}>
        <SelectRoot
          disabled={disabled || loading}
          value={value ?? ""}
          onChange={onChange}
        >
          <div className="relative">
            <SelectTrigger className={twMerge(trigger(), className)} ref={ref}>
              {!loading && (
                <span className={triggerLabel()}>
                  {options.find((item) => item.value === value)?.label ?? (
                    <span>{placeholder}</span>
                  )}
                </span>
              )}

              {loading && <Spinner size={size} />}
            </SelectTrigger>

            {!loading && typeof allowClear !== "undefined" && allowClear && (
              <span
                className={allowClearButton()}
                onClick={(e) => {
                  e.preventDefault();
                  onChange?.(undefined);
                }}
              >
                <XMarkIcon className={allowClearIcon()} />
              </span>
            )}
          </div>

          <SelectContent>
            {options.map((option) => (
              <SelectItem
                disabled={option.disabled ?? false}
                key={option.value}
                value={option.value}
              >
                <div>
                  <span className={itemLabel()}>{option.label}</span>
                  <span className={itemDescription()}>
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
