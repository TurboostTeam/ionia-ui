import * as PopoverPrimitive from "@radix-ui/react-popover";
import React, { type ComponentPropsWithoutRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const popoverContent = tv({
  base: "z-50 w-72 rounded-md border bg-surface p-4 shadow-md outline-none",
  variants: {
    state: {
      open: "data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      closed: "data-[state=closed]:animate-out",
    },
    side: {
      bottom: "data-[side=bottom]:slide-in-from-top-2",
      left: "data-[side=left]:slide-in-from-right-2",
      right: "data-[side=right]:slide-in-from-left-2",
      top: "data-[side=top]:slide-in-from-bottom-2",
    },
  },
  compoundVariants: [
    {
      state: "open",
      side: "bottom",
      class: "data-[state=open]:slide-in-from-top-2",
    },
  ],
});

export interface PopoverContentProps
  extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
    VariantProps<typeof popoverContent> {}

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      {...props}
      align={align}
      className={popoverContent({ className })}
      sideOffset={sideOffset}
    >
      {props.children}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
