import { type ComponentProps, type FC } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

// 面包屑省略号
export const BreadcrumbEllipsis: FC<ComponentProps<"span">> = ({
  className,
  ...props
}) => (
  <span
    aria-hidden="true"
    className={twMerge("flex h-9 w-9 items-center justify-center", className)}
    role="presentation"
    {...props}
  >
    <FiMoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
