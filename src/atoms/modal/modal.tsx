import * as DialogPrimitive from "@radix-ui/react-dialog";
import { type ComponentPropsWithoutRef, type FC } from "react";

export interface ModalProps
  extends Omit<
    ComponentPropsWithoutRef<typeof DialogPrimitive.Root>,
    "onOpenChange"
  > {
  open?: boolean;
  onClose?: ComponentPropsWithoutRef<
    typeof DialogPrimitive.Root
  >["onOpenChange"];
}

export const Modal: FC<ModalProps> = (props) => (
  <DialogPrimitive.Root {...props} onOpenChange={props.onClose} />
);
