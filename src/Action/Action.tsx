import { type ReactNode } from "react";

import { Button, type ButtonProps } from "../Button";
import { forwardRef } from "../utils";

export interface ActionProps extends ButtonProps {
  content?: ReactNode;
  onAction?: () => Promise<void> | void;
}

export const Action = forwardRef<ActionProps, "button">(
  ({ content, onAction, ...props }, ref) => (
    <Button ref={ref} onClick={onAction} {...props}>
      {content}
    </Button>
  ),
);
