import * as DialogPrimitive from "@radix-ui/react-dialog";
import { type ComponentPropsWithoutRef, type FC } from "react";

export interface ModalProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
  open: boolean;
}

export const Modal: FC<ModalProps> = ({ ...props }) => (
  <DialogPrimitive.Root {...props}>{props.children}</DialogPrimitive.Root>
);
