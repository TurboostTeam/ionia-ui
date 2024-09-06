import React, { type FC } from "react";
import { tv } from "tailwind-variants";

export const modalFooter = tv({
  base: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
});

interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const ModalFooter: FC<ModalFooterProps> = ({ className, ...props }) => {
  return <div className={modalFooter({ className })} {...props} />;
};
