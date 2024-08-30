import { CheckIcon } from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const selectItem = tv({
  slots: {
    root: "focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-surface-emphasis-active data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    indicator: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
    indicatorIcon: "h-4 w-4",
  },
});

export interface SelectItemProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Item>,
    VariantProps<typeof selectItem> {}

export const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, ...props }, ref) => {
  const { root, indicator, indicatorIcon } = selectItem(props);

  return (
    <SelectPrimitive.Item ref={ref} {...props} className={root({ className })}>
      <span className={indicator()}>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className={indicatorIcon()} />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
