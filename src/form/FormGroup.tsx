import { forwardRef } from "ionia-ui/lib/common";
import { twMerge } from "tailwind-merge";

export interface FormGroupProps {
  className?: string;
}

export const FormGroup = forwardRef<FormGroupProps, "div">(
  ({ className, children }) => {
    return (
      <div className={twMerge("grid grid-cols-2 gap-x-4", className)}>
        {children}
      </div>
    );
  }
);
