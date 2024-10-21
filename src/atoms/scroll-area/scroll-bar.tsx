"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

const scrollBar = tv({
  base: "flex touch-none select-none transition-colors",
  variants: {
    orientation: {
      vertical: "h-full w-2.5 border-l border-l-transparent p-[1px]",
      horizontal: "h-2.5 flex-col border-t border-t-transparent p-[1px]",
    },
  },
});

export interface ScrollBarProps
  extends ComponentPropsWithoutRef<
    typeof ScrollAreaPrimitive.ScrollAreaScrollbar
  > {}

export const ScrollBar = forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    {...props}
    className={twMerge(scrollBar({ orientation }), className)}
    orientation={orientation}
    ref={ref}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="bg-border relative flex-1 rounded-full" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = "ScrollBar";
