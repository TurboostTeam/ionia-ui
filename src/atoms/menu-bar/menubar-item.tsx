import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";

export const menubarItem = tv({
  base: "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-nav-surface-active focus:text-nav data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  variants: {
    inset: {
      true: "pl-8",
    },
  },
});

export const MenubarItem = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ inset = false, ...props }, ref) => (
  <MenubarPrimitive.Item
    {...props}
    className={menubarItem({ inset, ...props })}
    ref={ref}
  />
));
