import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { AiOutlineClose } from "react-icons/ai";
import { tv } from "tailwind-variants";

export interface ModalCloseProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Close> {
  className?: string;
}

export const modalClose = tv({
  base: "absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-default hover:bg-surface-hover focus:shadow-md focus:outline-none focus-visible:outline-none",
});

export const ModalClose = forwardRef<
  ElementRef<typeof DialogPrimitive.Close>,
  ModalCloseProps
>((props, ref) => (
  <DialogPrimitive.Close ref={ref} {...props} className={modalClose(props)}>
    <AiOutlineClose />
  </DialogPrimitive.Close>
));
