import * as DialogPrimitive from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";

const modalDescription = tv({
  base: "text-muted-foreground text-sm",
});

export const ModalDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    className={modalDescription({ className })}
    ref={ref}
    {...props}
  />
));
