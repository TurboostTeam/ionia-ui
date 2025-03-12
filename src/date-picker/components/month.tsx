import { useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import {
  dateIsInRange,
  dateIsSelected,
  getNewRange,
  getOrderedWeekdays,
  getWeeksForMonth,
  isDateAfter,
  isDateBefore,
  isDateDisabled,
  isSameDay,
  monthName,
  type Range,
  weekdayName,
} from "../utils/dates";
import { Day } from "./day";
import { Weekday } from "./weekday";

export interface MonthProps {
  focusedDate?: Date;
  selected?: Range;
  hoverDate?: Date;
  month: number;
  year: number;
  disableDatesBefore?: Date;
  disableDatesAfter?: Date;
  disableSpecificDates?: Date[];
  allowRange?: boolean;
  weekStartsOn: number;
  onChange?: (date: Range) => void;
  onHover?: (date: Date) => void;
  onFocus?: (date: Date) => void;
}

export const Month = ({
  focusedDate,
  selected,
  hoverDate,
  disableDatesBefore,
  disableDatesAfter,
  disableSpecificDates,
  allowRange,
  onChange = noop,
  onHover = noop,
  onFocus = noop,
  month,
  year,
  weekStartsOn,
}: MonthProps): JSX.Element => {
  const isInHoveringRange =
    allowRange === true ? hoveringDateIsInRange : () => false;
  const now = new Date();
  const current = now.getMonth() === month && now.getFullYear() === year;

  const weeks = useMemo(
    () => getWeeksForMonth(month, year, weekStartsOn),
    [month, weekStartsOn, year],
  );
  const weekdays = getOrderedWeekdays(weekStartsOn).map((weekday) => (
    <Weekday
      current={current && new Date().getDay() === weekday}
      key={weekday}
      title={weekdayName(weekday) as string}
    />
  ));

  const handleDateClick = useCallback(
    (selectedDate: Date) => {
      onChange(
        getNewRange(allowRange === true ? selected : undefined, selectedDate),
      );
    },
    [allowRange, onChange, selected],
  );

  const lastDayOfMonth = useMemo(
    () => new Date(year, month + 1, 0),
    [month, year],
  );

  function renderWeek(day: Date, dayIndex: number): JSX.Element {
    if (day == null) {
      return (
        <Day
          key={dayIndex}
          lastDayOfMonth={lastDayOfMonth}
          onHover={(day) => {
            onHover?.(day as Date);
          }}
        />
      );
    }
    const disabled =
      (typeof disableDatesBefore !== "undefined" &&
        isDateBefore(day, disableDatesBefore)) ||
      (typeof disableDatesAfter !== "undefined" &&
        isDateAfter(day, disableDatesAfter)) ||
      (typeof disableSpecificDates !== "undefined" &&
        isDateDisabled(day, disableSpecificDates));

    const isFirstSelectedDay =
      allowRange === true &&
      typeof selected !== "undefined" &&
      isDateStart(day, selected);
    const isLastSelectedDay =
      allowRange === true &&
      typeof selected !== "undefined" &&
      ((!isSameDay(selected.start, selected.end) && isDateEnd(day, selected)) ||
        (typeof hoverDate !== "undefined" &&
          isSameDay(selected.start, selected.end) &&
          isDateAfter(hoverDate, selected.start) &&
          isSameDay(day, hoverDate) &&
          !isFirstSelectedDay));

    const rangeIsDifferent = !(
      typeof selected !== "undefined" && isSameDay(selected.start, selected.end)
    );

    const isHoveringRight =
      typeof hoverDate !== "undefined" && isDateBefore(day, hoverDate);

    return (
      <Day
        day={day}
        disabled={disabled}
        focused={focusedDate != null && isSameDay(day, focusedDate)}
        inHoveringRange={
          selected != null &&
          hoverDate != null &&
          isInHoveringRange(day, selected, hoverDate)
        }
        inRange={selected != null && dateIsInRange(day, selected)}
        isFirstSelectedDay={isFirstSelectedDay}
        isHoveringRight={isHoveringRight}
        isLastSelectedDay={isLastSelectedDay}
        key={dayIndex}
        rangeIsDifferent={rangeIsDifferent}
        selected={selected != null && dateIsSelected(day, selected)}
        onClick={handleDateClick}
        onFocus={onFocus}
        onHover={(day) => {
          onHover?.(day as Date);
        }}
      />
    );
  }

  const weeksMarkup = weeks.map((week, index) => (
    <tr className="mb-1" key={index}>
      {week.map(renderWeek as any)}
    </tr>
  ));

  return (
    <div className="min-w-[230px] max-w-full flex-1 basis-[230px]">
      <table
        className="w-full table-fixed border-collapse border-spacing-0 border-none"
        role="grid"
      >
        <caption
          className={twMerge(
            "flex-1 space-x-1 pb-1 text-center",
            current && "font-semibold",
          )}
        >
          <span>{monthName(month)}</span>
          <span>{year}</span>
        </caption>
        <thead>
          <tr>{weekdays}</tr>
        </thead>
        <tbody>{weeksMarkup}</tbody>
      </table>
    </div>
  );
};

function hoveringDateIsInRange(
  day: Date | null,
  range: Range,
  hoverEndDate: Date,
): boolean {
  if (day == null) {
    return false;
  }
  const { start, end } = range;
  return Boolean(isSameDay(start, end) && day > start && day <= hoverEndDate);
}

function isDateEnd(day: Date | null, range: Range): boolean {
  if (day == null) return false;
  const { end } = range;

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  return Boolean(end && isSameDay(end, day));
}

function isDateStart(day: Date | null, range: Range): boolean {
  if (day == null) return false;
  const { start } = range;

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  return Boolean(start && isSameDay(start, day));
}

function noop(): void {}
