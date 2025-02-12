import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface DrawerTitleProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title> {}

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  DrawerTitleProps
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    className={twMerge("text-lg font-semibold text-default", className)}
    ref={ref}
    {...props}
  />
));
DrawerTitle.displayName = SheetPrimitive.Title.displayName;

export { DrawerTitle };
