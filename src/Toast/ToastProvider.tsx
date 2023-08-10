import { type FC, type PropsWithChildren, useState } from "react";

import { ToastContext } from "./ToastContext";
import { ToastManager } from "./ToastManager";
import { type ToastProps } from "./ToastProps";

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  return (
    <ToastContext.Provider value={{ toasts, setToasts }}>
      {children}
      <ToastManager />
    </ToastContext.Provider>
  );
};
