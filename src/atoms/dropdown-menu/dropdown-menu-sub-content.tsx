import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const dropdownMenuSubContent = tv({
  base: "text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-surface p-1 shadow-lg",
});

export interface DropdownMenuSubContentProps
  extends React.ComponentPropsWithoutRef<
      typeof DropdownMenuPrimitive.SubContent
    >,
    VariantProps<typeof dropdownMenuSubContent> {}

export const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownMenuSubContentProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    className={dropdownMenuSubContent(props)}
    ref={ref}
    {...props}
  />
));

DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
