import React from "react";

import {
  Tooltip as TooltipRoot,
  TooltipContent,
  TooltipTrigger,
} from "../atoms/tooltip";

export interface TooltipProps
  extends React.ComponentPropsWithoutRef<typeof TooltipRoot> {
  content: React.ReactNode;
}

export const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipContent>,
  TooltipProps
>(({ children, content, ...props }, ref) => {
  return (
    <TooltipRoot {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent ref={ref}>{content}</TooltipContent>
    </TooltipRoot>
  );
});
