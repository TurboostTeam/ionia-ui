import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// 侧边栏分组操作
const SidebarGroupAction = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={twMerge(
        "hover:bg-nav-hover absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-nav/80 outline-none transition-transform hover:text-nav-hover focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      data-sidebar="group-action"
      ref={ref as any}
      {...props}
    />
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";

export { SidebarGroupAction };
