import * as React from "react";
import { twMerge } from "tailwind-merge";

interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DrawerFooter = ({
  className,
  ...props
}: DrawerFooterProps): JSX.Element => (
  <div
    className={twMerge(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);

DrawerFooter.displayName = "DrawerFooter";

export { DrawerFooter };
