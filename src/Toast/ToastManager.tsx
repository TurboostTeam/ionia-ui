import { type FC, useContext } from "react";

import { Toast } from "./Toast";
import { ToastContext } from "./ToastContext";

export const ToastManager: FC = () => {
  const context = useContext(ToastContext);

  if (context === null) {
    return null;
  }

  const { toasts } = context;

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 flex transform flex-col items-center gap-5 pb-5">
      {toasts.map((toast, index) => {
        return <Toast key={index} {...toast} />;
      })}
    </div>
  );
};
