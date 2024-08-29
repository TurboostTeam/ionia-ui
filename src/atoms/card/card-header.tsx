import { forwardRef, type HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

export const cardHeader = tv({
  base: "flex flex-col space-y-1.5 p-6",
});

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  (props, ref) => <div ref={ref} {...props} className={cardHeader(props)} />,
);
