import * as PopoverPrimitive from "@radix-ui/react-popover";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";

export interface PopoverTriggerProps
  extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> {}

export const PopoverTrigger = forwardRef<
  ElementRef<typeof PopoverPrimitive.Trigger>,
  PopoverTriggerProps
>(({ className, children, ...props }, ref) => {
  return (
    <PopoverPrimitive.Trigger ref={ref} {...props} asChild>
      {children}
    </PopoverPrimitive.Trigger>
  );
});
