import * as React from "react";
import { type VariantProps } from "tailwind-variants";

import { type toggleVariants } from "../toggle";

export interface ToggleGroupContextType
  extends VariantProps<typeof toggleVariants> {
  disabled?: boolean;
}

export const ToggleGroupContext = React.createContext<ToggleGroupContextType>({
  size: "md",
  variant: "secondary",
  disabled: false,
});
