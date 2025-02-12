"use client";

import { type ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const SidebarMenu = forwardRef<HTMLUListElement, ComponentProps<"ul">>(
  ({ className, ...props }, ref) => {
    return (
      <ul
        className={twMerge("flex w-full min-w-0 flex-col gap-1", className)}
        data-sidebar="menu"
        ref={ref}
        {...props}
      />
    );
  },
);
SidebarMenu.displayName = "SidebarMenu";

export { SidebarMenu };
