/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { tv } from "tailwind-variants";

import { Action, type ActionProps } from "../Action";
import { ButtonGroup } from "../ButtonGroup";
import { forwardRef } from "../utils";

export const card = tv({
  slots: {
    root: "flex flex-col gap-2 bg-surface py-4 shadow sm:rounded-surface",
  },
  variants: {},
});

export interface CardProps {
  title?: string;
  extra?: React.ReactNode;
  actions?: ActionProps[];
  classNames?: {
    root?: string;
  };
}

export const Card = forwardRef<CardProps, "div">(
  ({ title, actions = [], children, classNames, extra }, ref) => {
    const { root } = card();

    return (
      <div className={root({ class: classNames?.root })} ref={ref}>
        {(typeof title !== "undefined" || actions.length > 0) && (
          <div className="flex min-h-10 items-center justify-between px-4">
            <h2 className="text-sm font-semibold text-default">{title}</h2>

            <div className="flex space-x-2">
              <ButtonGroup>
                {actions.map((action, index) => (
                  <Action
                    classNames={{
                      root: "-m-1 p-1",
                    }}
                    key={index}
                    variant="link"
                    {...action}
                  />
                ))}
              </ButtonGroup>
              <div>{extra}</div>
            </div>
          </div>
        )}

        <div className="px-4">{children}</div>
      </div>
    );
  },
);
