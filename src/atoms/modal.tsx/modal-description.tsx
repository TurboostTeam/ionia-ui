import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { tv } from "tailwind-variants";

const modalDescription = tv({
  base: "text-sm text-default",
});

export const ModalDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    {...props}
    className={modalDescription({ className })}
  />
));
