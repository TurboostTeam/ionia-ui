import React from "react";

import {
  Tooltip as TooltipRoot,
  TooltipContent,
  type TooltipContentProps,
  TooltipTrigger,
} from "../atoms/tooltip";

export interface TooltipProps
  extends React.ComponentPropsWithoutRef<typeof TooltipRoot> {
  content: React.ReactNode;
  contentConfig?: TooltipContentProps;
}

export const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipContent>,
  TooltipProps
>(({ children, content, contentConfig, ...props }, ref) => {
  return (
    <TooltipRoot {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent ref={ref} {...contentConfig}>
        {content}
      </TooltipContent>
    </TooltipRoot>
  );
});
