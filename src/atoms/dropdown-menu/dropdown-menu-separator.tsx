import { Separator } from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const separatorVariants = tv({
  base: "bg-muted -mx-1 my-1 h-px",
});

export interface DropdownMenuSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof Separator>,
    VariantProps<typeof separatorVariants> {}

export const DropdownMenuSeparator = forwardRef<
  React.ElementRef<typeof Separator>,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <Separator
    className={separatorVariants({ className })}
    ref={ref}
    {...props}
  />
));

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
