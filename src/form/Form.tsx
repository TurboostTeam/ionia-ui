import { forwardRef } from "ionia-ui/lib/common";
import { twMerge } from "tailwind-merge";

export interface FormProps {
  className?: string;
}

export const Form = forwardRef<FormProps, "div">(
  ({ as: As = "div", className, children, ...props }) => {
    return (
      <As className={twMerge("grid gap-y-4", className)} {...props}>
        {children}
      </As>
    );
  }
);
