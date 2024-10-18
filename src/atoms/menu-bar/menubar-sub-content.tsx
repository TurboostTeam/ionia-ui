import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";

export const menubarSubContent = tv({
  base: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-nav p-1 text-nav",
});

export const MenubarSubContent = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>((props, ref) => (
  <MenubarPrimitive.SubContent
    {...props}
    className={menubarSubContent(props)}
    ref={ref}
  />
));
