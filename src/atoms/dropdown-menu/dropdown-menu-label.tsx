import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const dropdownMenuLabel = tv({
  base: "px-2 py-1.5 text-sm font-semibold",
  variants: {
    inset: {
      true: "pl-8",
    },
  },
});

export interface DropdownMenuLabelProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>,
    VariantProps<typeof dropdownMenuLabel> {}

export const DropdownMenuLabel = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    className={dropdownMenuLabel({ inset, className })}
    ref={ref}
    {...props}
  />
));

DropdownMenuLabel.displayName = "DropdownMenuLabel";
