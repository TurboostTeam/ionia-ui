import { type FC, type ReactNode } from "react";

import { Button, type ButtonProps } from "../Button";
import { forwardRef } from "../utils";

export interface ActionProps extends Omit<ButtonProps, "children"> {
  content: ReactNode;
}

export const Action: FC<ActionProps> = forwardRef<ActionProps, "button">(
  ({ content, ...props }, ref) => (
    <Button ref={ref} {...props}>
      {content}
    </Button>
  ),
);
