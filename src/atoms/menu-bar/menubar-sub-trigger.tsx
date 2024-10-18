import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { forwardRef } from "react";
import { FaAngleRight } from "react-icons/fa";
import { tv } from "tailwind-variants";

// 打开子菜单的触发器
export const menubarSubTrigger = tv({
  base: "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-nav-surface focus:text-nav data-[state=open]:bg-nav-surface data-[state=open]:text-nav",
  variants: {
    inset: {
      true: "pl-8",
    },
  },
});

export const MenubarSubTrigger = forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ inset = false, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    {...props}
    className={menubarSubTrigger({ inset, ...props })}
    ref={ref}
  >
    {children}
    <FaAngleRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
));
