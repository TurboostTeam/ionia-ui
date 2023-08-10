import { useCallback, useContext } from "react";

import { ToastContext } from "./ToastContext";
import { type ToastProps } from "./ToastProps";

export type ToastFunction = (props: ToastProps) => void;

export const useToast = (): ToastFunction => {
  const context = useContext(ToastContext);

  return useCallback(
    (props) => {
      if (context === null) {
        return;
      }

      const { setToasts } = context;

      setToasts((toasts) => [...toasts, props]);
    },
    [context],
  );
};
