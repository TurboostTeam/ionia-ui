"use client";

import { type ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const SidebarMenuItem = forwardRef<HTMLLIElement, ComponentProps<"li">>(
  ({ className, ...props }, ref) => {
    return (
      <li
        className={twMerge("group/menu-item relative", className)}
        data-sidebar="menu-item"
        ref={ref}
        {...props}
      />
    );
  },
);
SidebarMenuItem.displayName = "SidebarMenuItem";

export { SidebarMenuItem };
