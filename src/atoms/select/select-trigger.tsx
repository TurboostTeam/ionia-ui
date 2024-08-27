import { CaretSortIcon } from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const selectTrigger = tv({
  slots: {
    root: "border-input placeholder:text-muted-foreground flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-focus disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    icon: "h-4 w-4 opacity-50",
  },
});

export interface SelectTriggerProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTrigger> {}

export const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, ...props }, ref) => {
  const { root, icon } = selectTrigger(props);

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      {...props}
      className={root({ className })}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <CaretSortIcon className={icon()} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
