import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// 侧边栏分组内容
const SidebarGroupContent = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    className={twMerge("w-full text-sm", className)}
    data-sidebar="group-content"
    ref={ref}
    {...props}
  />
));
SidebarGroupContent.displayName = "SidebarGroupContent";

export { SidebarGroupContent };
