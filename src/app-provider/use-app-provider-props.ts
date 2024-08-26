import { useContext } from "react";

import { AppProviderContext } from "./app-provider-context";
import { type AppProviderProps } from "./app-provider-props";

export const useAppProviderProps = (): Required<AppProviderProps> => {
  const props = useContext(AppProviderContext);

  if (props === null) {
    throw new Error("useAppProviderProps must be used within an AppProvider");
  }

  return props;
};
