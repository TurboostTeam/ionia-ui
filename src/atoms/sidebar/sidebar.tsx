import { type ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { Drawer, DrawerContent } from "../drawer";
import { useSidebar } from "./hook/use-sidebar";

export const Sidebar = forwardRef<
  HTMLDivElement,
  ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          className={twMerge(
            "flex h-full w-nav flex-col bg-nav text-nav",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <Drawer open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <DrawerContent
            className="w-nav bg-nav p-0 text-nav [&>button]:hidden"
            data-mobile="true"
            data-sidebar="sidebar"
            side={side}
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </DrawerContent>
        </Drawer>
      );
    }

    return (
      <div
        className="group peer hidden text-nav md:block"
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-side={side}
        data-state={state}
        data-variant={variant}
        ref={ref}
      >
        {/* 这是处理桌面侧边栏间隙的内容 */}
        <div
          className={twMerge(
            "relative h-svh w-nav bg-transparent transition-[width] duration-200 ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=right]:rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[calc(var(--nav-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:w-nav-icon",
          )}
        />
        {/* 这是处理桌面侧边栏的布局 */}
        <div
          className={twMerge(
            "fixed inset-y-0 z-10 hidden h-svh w-nav transition-[left,right,width] duration-200 ease-linear md:flex",
            side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--nav-width-icon)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--width-nav)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--nav-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:w-nav-icon group-data-[side=left]:border-r group-data-[side=right]:border-l",
            className,
          )}
          {...props}
        >
          <div
            className="group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col bg-nav group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow"
            data-sidebar="sidebar"
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);
