import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
import { twMerge } from "tailwind-merge";

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    className={twMerge("text-sm text-placeholder", className)}
    ref={ref}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export { DialogDescription };
