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
  base: "text-violet11 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full hover:bg-surface-hover focus:outline-none focus-visible:outline-none",
});

export const ModalClose = forwardRef<
  ElementRef<typeof DialogPrimitive.Close>,
  ModalCloseProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    {...props}
    className={modalClose({ className })}
  >
    <AiOutlineClose />
  </DialogPrimitive.Close>
));
