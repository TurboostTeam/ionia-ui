import { type FC, type PropsWithChildren, type ReactElement } from "react";

import {
  Popover as PopoverRoot,
  PopoverContent,
  type PopoverContentProps,
  PopoverTrigger,
  type PopoverTriggerProps,
} from "../atoms/popover";

export interface PopoverProps {
  activator: ReactElement;
  triggerConfig?: PopoverTriggerProps;
  contentConfig?: PopoverContentProps;
}

export const Popover: FC<PropsWithChildren<PopoverProps>> = ({
  activator,
  children,
  triggerConfig,
  contentConfig,
}) => {
  return (
    <PopoverRoot>
      <PopoverTrigger {...triggerConfig}>{activator}</PopoverTrigger>
      <PopoverContent {...contentConfig}>{children}</PopoverContent>
    </PopoverRoot>
  );
};
