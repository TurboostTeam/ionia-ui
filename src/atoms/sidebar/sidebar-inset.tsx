"use client";

import { type ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// 侧边栏内嵌变体包装
const SidebarInset = forwardRef<HTMLDivElement, ComponentProps<"main">>(
  ({ className, ...props }, ref) => {
    return (
      <main
        className={twMerge(
          "relative flex min-h-svh flex-1 flex-col bg-default",
          className,
        )}
        data-sidebar="inset"
        ref={ref}
        {...props}
      />
    );
  },
);
SidebarInset.displayName = "SidebarInset";

export { SidebarInset };
