import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { DotFilledIcon } from "@radix-ui/react-icons";
import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const dropdownMenuRadioItem = tv({
  base: "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
});

export interface DropdownMenuRadioItemProps
  extends React.ComponentPropsWithoutRef<
      typeof DropdownMenuPrimitive.RadioItem
    >,
    VariantProps<typeof dropdownMenuRadioItem> {}

export const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownMenuRadioItemProps
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    className={dropdownMenuRadioItem({ className })}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <DotFilledIcon className="h-4 w-4 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));

DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";
