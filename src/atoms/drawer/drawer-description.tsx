import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface DrawerDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description> {}

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  DrawerDescriptionProps
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    className={twMerge("text-muted-foreground text-sm", className)}
    ref={ref}
    {...props}
  />
));
DrawerDescription.displayName = SheetPrimitive.Description.displayName;

export { DrawerDescription };
