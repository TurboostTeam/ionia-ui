import { forwardRef, type HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

export const cardFooter = tv({
  base: "flex items-center",
});

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  (props, ref) => <div ref={ref} {...props} className={cardFooter(props)} />,
);
