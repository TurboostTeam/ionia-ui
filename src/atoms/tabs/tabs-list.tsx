import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { twMerge } from "tailwind-merge";

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    className={twMerge(
      "inline-flex h-10 items-center justify-center rounded-md bg-surface-secondary p-1 text-secondary",
      className,
    )}
    ref={ref}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;
