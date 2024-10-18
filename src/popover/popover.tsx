import { type FC, type PropsWithChildren, type ReactElement } from "react";

import {
  Popover as PopoverRoot,
  PopoverContent,
  PopoverTrigger,
} from "../atoms/popover";

export interface PopoverProps {
  activator: ReactElement;
  className?: string;
  placement?: "top" | "right" | "bottom" | "left";
}

export const Popover: FC<PropsWithChildren<PopoverProps>> = ({
  activator,
  className,
  children,
  placement = "bottom",
}) => {
  return (
    <PopoverRoot>
      <PopoverTrigger>{activator}</PopoverTrigger>
      <PopoverContent className={className} side={placement}>
        {children}
      </PopoverContent>
    </PopoverRoot>
  );
};
