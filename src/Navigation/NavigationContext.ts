import { createContext } from "react";

import { type NavigationProps } from "./NavigationProps";

export const NavigationContext =
  createContext<Required<NavigationProps> | null>(null);
