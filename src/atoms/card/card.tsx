import { forwardRef, type HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

export const card = tv({
  base: "flex flex-col gap-2 bg-surface p-4 shadow sm:rounded-lg",
});

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => (
  <div ref={ref} {...props} className={card(props)} />
));
