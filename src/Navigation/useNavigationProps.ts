import { useContext } from "react";

import { NavigationContext } from "./NavigationContext";
import { type NavigationProps } from "./NavigationProps";

export const useNavigationProps = (): Required<NavigationProps> => {
  const props = useContext(NavigationContext);

  if (props === null) {
    throw new Error("useNavigationProps must be used within an Navigation");
  }

  return props;
};
