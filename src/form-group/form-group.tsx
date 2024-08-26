import { twMerge } from "tailwind-merge";

import { forwardRef } from "@/utils";

export interface FormGroupProps {
  className?: string;
}

export const FormGroup = forwardRef<FormGroupProps, "div">(
  ({ className, children }, ref) => {
    return (
      <div className={twMerge("grid grid-cols-2 gap-x-4", className)} ref={ref}>
        {children}
      </div>
    );
  },
);
