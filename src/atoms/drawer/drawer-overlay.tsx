import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface DrawerOverlayProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> {}

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  DrawerOverlayProps
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={twMerge(
      "fixed inset-0 z-50 h-full w-full bg-black/50",
      className,
    )}
    {...props}
    ref={ref}
  />
));
DrawerOverlay.displayName = SheetPrimitive.Overlay.displayName;

export { DrawerOverlay };
