import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const SidebarMenuSub = forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      className={twMerge(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      data-sidebar="menu-sub"
      ref={ref}
      {...props}
    />
  ),
);
SidebarMenuSub.displayName = "SidebarMenuSub";

export { SidebarMenuSub };
