import { forwardRef, type HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

export const formDescription = tv({
  base: "text-muted-foreground text-[0.8rem]",
});

export interface FormDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

export const FormDescription = forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>((props, ref) => {
  return <div ref={ref} {...props} className={formDescription(props)} />;
});
