import { forwardRef, type HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

export const cardContent = tv({
  base: "",
});

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  (props, ref) => <div ref={ref} {...props} className={cardContent(props)} />,
);
