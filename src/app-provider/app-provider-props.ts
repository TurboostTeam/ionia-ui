import { type ComponentType } from "react";

import { type LinkProps } from "../link";

export interface AppProviderProps {
  linkComponent?: ComponentType<LinkProps>;
}
