import {
  ArrowUturnLeftIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { type PropsWithChildren, type ReactElement } from "react";
import { tv } from "tailwind-variants";

import { Action, type ActionProps } from "../Action";
import { Button } from "../Button";
import { ButtonGroup } from "../ButtonGroup";
import { Popover } from "../Popover";
import { Spinner } from "../Spinner";
import { type As } from "../types";

// eslint-disable-next-line react-refresh/only-export-components
export const page = tv({
  slots: {
    root: "mx-auto p-4",
    loading: "mx-auto",
  },
  variants: {
    fullWidth: {
      true: "max-w-5xl",
    },
  },
});

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
        <Action icon={ArrowUturnLeftIcon} variant="ghost" {...backAction} />
      )}

      {typeof title !== "undefined" && (
        <h2 className="flex-1 text-xl font-bold text-default">{title}</h2>
      )}

      <ButtonGroup>
        {secondaryActions.length > 1 ? (
          <Popover activator={<Button icon={EllipsisHorizontalIcon} />}>
            <div className="flex flex-col justify-center gap-1 py-1">
              {secondaryActions.map(
                ({ content, onAction, ...itemProps }, itemIndex) => (
                  <div className="flex justify-center px-1" key={itemIndex}>
                    <Button variant="ghost" onClick={onAction} {...itemProps}>
                      {content}
                    </Button>
                  </div>
                ),
              )}
            </div>
          </Popover>
        ) : (
          secondaryActions.map((action, index) => (
            <Action key={index} {...action} />
          ))
        )}

        {typeof primaryAction !== "undefined" && (
          <Action variant="primary" {...primaryAction} />
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
  const { root, loading: pageLoading } = page({ fullWidth });

  return (
    <div className={root()}>
      <PageHeader<ActionComponent>
        backAction={backAction}
        primaryAction={primaryAction}
        secondaryActions={secondaryActions}
        title={title}
      />

      <div>
        {loading ? <Spinner className={pageLoading()} size="lg" /> : children}
      </div>
    </div>
  );
}
