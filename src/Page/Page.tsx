import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { type PropsWithChildren, type ReactElement } from "react";
import { twMerge } from "tailwind-merge";

import { Action, type ActionProps } from "../Action";
import { type Button } from "../Button";
import { ButtonGroup } from "../ButtonGroup";
import { Spinner } from "../Spinner";
import { type As } from "../types";

export interface PageHeaderProps<ActionComponent extends As = typeof Button> {
  title?: string;
  backAction?: ActionProps<ActionComponent>;
  primaryAction?: ActionProps<ActionComponent>;
  secondaryActions?: Array<ActionProps<ActionComponent>>;
}

export function PageHeader<ActionComponent extends As = typeof Button>({
  title,
  backAction,
  primaryAction,
  secondaryActions = [],
}: PageHeaderProps<ActionComponent>): ReactElement {
  return (
    <div className="mb-4 flex items-center justify-between gap-2">
      {typeof backAction !== "undefined" && (
        <Action ghost icon={ArrowUturnLeftIcon} {...backAction} />
      )}

      {typeof title !== "undefined" && (
        <h2 className="flex-1 text-xl font-bold text-gray-900">{title}</h2>
      )}

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
}

export interface PageProps<ActionComponent extends As = typeof Button>
  extends PageHeaderProps<ActionComponent> {
  fullWidth?: boolean;
  loading?: boolean;
}

export function Page<ActionComponent extends As = typeof Button>({
  title,
  fullWidth = false,
  loading = false,
  children,
  backAction,
  primaryAction,
  secondaryActions,
}: PropsWithChildren<PageProps<ActionComponent>>): ReactElement {
  return (
    <div className={twMerge(`p-4 mx-auto`, !fullWidth && `max-w-5xl`)}>
      <PageHeader<ActionComponent>
        backAction={backAction}
        primaryAction={primaryAction}
        secondaryActions={secondaryActions}
        title={title}
      />

      <div>
        {loading ? <Spinner className="mx-auto" size="lg" /> : children}
      </div>
    </div>
  );
}
