import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";

const menubarTrigger = tv({
  base: "flex cursor-default cursor-pointer select-none items-center rounded-sm px-3 py-1.5 text-sm outline-none focus:bg-nav-surface-active focus:text-nav data-[state=open]:bg-nav-surface-active data-[state=open]:text-nav",
});

export const MenubarTrigger = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>((props, ref) => (
  <MenubarPrimitive.Trigger
    {...props}
    className={menubarTrigger(props)}
    ref={ref}
  />
));
