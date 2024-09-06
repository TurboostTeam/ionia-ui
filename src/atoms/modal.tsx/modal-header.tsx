import React, { type FC } from "react";
import { tv } from "tailwind-variants";

export const modalHeader = tv({
  base: "flex flex-col space-y-1.5 text-center sm:text-left",
});

interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const ModalHeader: FC<ModalHeaderProps> = ({ className, ...props }) => {
  return <div className={modalHeader({ className })} {...props} />;
};
