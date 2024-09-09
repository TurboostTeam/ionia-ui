import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { tv } from "tailwind-variants";

export const modalTitle = tv({
  base: "text-lg font-semibold leading-none tracking-tight",
});

export const ModalTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>((props, ref) => (
  <DialogPrimitive.Title ref={ref} {...props} className={modalTitle(props)} />
));
