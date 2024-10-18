import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";

export const menubarContent = tv({
  base: "data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] overflow-hidden rounded-md border bg-nav p-1 text-nav shadow-md",
});

export const MenubarContent = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      {...props}
      align={align}
      alignOffset={alignOffset}
      className={menubarContent(props)}
      ref={ref}
      sideOffset={sideOffset}
    />
  </MenubarPrimitive.Portal>
));
