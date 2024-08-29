import { forwardRef, type HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

export const cardTitle = tv({
  base: "font-semibold leading-none tracking-tight text-default",
});

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  (props, ref) => <h3 ref={ref} {...props} className={cardTitle(props)} />,
);
