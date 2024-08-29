import { forwardRef, type HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

export const cardDescription = tv({
  base: "text-sm text-secondary",
});

export interface CardDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>((props, ref) => (
  <p ref={ref} {...props} className={cardDescription(props)} />
));
