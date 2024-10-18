import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";

const menubar = tv({
  base: "bg-background flex h-10 items-center space-x-1 rounded-md border p-1",
});

export const Menubar = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>((props, ref) => (
  <MenubarPrimitive.Root {...props} className={menubar(props)} ref={ref} />
));
