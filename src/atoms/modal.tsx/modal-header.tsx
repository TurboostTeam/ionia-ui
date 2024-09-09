import React, { forwardRef } from "react";
import { tv } from "tailwind-variants";

export const modalHeader = tv({
  base: "flex flex-col space-y-1.5 text-center sm:text-left",
});

export interface ModalHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const ModalHeader = forwardRef<
  React.ElementRef<"div">,
  ModalHeaderProps
>(({ ...props }, ref) => {
  return <div ref={ref} {...props} className={modalHeader(props)} />;
});
