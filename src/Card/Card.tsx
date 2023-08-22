import { twMerge } from "tailwind-merge";

import { ButtonGroup } from "../../lib";
import { Action, type ActionProps } from "../Action";
import { forwardRef } from "../utils";

export interface CardProps {
  title?: string;
  actions?: ActionProps[];
}

export const Card = forwardRef<CardProps, "div">(
  ({ className, title, actions = [], children }, ref) => {
    return (
      <div
        className={twMerge(
          "flex flex-col gap-2 sm:rounded-lg bg-white shadow py-4",
          className,
        )}
        ref={ref}
      >
        {(typeof title !== "undefined" || actions.length > 0) && (
          <div className="flex justify-between px-4">
            <h2 className="text-sm font-semibold">{title}</h2>

            <ButtonGroup>
              {actions.map((action, index) => (
                <Action link className="-m-1 p-1" key={index} {...action} />
              ))}
            </ButtonGroup>
          </div>
        )}

        <div className="px-4">{children}</div>
      </div>
    );
  },
);
