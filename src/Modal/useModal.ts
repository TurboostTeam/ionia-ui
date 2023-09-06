import { type ReactNode, useCallback, useContext } from "react";

import { type ModalProps } from "./Modal";
import { ModalContext } from "./ModalContext";

export interface ModalOptions
  extends Omit<ModalProps, "open" | "onClose" | "children"> {
  content?: ReactNode;
}

export type ModalFunction = (options: ModalOptions) => () => void;

export const useModal = (): ModalFunction => {
  const context = useContext(ModalContext);

  return useCallback(
    (options) => {
      if (context === null) {
        throw new Error("useModal must be used within a ModalProvider");
      }

      const onClose = (): void => {
        context.setModalProps({ ...options, open: false, onClose });
      };

      context.setModalProps({ ...options, open: true, onClose });

      return onClose;
    },
    [context],
  );
};
