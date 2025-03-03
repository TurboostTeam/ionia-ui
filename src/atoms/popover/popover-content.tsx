import * as PopoverPrimitive from "@radix-ui/react-popover";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const popoverContent = tv({
  base: "z-50 rounded-md border bg-surface p-4 shadow-md",
  variants: {
    animation: {
      default:
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
    },
  },
  defaultVariants: {
    animation: "default",
  },
});

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
    VariantProps<typeof popoverContent> {}

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      {...props}
      className={popoverContent({ className })}
      ref={ref}
      sideOffset={sideOffset}
    >
      {props.children}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));

PopoverContent.displayName = "PopoverContent";
