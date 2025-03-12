import {
  type ComponentPropsWithoutRef,
  type FC,
  type PropsWithChildren,
  type ReactElement,
} from "react";

import {
  Popover as PopoverRoot,
  PopoverContent,
  type PopoverContentProps,
  PopoverTrigger,
  type PopoverTriggerProps,
} from "../atoms/popover";

export interface PopoverProps {
  activator: ReactElement;
  config?: ComponentPropsWithoutRef<typeof PopoverRoot>;
  triggerConfig?: PopoverTriggerProps;
  contentConfig?: PopoverContentProps;
}

export const Popover: FC<PropsWithChildren<PopoverProps>> = ({
  activator,
  children,
  config,
  triggerConfig,
  contentConfig,
}) => {
  return (
    <PopoverRoot {...config}>
      <PopoverTrigger {...triggerConfig}>{activator}</PopoverTrigger>
      <PopoverContent {...contentConfig}>{children}</PopoverContent>
    </PopoverRoot>
  );
};
