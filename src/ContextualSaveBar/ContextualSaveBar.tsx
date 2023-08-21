import { type FC } from "react";
import { twMerge } from "tailwind-merge";

import { Action, type ActionProps } from "../Action";
import { ButtonGroup } from "../ButtonGroup";

export interface ContextualSaveBarProps {
  alignContentFlush?: boolean;
  message?: string;
  saveAction: ActionProps;
  discardAction?: ActionProps;
  fullWidth?: boolean;
}

export const ContextualSaveBar: FC<ContextualSaveBarProps> = ({
  alignContentFlush = false,
  message,
  saveAction,
  discardAction,
  fullWidth = false,
}) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex w-full bg-black">
      {!alignContentFlush && <div className="w-60" />}

      <div
        className={twMerge(
          `flex h-14 items-center justify-end px-4 mx-auto flex-1`,
          !fullWidth && `max-w-5xl`,
          typeof message !== "undefined" && `justify-between`,
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
