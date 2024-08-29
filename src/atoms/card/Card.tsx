import { forwardRef, type HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

export const card = tv({
  base: "rounded-xl border bg-surface text-default shadow",
});

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => (
  <div ref={ref} {...props} className={card(props)} />
));
