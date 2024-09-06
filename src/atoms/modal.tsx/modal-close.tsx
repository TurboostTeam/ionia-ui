import * as DialogPrimitive from "@radix-ui/react-dialog";
import React, { type FC } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { tv } from "tailwind-variants";

interface ModalCloseProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close> {
  className?: string;
}

export const modalClose = tv({
  base: "text-violet11 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full hover:bg-surface-hover focus:outline-none focus-visible:outline-none",
});

export const ModalClose: FC<ModalCloseProps> = ({ className, ...props }) => (
  <DialogPrimitive.Close className={modalClose({ className })} {...props}>
    <AiOutlineClose />
  </DialogPrimitive.Close>
);
