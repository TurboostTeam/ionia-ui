import React, { type ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const SidebarContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={twMerge(
          "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
          className,
        )}
        data-sidebar="content"
        ref={ref}
        {...props}
      />
    );
  },
);
