import { createContext } from "react";

import { type AppProviderProps } from "./AppProviderProps";

export const AppProviderContext =
  createContext<Required<AppProviderProps> | null>(null);
