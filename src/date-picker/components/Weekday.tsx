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
        "p-2 font-light bg-transparent text-xs text-center select-none",
        current ? "font-bold text-indigo-600" : "text-gray-500"
      )}
      scope="col"
    >
      {title}
    </th>
  );
});
