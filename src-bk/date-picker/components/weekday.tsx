import { memo } from "react";
import { twMerge } from "tailwind-merge";

export interface WeekdayProps {
  title: string;
  current: boolean;
}

export const Weekday = memo(function Weekday({ title, current }: WeekdayProps) {
  return (
    <th
      className={twMerge(
        "p-2 font-light bg-surface-transparent text-xs text-center select-none",
        current ? "font-bold text-primary" : "text-fill-secondary",
      )}
      scope="col"
    >
      {title}
    </th>
  );
});
