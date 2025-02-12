import { type ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { useSidebar } from "./hook/use-sidebar";

const SidebarRail = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <button
        aria-label="Toggle Sidebar"
        className={twMerge(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear sm:flex",
          className,
        )}
        data-sidebar="rail"
        ref={ref}
        tabIndex={-1}
        title="Toggle Sidebar"
        onClick={toggleSidebar}
        {...props}
      />
    );
  },
);
SidebarRail.displayName = "SidebarRail";

export { SidebarRail };
