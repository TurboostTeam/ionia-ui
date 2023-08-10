import { createContext, type Dispatch, type SetStateAction } from "react";

import { type ToastProps } from "./ToastProps";

export const ToastContext = createContext<{
  toasts: ToastProps[];
  setToasts: Dispatch<SetStateAction<ToastProps[]>>;
} | null>(null);
