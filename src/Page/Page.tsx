import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { type FC, type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

import { Action, type ActionProps } from "../Action";
import { ButtonGroup } from "../ButtonGroup";

export interface PageHeaderProps {
  title: string;
  backAction?: Pick<ActionProps, "onAction">;
  primaryAction?: ActionProps;
  secondaryActions?: ActionProps[];
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  backAction,
  primaryAction,
  secondaryActions = [],
}) => {
  return (
    <div className="mb-4 flex items-center justify-between gap-2">
      {typeof backAction !== "undefined" && (
        <Action icon={ArrowUturnLeftIcon} {...backAction} />
      )}

      <h2 className=" flex-1 text-xl font-bold text-gray-900">{title}</h2>

      <ButtonGroup>
        {secondaryActions.map((action, index) => (
          <Action key={index} {...action} />
        ))}

        {typeof primaryAction !== "undefined" && (
          <Action primary {...primaryAction} />
        )}
      </ButtonGroup>
    </div>
  );
};

export interface PageProps extends PageHeaderProps {
  fullWidth?: boolean;
}

export const Page: FC<PropsWithChildren<PageProps>> = ({
  title,
  fullWidth = false,
  children,
  backAction,
  primaryAction,
  secondaryActions,
}) => {
  return (
    <div className={twMerge(`p-4 mx-auto`, !fullWidth && `max-w-5xl`)}>
      <PageHeader
        backAction={backAction}
        primaryAction={primaryAction}
        secondaryActions={secondaryActions}
        title={title}
      />

      <div>{children}</div>
    </div>
  );
};
