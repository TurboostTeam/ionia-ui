import { type FC } from "react";
import { twMerge } from "tailwind-merge";

import { Action, type ActionProps } from "../Action";
import { ButtonGroup } from "../ButtonGroup";

export interface ContextualSaveBarProps {
  message?: string;
  saveAction: ActionProps;
  discardAction?: ActionProps;
  fullWidth?: boolean;
}

export const ContextualSaveBar: FC<ContextualSaveBarProps> = ({
  message,
  saveAction,
  discardAction,
  fullWidth = false,
}) => {
  return (
    <div className="fixed left-0 top-0 z-50 w-full bg-black">
      <div
        className={twMerge(
          `flex h-14 items-center justify-between  px-4 mx-auto`,
          !fullWidth && `max-w-5xl`,
        )}
      >
        {typeof message !== "undefined" && (
          <h2 className="text-gray-50">{message}</h2>
        )}
        <ButtonGroup>
          {discardAction != null && <Action {...discardAction} />}
          <Action primary {...saveAction} />
        </ButtonGroup>
      </div>
    </div>
  );
};
