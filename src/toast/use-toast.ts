import { useCallback, useContext } from "react";

import { type ToastProps } from "./toast";
import { ToastContext } from "./toast-context";

export type ToastFunction = (props: ToastProps) => () => void;

export const useToast = (): ToastFunction => {
  const context = useContext(ToastContext);

  return useCallback(
    (props) => {
      if (context === null) {
        throw new Error("useToast must be used within a ToastProvider");
      }

      const { setToasts } = context;

      props.id =
        props.id ??
        Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("");

      const onDismiss = (): void => {
        setToasts((toasts) => toasts.filter((item) => item.id !== props.id));
        props.onDismiss?.();
      };

      setToasts((toasts) => [...toasts, { ...props, onDismiss }]);

      return onDismiss;
    },
    [context],
  );
};
