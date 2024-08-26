import { createContext } from "react";

import { type AppProviderProps } from "./app-provider-props";

export const AppProviderContext =
  createContext<Required<AppProviderProps> | null>(null);
