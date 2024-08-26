import { twMerge } from "tailwind-merge";

import { forwardRef } from "../utils";

export interface FormProps {
  className?: string;
}

export const Form = forwardRef<FormProps, "div">(
  ({ as: As = "div", className, children, ...props }, ref) => {
    return (
      <As className={twMerge("grid gap-y-4", className)} ref={ref} {...props}>
        {children}
      </As>
    );
  },
);
