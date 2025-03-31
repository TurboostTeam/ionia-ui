import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { type FC } from "react";
import { twMerge } from "tailwind-merge";

import { Button } from "../button";
import { OrderDirection } from "./order-direction";

const options = [
  { label: "Oldest first", value: OrderDirection.ASC },
  { label: "Newest first", value: OrderDirection.DESC },
];

export interface OrderDirectionListProps {
  className?: string;
  value?: OrderDirection;
  onChange?: (value: OrderDirection) => void;
}

export const OrderDirectionList: FC<OrderDirectionListProps> = ({
  className,
  value,
  onChange,
}) => {
  return (
    <div className={twMerge("flex flex-col gap-1 pt-1", className)}>
      {options.map((option) => {
        const Icon =
          option.value === OrderDirection.ASC ? ArrowUpIcon : ArrowDownIcon;

        return (
          <Button
            classNames={{
              root: twMerge(
                "pl-0 [&>span]:justify-start",
                option.value === value
                  ? "bg-fill-transparent-hover text-primary"
                  : undefined,
              ),
            }}
            icon={Icon}
            key={option.value}
            size="sm"
            variant="ghost"
            onClick={() => onChange?.(option.value)}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
};
