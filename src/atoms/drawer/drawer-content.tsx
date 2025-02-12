import * as SheetPrimitive from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

import { DrawerOverlay } from "./drawer-overlay";

const drawerVariants = tv({
  base: "data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 gap-4 bg-surface p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  variants: {
    side: {
      top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 border-b",
      bottom:
        "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 border-t",
      left: "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
      right:
        "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
    },
  },
  defaultVariants: {
    side: "right",
  },
});

interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof drawerVariants> {}

const DrawerContent = forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  DrawerContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPrimitive.Portal>
    <DrawerOverlay />
    <SheetPrimitive.Content
      className={twMerge(drawerVariants({ side }), className)}
      ref={ref}
      {...props}
    >
      <SheetPrimitive.Close className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-sm opacity-70 transition-opacity hover:bg-fill-primary hover:text-fill-primary hover:opacity-100 focus:outline-none disabled:pointer-events-none">
        <AiOutlineClose className="h-4 w-4 font-bold" />
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
));
DrawerContent.displayName = SheetPrimitive.Content.displayName;

export { DrawerContent };
