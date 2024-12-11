import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { FormItem, type FormItemProps } from "../form-item";
import { forwardRef } from "../utils";

export interface NumberInputProps extends FormItemProps {
  min?: number;
  max?: number;
  value?: number | null;
  onChange?: (value: number | null) => void;
  onBlur?: (value: number) => void;
  suffix?: ReactNode;
  prefix?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: twMerge(`py-1`),
  md: twMerge(`py-2`),
  lg: twMerge(`py-2`),
};
export const NumberInput = forwardRef<NumberInputProps, "input">(
  (
    {
      min = Number.MIN_SAFE_INTEGER,
      max = Number.MAX_SAFE_INTEGER,
      value,
      onChange,
      onBlur,
      size = "md",
      error,
      helpText,
      label,
      placeholder,
      disabled,
      prefix,
      suffix,
      className,
      ...props
    },
    ref,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const newValue = e.target.value; // 获取字符串值

      // 如果是空字符串，传递 null；否则转换为数字
      if (newValue === "") {
        onChange?.(null); // 当输入为空时设置为 null
      } else {
        const num = Number(newValue);
        if (!isNaN(num)) {
          onChange?.(num); // 仅在 valid 数字时更新
        }
      }
    };

    const handleBlur = (): void => {
      if (value !== null && value !== undefined) {
        let adjustedValue: number = value;
        // 限制到最小值和最大值
        if (min !== undefined && adjustedValue < min) {
          adjustedValue = min; // 如果低于最小值，设置为最小值
        }
        if (max !== undefined && adjustedValue > max) {
          adjustedValue = max; // 如果高于最大值，设置为最大值
        }

        // 只有当值被调整时才更新
        if (adjustedValue !== value) {
          onChange?.(adjustedValue);
        }
      }
    };

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
            "w-full ring-1 ring-inset ring-default focus-within:bg-surface-emphasis-active focus-within:ring-2 focus-within:ring-inset focus-within:ring-default-focus",
            typeof label !== "undefined" && "mt-2",
            typeof error !== "undefined" &&
              `ring-destructive focus-within:ring-destructive-focus`,
            sizeMap[size],
          )}
        >
          {typeof prefix !== "undefined" && (
            <div className="pointer-events-none flex items-center">
              <span className="text-fill-secondary">{prefix}</span>
            </div>
          )}
          <input
            className={twMerge(
              "min-w-0 flex-1 border-0 bg-inherit p-0 text-sm text-default outline-none placeholder:text-placeholder focus:ring-0 disabled:cursor-not-allowed",
              typeof error !== "undefined" &&
                `text-destructive placeholder:text-destructive-placeholder`,
            )}
            disabled={disabled}
            max={max}
            min={min}
            placeholder={placeholder}
            ref={ref}
            type="number"
            value={value !== null ? value : ""}
            onBlur={handleBlur}
            onChange={(e) => {
              handleChange(e);
            }}
            {...props}
          />
          {typeof suffix !== "undefined" && (
            <div className="pointer-events-none flex items-center">
              <span className="text-fill-secondary">{suffix}</span>
            </div>
          )}
        </div>
      </FormItem>
    );
  },
);
