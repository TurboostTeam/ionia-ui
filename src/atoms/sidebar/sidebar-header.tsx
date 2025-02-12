"use client";

import { type ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const SidebarHeader = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={twMerge("flex flex-col gap-2 p-2", className)}
        data-sidebar="header"
        ref={ref}
        {...props}
      />
    );
  },
);
SidebarHeader.displayName = "SidebarHeader";

export { SidebarHeader };
