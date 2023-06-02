import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { forwardRef } from "../common/forwardRef";

export interface CardProps {
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
}

export const Card = forwardRef<CardProps, "div">(
  ({ className, header, footer, children }, ref) => {
    return (
      <div
        className={twMerge(
          "divide-y divide-gray-200 rounded-lg bg-white shadow",
          className
        )}
        ref={ref}
      >
        {typeof header !== "undefined" && <div className="p-3">{header}</div>}

        {typeof children !== "undefined" && (
          <div className="p-3">{children}</div>
        )}

        {typeof footer !== "undefined" && <div className="p-3">{footer}</div>}
      </div>
    );
  }
);
