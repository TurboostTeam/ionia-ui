import { type FC, type PropsWithChildren } from "react";

import { Link } from "../Link";
import { ModalProvider } from "../Modal";
import { ToastProvider } from "../Toast";
import { AppProviderContext } from "./AppProviderContext";
import { type AppProviderProps } from "./AppProviderProps";

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
