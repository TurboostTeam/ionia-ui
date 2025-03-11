import {
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
} from "react";

import { Button } from "../button";
import { type As, type PropsOf, type RightJoinProps } from "../types";

export type ActionProps<ActionComponent extends As = typeof Button> =
  RightJoinProps<
    PropsOf<ActionComponent>,
    {
      as?: ActionComponent;
      content?: ReactNode;
      onAction?: MouseEventHandler<HTMLButtonElement>;
    }
  >;

export function Action<ActionComponent extends As = typeof Button>({
  content,
  onAction,
  ...props
}: ActionProps<ActionComponent>): ReactElement {
  return (
    <Button onClick={onAction} {...props}>
      {content}
    </Button>
  );
}
