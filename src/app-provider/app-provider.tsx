import { type FC, type PropsWithChildren } from "react";

import { TooltipProvider } from "../atoms/tooltip";
import { Link } from "../link";
import { ModalProvider } from "../modal";
import { ToastProvider } from "../toast";
import { AppProviderContext } from "./app-provider-context";
import { type AppProviderProps } from "./app-provider-props";

export const AppProvider: FC<PropsWithChildren<AppProviderProps>> = ({
  children,
  ...props
}) => {
  return (
    <AppProviderContext.Provider value={{ linkComponent: Link, ...props }}>
      <TooltipProvider>
        <ModalProvider>
          <ToastProvider>{children}</ToastProvider>
        </ModalProvider>
      </TooltipProvider>
    </AppProviderContext.Provider>
  );
};
