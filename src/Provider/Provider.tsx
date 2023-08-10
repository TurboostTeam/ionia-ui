import { type FC, type ReactNode } from "react";

import { ToastProvider } from "../Toast";

export interface ProviderProps {
  children?: ReactNode;
}

export const Provider: FC<ProviderProps> = ({ children }) => {
  return <ToastProvider>{children}</ToastProvider>;
};
