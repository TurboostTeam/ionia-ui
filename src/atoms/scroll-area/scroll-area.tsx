import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { tv } from "tailwind-variants";

import { ScrollBar } from "./scroll-bar";

const scrollArea = tv({
  base: "relative overflow-hidden",
});

export interface ScrollAreaProps
  extends ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {}

const ScrollArea = forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root className={scrollArea(props)} ref={ref} {...props}>
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

export { ScrollArea };
