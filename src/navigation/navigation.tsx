import { type FC, type PropsWithChildren } from "react";

import { NavigationContext } from "./navigation-context";
import { type NavigationProps } from "./navigation-props";

export const Navigation: FC<PropsWithChildren<NavigationProps>> = ({
  children,
  ...props
}) => {
  return (
    <NavigationContext.Provider value={props}>
      <div className="flex h-full w-60 flex-col gap-4 border-r bg-nav py-4">
        {children}
      </div>
    </NavigationContext.Provider>
  );
};
