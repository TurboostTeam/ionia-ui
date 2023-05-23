import { memo, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { isSameDay } from "../utils/dates";

export interface DayProps {
  focused?: boolean;
  day?: Date;
  selected?: boolean;
  inRange?: boolean;
  inHoveringRange?: boolean;
  disabled?: boolean;
  lastDayOfMonth?: Date;
  isLastSelectedDay?: boolean;
  isFirstSelectedDay?: boolean;
  isHoveringRight?: boolean;
  rangeIsDifferent?: boolean;
  onClick?: (day: Date) => void;
  onHover?: (day?: Date) => void;
  onFocus?: (day: Date) => void;
}

export const Day = memo(function Day({
  day,
  focused,
  onClick,
  onHover = noop,
  onFocus = noop,
  selected,
  inRange,
  inHoveringRange,
  disabled,
  lastDayOfMonth,
  isLastSelectedDay,
  isFirstSelectedDay,
  isHoveringRight,
  rangeIsDifferent,
}: DayProps) {
  const dayNode = useRef<HTMLButtonElement>(null);
  const hoverValue = lastDayOfMonth != null ? lastDayOfMonth : day;

  useEffect(() => {
    if (focused === true && dayNode.current != null) {
      dayNode.current.focus();
    }
  }, [focused]);

  if (day == null) {
    return (
      <td
        className="m-0 w-1/7 p-0"
        onMouseOver={() => {
          onHover(hoverValue);
        }}
      />
    );
  }

  const handleClick =
    typeof onClick !== "undefined" && disabled === false
      ? onClick.bind(null, day)
      : noop;

  const today = isSameDay(new Date(), day);

  const dayCellClassName = twMerge(
    "w-1/7 bg-transparent m-0 p-0 rounded",
    selected === true && "bg-indigo-600 text-white",
    (inRange === true || inHoveringRange === true) &&
      disabled === false &&
      "rounded-none bg-indigo-50",
    isLastSelectedDay === true && "rounded-l-none rounded-r-full",
    isFirstSelectedDay === true && "rounded-r-none rounded-l-full"
  );

  const dayClassName = twMerge(
    "block h-full w-full text-xs m-0 p-2 bg-transparent border-none rounded outline-none text-center text-gray-600 cursor-pointer hover:bg-indigo-700 hover:text-white",
    selected === true && "bg-indigo-600 text-white",
    disabled === true &&
      "bg-transparent text-gray-300 hover:bg-transparent hover:text-gray-300 cursor-not-allowed",
    today && "font-semibold",
    (inRange === true || inHoveringRange === true) &&
      disabled == null &&
      "bg-indigo-50 rounded-none",
    isLastSelectedDay === true && "rounded-l-none rounded-r-full",
    isFirstSelectedDay === true && "rounded-r-none rounded-l-full"
  );

  const date = day.getDate();

  return (
    <td className={dayCellClassName}>
      <button
        className={dayClassName}
        ref={dayNode}
        type="button"
        onClick={() => {
          handleClick();
        }}
        onFocus={() => {
          onFocus?.(day);
        }}
        onMouseOver={() => {
          onHover?.(hoverValue);
        }}
      >
        {date}
      </button>
    </td>
  );
});

function noop(): void {}
