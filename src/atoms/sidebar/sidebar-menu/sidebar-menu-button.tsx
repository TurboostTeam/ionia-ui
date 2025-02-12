import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

import { Tooltip, TooltipContent, TooltipTrigger } from "../../tooltip";
import { useSidebar } from "../hook/use-sidebar";

const sidebarMenuButtonVariants = tv({
  base: "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-[width,height,padding] hover:bg-nav-surface-hover hover:text-nav-hover focus-visible:ring-2 active:bg-nav-surface-active active:text-nav-active disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-nav-surface-active data-[active=true]:font-medium data-[active=true]:text-nav-active data-[state=open]:hover:bg-nav-surface-hover data-[state=open]:hover:text-nav-hover group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  variants: {
    variant: {
      default: "hover:bg-nav-surface-hover hover:text-nav-hover",
      outline:
        "bg-default shadow-[0_0_0_1px_hsl(var(--border-default))] hover:bg-nav-surface-hover hover:text-nav-hover hover:shadow-[0_0_0_1px_hsl(var(--accent-nav))]",
    },
    size: {
      default: "h-8 text-sm",
      sm: "h-7 text-xs",
      lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const SidebarMenuButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();

    const button = (
      <Comp
        className={twMerge(
          sidebarMenuButtonVariants({ variant, size }),
          className,
        )}
        data-active={isActive}
        data-sidebar="menu-button"
        data-size={size}
        ref={ref as any}
        {...props}
      />
    );

    if (tooltip === undefined || tooltip === null) {
      return button;
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      };
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          align="center"
          hidden={state !== "collapsed" || isMobile}
          side="right"
          {...tooltip}
        />
      </Tooltip>
    );
  },
);
SidebarMenuButton.displayName = "SidebarMenuButton";

export { SidebarMenuButton };
