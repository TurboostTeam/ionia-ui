import { createContext } from "react";

import { type NavigationProps } from "./navigation-props";

export const NavigationContext =
  createContext<Required<NavigationProps> | null>(null);
