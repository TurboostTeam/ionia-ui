import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { forwardRef } from "../common";

export interface CardProps {
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
}

export const Card = forwardRef<CardProps, "div">(
  ({ className, header, footer, children }) => {
    return (
      <div
        className={twMerge(
          "divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow",
          className
        )}
      >
        {typeof header !== "undefined" && (
          <div className="px-4 py-5 sm:px-6">{header}</div>
        )}

        {typeof children !== "undefined" && (
          <div className="px-4 py-5 sm:p-6">{children}</div>
        )}

        {typeof footer !== "undefined" && (
          <div className="px-4 py-4 sm:px-6">{footer}</div>
        )}
      </div>
    );
  }
);
