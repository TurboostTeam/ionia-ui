import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// 面包屑页
export const BreadcrumbPage = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    aria-current="page"
    aria-disabled="true"
    className={twMerge("font-normal text-default", className)}
    ref={ref}
    role="link"
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";
