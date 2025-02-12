import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// 侧边栏菜单徽章
const SidebarMenuBadge = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    className={twMerge(
      "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-nav",
      "peer-hover/menu-button:text-nav-hover peer-data-[active=true]/menu-button:text-nav-active",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className,
    )}
    data-sidebar="menu-badge"
    ref={ref}
    {...props}
  />
));
SidebarMenuBadge.displayName = "SidebarMenuBadge";

export { SidebarMenuBadge };
