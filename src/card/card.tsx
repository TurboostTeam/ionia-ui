/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { tv } from "tailwind-variants";

import { Action, type ActionProps } from "@/action";
import { ButtonGroup } from "@/button-group";
import { forwardRef } from "@/utils";

export const card = tv({
  slots: {
    root: "flex flex-col gap-2 bg-surface py-4 shadow sm:rounded-lg",
  },
  variants: {},
});

export interface CardProps {
  title?: string;
  actions?: ActionProps[];
  classNames?: {
    root?: string;
  };
}

export const Card = forwardRef<CardProps, "div">(
  ({ title, actions = [], children, classNames }, ref) => {
    const { root } = card();

    return (
      <div className={root({ class: classNames?.root })} ref={ref}>
        {(typeof title !== "undefined" || actions.length > 0) && (
          <div className="flex justify-between px-4">
            <h2 className="text-sm font-semibold text-default">{title}</h2>

            <ButtonGroup>
              {actions.map((action, index) => (
                <Action
                  classNames="-m-1 p-1"
                  key={index}
                  variant="link"
                  {...action}
                />
              ))}
            </ButtonGroup>
          </div>
        )}

        <div className="px-4">{children}</div>
      </div>
    );
  },
);
