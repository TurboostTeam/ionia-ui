import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// 面包屑列表
export const BreadcrumbList = forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    className={twMerge(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-placeholder sm:gap-2.5",
      className,
    )}
    ref={ref}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";
