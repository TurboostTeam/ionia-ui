import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { type FC } from "react";
import { twMerge } from "tailwind-merge";

import { Button } from "../Button";
import { OrderDirection } from "./OrderDirection";

const options = [
  { label: "正序", value: OrderDirection.ASC },
  { label: "倒序", value: OrderDirection.DESC },
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
                "px-0.5 py-1 text-left text-sm shadow-none ring-0",
                ((typeof value === "undefined" &&
                  option.value === OrderDirection.ASC) ||
                  value === option.value) &&
                  "bg-blue-50 text-blue-600 hover:bg-blue-50",
              ),
            }}
            key={option.value}
            size="sm"
            onClick={() => onChange?.(option.value)}
          >
            <span className="flex items-center">
              <Icon className="h-3.5 w-3.5" />
              <span className="ml-2">{option.label}</span>
            </span>
          </Button>
        );
      })}
    </div>
  );
};
