import { type ComponentProps, type FC } from "react";
import { FiChevronRight } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

// 面包屑分隔符
export const BreadcrumbSeparator: FC<ComponentProps<"li">> = ({
  children,
  className,
  ...props
}) => (
  <li
    aria-hidden="true"
    className={twMerge("[&>svg]:h-3.5 [&>svg]:w-3.5", className)}
    role="presentation"
    {...props}
  >
    {children ?? <FiChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
