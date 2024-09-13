import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const dropdownMenuSubTrigger = tv({
  base: "focus:bg-accent data-[state=open]:bg-accent flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
  variants: {
    inset: {
      true: "pl-8",
    },
  },
});

export interface DropdownMenuSubTriggerProps
  extends React.ComponentPropsWithoutRef<
      typeof DropdownMenuPrimitive.SubTrigger
    >,
    VariantProps<typeof dropdownMenuSubTrigger> {}

export const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownMenuSubTriggerProps
>(({ className, children, inset = false, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    className={dropdownMenuSubTrigger({ inset, className })}
    ref={ref}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));

DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";
