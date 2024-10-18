import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";

export const menubarSeparator = tv({
  base: "-mx-1 my-1 h-px bg-fill-disabled",
});

export const MenubarSeparator = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>((props, ref) => (
  <MenubarPrimitive.Separator
    {...props}
    className={menubarSeparator(props)}
    ref={ref}
  />
));
