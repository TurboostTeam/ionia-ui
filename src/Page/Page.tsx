import { type FC, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Action, type ActionProps } from "../Action";
import { ButtonGroup } from "../ButtonGroup";

export interface PageProps {
  title: string;
  fullWidth?: boolean;
  children?: ReactNode;
  primaryAction?: ActionProps;
  secondaryActions?: ActionProps[];
}

export const Page: FC<PageProps> = ({
  title,
  fullWidth = false,
  children,
  primaryAction,
  secondaryActions = [],
}) => {
  return (
    <div className={twMerge(`p-4 mx-auto`, !fullWidth && `max-w-5xl`)}>
      <div className="mb-4 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>

        <ButtonGroup className="mt-4 md:ml-4 md:mt-0">
          {secondaryActions.map((action, index) => (
            <Action key={index} {...action} />
          ))}

          {typeof primaryAction !== "undefined" && (
            <Action primary {...primaryAction} />
          )}
        </ButtonGroup>
      </div>

      <div>{children}</div>
    </div>
  );
};
