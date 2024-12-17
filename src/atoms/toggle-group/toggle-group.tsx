import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import * as React from "react";
import { twMerge } from "tailwind-merge";

import {
  ToggleGroupContext,
  type ToggleGroupContextType,
} from "./toggle-group-context";

export const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    ToggleGroupContextType
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    className={twMerge("flex items-center justify-center gap-1", className)}
    ref={ref}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;
