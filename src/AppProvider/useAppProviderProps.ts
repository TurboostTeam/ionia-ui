import { useContext } from "react";

import { AppProviderContext } from "./AppProviderContext";
import { type AppProviderProps } from "./AppProviderProps";

export const useAppProviderProps = (): Required<AppProviderProps> => {
  const props = useContext(AppProviderContext);

  if (props === null) {
    throw new Error("useAppProviderProps must be used within an AppProvider");
  }

  return props;
};
