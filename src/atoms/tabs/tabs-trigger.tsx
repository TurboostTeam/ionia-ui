import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { twMerge } from "tailwind-merge";

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    className={twMerge(
      "ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-surface data-[state=active]:text-default data-[state=active]:shadow-sm",
      className,
    )}
    ref={ref}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";
