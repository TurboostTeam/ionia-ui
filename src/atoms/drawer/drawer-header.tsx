import * as React from "react";
import { twMerge } from "tailwind-merge";

interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DrawerHeader = ({
  className,
  ...props
}: DrawerHeaderProps): JSX.Element => (
  <div
    className={twMerge(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

export { DrawerHeader };
