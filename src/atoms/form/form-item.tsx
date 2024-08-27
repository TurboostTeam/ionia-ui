import { forwardRef, type HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

export const formItem = tv({
  base: "space-y-2",
});

export interface FormItemProps extends HTMLAttributes<HTMLDivElement> {}

export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  (props, ref) => {
    return <div ref={ref} {...props} className={formItem(props)} />;
  },
);
