import {
  Switch as BaseSwitch,
  type SwitchProps as BaseSwitchProps,
} from "@headlessui/react";
import { tv } from "tailwind-variants";

import { FormItem, type FormItemProps } from "@/form-item";
import { forwardRef } from "@/utils";

export interface SwitchProps
  extends Omit<BaseSwitchProps<"input">, "className" | "size">,
    Omit<FormItemProps, "children"> {
  size?: "sm" | "md" | "lg";
}

// eslint-disable-next-line react-refresh/only-export-components
export const switchStyle = tv({
  slots: {
    root: "relative inline-flex flex-shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out",
    thumbIcon:
      "pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
  },
  variants: {
    checked: {
      true: {
        root: "bg-fill-primary",
      },
      false: { root: "bg-fill-disabled", thumbIcon: "translate-x-0" },
    },
    size: {
      sm: {
        root: "h-5 w-9",
        thumbIcon: "h-4 w-4",
      },
      md: {
        root: "h-6 w-11",
        thumbIcon: "h-5 w-5",
      },
      lg: {
        root: "h-8 w-14",
        thumbIcon: "h-7 w-7",
      },
    },
  },
  compoundVariants: [
    {
      checked: true,
      size: "sm",
      class: {
        thumbIcon: "translate-x-4",
      },
    },
    {
      checked: true,
      size: "md",
      class: {
        thumbIcon: "translate-x-5",
      },
    },
    {
      checked: true,
      size: "lg",
      class: {
        thumbIcon: "translate-x-6",
      },
    },
  ],
});

export const Switch = forwardRef<SwitchProps, "input">(
  (
    { className, label, helpText, error, checked, size = "md", ...props },
    ref,
  ) => {
    const { root, thumbIcon } = switchStyle({
      checked,
      size,
    });

    return (
      <FormItem
        className={className}
        error={error}
        helpText={helpText}
        label={label}
      >
        <BaseSwitch checked={checked} className={root()} ref={ref} {...props}>
          <span aria-hidden="true" className={thumbIcon()} />
        </BaseSwitch>
      </FormItem>
    );
  },
);
