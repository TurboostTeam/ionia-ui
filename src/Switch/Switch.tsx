import {
  Switch as BaseSwitch,
  type SwitchProps as BaseSwitchProps,
} from "@headlessui/react";
import { twMerge } from "tailwind-merge";

import { FormItem, type FormItemProps } from "../FormItem";
import { forwardRef } from "../utils";

export type SwitchProps = BaseSwitchProps<"input"> &
  Omit<FormItemProps, "children">;

export const Switch = forwardRef<SwitchProps, "input">(
  ({ className, label, helpText, error, checked, ...props }, ref) => {
    return (
      <FormItem
        className={className}
        error={error}
        helpText={helpText}
        label={label}
      >
        <BaseSwitch
          checked={checked}
          className={twMerge(
            checked === true ? "bg-indigo-600" : "bg-gray-200",
            "relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
          )}
          ref={ref}
          {...props}
        >
          <span
            aria-hidden="true"
            className={twMerge(
              checked === true ? "translate-x-6" : "translate-x-0",
              "pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            )}
          />
        </BaseSwitch>
      </FormItem>
    );
  }
);
