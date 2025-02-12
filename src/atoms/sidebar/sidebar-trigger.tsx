import { forwardRef } from "react";
import { LuPanelLeft } from "react-icons/lu";
import { twMerge } from "tailwind-merge";

import { Button } from "../button";
import { useSidebar } from "./hook/use-sidebar";

const SidebarTrigger = forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      className={twMerge("h-7 w-7", className)}
      data-sidebar="trigger"
      ref={ref}
      size="sm"
      variant="ghost"
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <LuPanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

export { SidebarTrigger };
