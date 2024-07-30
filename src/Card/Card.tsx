import { tv } from "tailwind-variants";

import { Action, type ActionProps } from "../Action";
import { ButtonGroup } from "../ButtonGroup";
import { forwardRef } from "../utils";

export const CardStyle = tv({
  slots: {
    cardWarp: "flex flex-col gap-2 bg-surface py-4 shadow sm:rounded-lg",
    header: "flex justify-between px-4",
    title: "text-sm font-semibold text-default",
    content: "px-4",
    action: "-m-1 p-1",
  },
  variants: {},
});

export interface CardProps {
  title?: string;
  actions?: ActionProps[];
}

export const Card = forwardRef<CardProps, "div">(
  ({ title, actions = [], children }, ref) => {
    const {
      cardWarp,
      header,
      title: titleStyle,
      action: actionStyle,
      content,
    } = CardStyle();

    return (
      <div className={cardWarp()} ref={ref}>
        {(typeof title !== "undefined" || actions.length > 0) && (
          <div className={header()}>
            <h2 className={titleStyle()}>{title}</h2>

            <ButtonGroup>
              {actions.map((action, index) => (
                <Action
                  classNames={{ root: actionStyle() }}
                  key={index}
                  variant="link"
                  {...action}
                />
              ))}
            </ButtonGroup>
          </div>
        )}

        <div className={content()}>{children}</div>
      </div>
    );
  },
);
