import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const SidebarMenuAction = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={twMerge(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-nav outline-none transition-transform hover:bg-nav-surface-hover hover:text-nav-hover focus-visible:ring-2 peer-hover/menu-button:text-nav-hover [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-nav-active md:opacity-0",
        className,
      )}
      data-sidebar="menu-action"
      ref={ref as any}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

export { SidebarMenuAction };
