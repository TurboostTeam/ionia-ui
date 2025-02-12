import { useContext } from "react";

import { SidebarContext, type SidebarContextType } from "../sidebar-context";

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (context == null) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
};
