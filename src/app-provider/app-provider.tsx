import { type FC, type PropsWithChildren } from "react";

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
      <ModalProvider>
        <ToastProvider>{children}</ToastProvider>
      </ModalProvider>
    </AppProviderContext.Provider>
  );
};
