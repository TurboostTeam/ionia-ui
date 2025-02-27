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
        className="w-1/7 m-0 p-0"
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
    "w-1/7 bg-surface-transparent m-0 p-0 rounded",
    selected === true && "bg-fill-primary text-fill-primary",
    (inRange === true || inHoveringRange === true) &&
      disabled === false &&
      "rounded-none bg-fill-primary-secondary",
    isFirstSelectedDay === true && "rounded-r-none rounded-l-full",
    isLastSelectedDay === true && "rounded-l-none rounded-r-full",
  );

  const dayClassName = twMerge(
    "block h-full w-full text-xs m-0 p-2 bg-surface-transparent border-none rounded outline-none text-center text-fill-secondary cursor-pointer hover:bg-fill-primary-hover hover:text-fill-primary",
    selected === true && "bg-fill-primary text-fill-primary",
    disabled === true &&
      "bg-surface-transparent text-disabled hover:bg-surface-transparent hover:text-disabled cursor-not-allowed",
    today && "font-semibold",
    (inRange === true || inHoveringRange === true) &&
      disabled === false &&
      "bg-fill-primary-secondary rounded-none",
    isFirstSelectedDay === true && "rounded-r-none rounded-l-full",
    isLastSelectedDay === true && "rounded-l-none rounded-r-full",
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
