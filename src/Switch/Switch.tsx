import {
  Switch as BaseSwitch,
  type SwitchProps as BaseSwitchProps,
} from "@headlessui/react";
import { twMerge } from "tailwind-merge";

import { FormItem, type FormItemProps } from "../FormItem";
import { forwardRef } from "../utils";

export interface SwitchProps
  extends Omit<BaseSwitchProps<"input">, "className" | "size">,
    Omit<FormItemProps, "children"> {
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: twMerge(`h-5 w-9`),
  md: twMerge(`h-6 w-11`),
  lg: twMerge(`h-8 w-14`),
};

const sliderSizeMap = {
  sm: twMerge(`h-4 w-4`),
  md: twMerge(`h-5 w-5`),
  lg: twMerge(`h-7 w-7`),
};

const sliderCheckedSizeMap = {
  sm: twMerge(`translate-x-4`),
  md: twMerge(`translate-x-5`),
  lg: twMerge(`translate-x-6`),
};

export const Switch = forwardRef<SwitchProps, "input">(
  (
    { className, label, helpText, error, checked, size = "md", ...props },
    ref,
  ) => {
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
            "relative inline-flex flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-0.5",
            sizeMap[size],
          )}
          ref={ref}
          {...props}
        >
          <span
            aria-hidden="true"
            className={twMerge(
              checked === true ? sliderCheckedSizeMap[size] : "translate-x-0",
              "pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
              sliderSizeMap[size],
            )}
          />
        </BaseSwitch>
      </FormItem>
    );
  },
);
