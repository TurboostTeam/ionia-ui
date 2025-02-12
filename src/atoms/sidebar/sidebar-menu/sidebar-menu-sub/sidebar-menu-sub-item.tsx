import { forwardRef } from "react";

const SidebarMenuSubItem = forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

export { SidebarMenuSubItem };
