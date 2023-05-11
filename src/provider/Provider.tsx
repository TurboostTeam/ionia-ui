import { type FC, type ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export interface ProviderProps {
  children?: ReactNode;
}

export const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};
