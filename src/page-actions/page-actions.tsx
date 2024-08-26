import { type FC } from "react";

import { Action, type ActionProps } from "@/action";
import { ButtonGroup } from "@/button-group";

export interface PageActionsProps {
  primaryAction?: ActionProps;
  secondaryActions?: ActionProps[];
}

export const PageActions: FC<PageActionsProps> = ({
  primaryAction,
  secondaryActions = [],
}) => {
  return (
    <div className="mx-auto flex w-full justify-end">
      <ButtonGroup>
        {secondaryActions?.map((action, index) => (
          <Action key={index} {...action} />
        ))}
        <Action variant="primary" {...primaryAction} />
      </ButtonGroup>
    </div>
  );
};
