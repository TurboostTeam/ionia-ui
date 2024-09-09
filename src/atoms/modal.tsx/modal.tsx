import * as DialogPrimitive from "@radix-ui/react-dialog";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

export interface ModalProps
  extends Omit<
    ComponentPropsWithoutRef<typeof DialogPrimitive.Root>,
    "onOpenChange"
  > {
  open: boolean;
  onClose?: ComponentPropsWithoutRef<
    typeof DialogPrimitive.Root
  >["onOpenChange"];
}

export const Modal = forwardRef<typeof DialogPrimitive.Root, ModalProps>(
  ({ onClose, ...props }) => (
    <DialogPrimitive.Root {...props} onOpenChange={onClose}>
      {props.children}
    </DialogPrimitive.Root>
  ),
);
