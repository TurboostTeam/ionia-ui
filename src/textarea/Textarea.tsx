import { type HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

import { forwardRef } from "../common";
import { FormItem, type FormItemProps } from "../form-item";

export interface TextareaProps
  extends FormItemProps,
    Omit<HTMLProps<HTMLTextAreaElement>, "ref" | "onChange"> {
  onChange?: (value: string) => void;
}

export const Textarea = forwardRef<TextareaProps, "textarea">(
  (
    {
      children,
      label,
      helpText,
      error,
      className,
      value,
      onChange,
      rows = 3,
      ...props
    },
    ref
  ) => {
    return (
      <FormItem
        className={className}
        error={error}
        helpText={helpText}
        label={label}
      >
        <textarea
          className={twMerge(
            "rounded-md px-3 py-2 shadow-sm min-w-0 border-0 bg-inherit text-sm disabled:cursor-not-allowed w-full ring-1 ring-inset focus-within:bg-gray-50 focus:text-gray-500 focus:ring-2 focus:ring-inset ring-gray-300 focus:ring-indigo-600 placeholder:text-gray-400 text-gray-900",
            typeof label !== "undefined" && "mt-2",
            typeof error !== "undefined" &&
              `ring-red-300 focus:ring-red-500 placeholder:text-red-300 text-red-900`
          )}
          ref={ref}
          rows={rows}
          value={value ?? ""}
          onChange={(event) => onChange?.(event.target.value)}
          {...props}
        />
      </FormItem>
    );
  }
);
