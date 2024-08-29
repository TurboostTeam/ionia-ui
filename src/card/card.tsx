import { Action, type ActionProps } from "../action";
import {
  Card as CardRoot,
  CardContent,
  CardHeader,
  CardTitle,
} from "../atoms/card";
import { ButtonGroup } from "../button-group";
import { forwardRef } from "../utils";

export interface CardProps {
  title?: string;
  actions?: ActionProps[];
}

export const Card = forwardRef<CardProps, "div">(
  ({ title, actions = [], children }, ref) => {
    return (
      <CardRoot ref={ref}>
        {(typeof title !== "undefined" || actions.length > 0) && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>

            <ButtonGroup>
              {actions.map((action, index) => (
                <Action
                  classNames={{ root: "-m-1 p-1" }}
                  key={index}
                  variant="link"
                  {...action}
                />
              ))}
            </ButtonGroup>
          </CardHeader>
        )}

        <CardContent>{children}</CardContent>
      </CardRoot>
    );
  },
);
