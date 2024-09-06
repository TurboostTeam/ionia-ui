import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";

export const modalTitle = tv({
  base: "text-lg font-semibold leading-none tracking-tight",
});

export const ModalTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    className={modalTitle({ className })}
    ref={ref}
    {...props}
  />
));
