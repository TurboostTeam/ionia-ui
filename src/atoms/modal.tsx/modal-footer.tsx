import { type ElementRef, forwardRef, type HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

export const modalFooter = tv({
  base: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
});

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const ModalFooter = forwardRef<ElementRef<"div">, ModalFooterProps>(
  (props, ref) => {
    return <div ref={ref} {...props} className={modalFooter(props)} />;
  },
);
