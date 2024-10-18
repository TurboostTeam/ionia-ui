import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import React from "react";

export interface TooltipProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {}

export const Tooltip: React.FC<TooltipProps> = ({
  delayDuration = 0,
  ...props
}) => <TooltipPrimitive.Root delayDuration={delayDuration} {...props} />;

Tooltip.displayName = "Tooltip";
