import { useContext } from "react";

import { NavigationContext } from "./navigation-context";
import { type NavigationProps } from "./navigation-props";

export const useNavigationProps = (): Required<NavigationProps> => {
  const props = useContext(NavigationContext);

  if (props === null) {
    throw new Error("useNavigationProps must be used within an Navigation");
  }

  return props;
};
