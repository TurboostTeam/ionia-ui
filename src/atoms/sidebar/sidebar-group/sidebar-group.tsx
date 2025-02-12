import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// 侧边栏组
const SidebarGroup = forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={twMerge(
          "relative flex w-full min-w-0 flex-col p-2",
          className,
        )}
        data-sidebar="group"
        ref={ref}
        {...props}
      />
    );
  },
);
SidebarGroup.displayName = "SidebarGroup";

export { SidebarGroup };
