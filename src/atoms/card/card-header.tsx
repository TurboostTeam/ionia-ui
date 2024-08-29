import { forwardRef, type HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

export const cardHeader = tv({
  base: "flex justify-between gap-2",
});

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  (props, ref) => <div ref={ref} {...props} className={cardHeader(props)} />,
);
