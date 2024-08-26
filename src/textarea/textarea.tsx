import { type HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

import { FormItem, type FormItemProps } from "../form-item";
import { forwardRef } from "../utils";

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
    ref,
  ) => {
    return (
      <FormItem error={error} helpText={helpText} label={label}>
        <textarea
          className={twMerge(
            "rounded-md px-3 py-2 shadow-sm min-w-0 border-0 bg-surface-emphasis text-sm disabled:cursor-not-allowed w-full ring-1 ring-inset focus-within:bg-surface-emphasis-active  focus:ring-2 focus:ring-inset ring-default focus:ring-default-focus placeholder:text-placeholder text-default",
            typeof label !== "undefined" && "mt-2",
            typeof error !== "undefined" &&
              `ring-destructive focus:ring-destructive-focus placeholder:text-destructive-placeholder text-destructive`,
            className,
          )}
          ref={ref}
          rows={rows}
          value={value ?? ""}
          onChange={(event) => onChange?.(event.target.value)}
          {...props}
        />
      </FormItem>
    );
  },
);
