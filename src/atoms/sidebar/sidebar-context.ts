import { createContext } from "react";

export interface SidebarContextType {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  isMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextType | null>(null);
