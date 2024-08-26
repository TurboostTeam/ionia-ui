import { createContext, type Dispatch, type SetStateAction } from "react";

import { type ModalProps } from "./Modal";

export const ModalContext = createContext<{
  modalProps?: ModalProps;
  setModalProps: Dispatch<SetStateAction<ModalProps | undefined>>;
} | null>(null);
