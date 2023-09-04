import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  type FC,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Button } from "../Button";
import { Month } from "./components/Month";
import {
  getNextDisplayMonth,
  getNextDisplayYear,
  getPreviousDisplayMonth,
  getPreviousDisplayYear,
  isDateAfter,
  isDateBefore,
  isDateDisabled,
  type Range,
} from "./utils/dates";

export interface DatePickerProps {
  /** ID for the element */
  id?: string;
  /** The selected date or range of dates */
  selected?: Date | Range;
  /** The month to show, from 0 to 11. 0 is January, 1 is February ... 11 is December */
  month: number;
  /** The year to show */
  year: number;
  /** Allow a range of dates to be selected */
  allowRange?: boolean;
  /** Disable selecting dates before this. */
  disableDatesBefore?: Date;
  /** Disable selecting dates after this. */
  disableDatesAfter?: Date;
  /** Disable specific dates. */
  disableSpecificDates?: Date[];
  /** The selection can span multiple months */
  multiMonth?: boolean;
  /**
   * First day of week, from 0 to 6. 0 is Sunday, 1 is Monday ... 6 is Saturday
   * @default 0
   */
  weekStartsOn?: number;
  /** Callback when date is selected. */
  onChange?: (date: Range) => void;
  /** Callback when month is changed. */
  onMonthChange?: (month: number, year: number) => void;
}

export const DatePicker: FC<DatePickerProps> = ({
  id,
  selected,
  month,
  year,
  allowRange,
  disableDatesAfter,
  disableSpecificDates,
  disableDatesBefore,
  multiMonth,
  weekStartsOn = 0,
  onChange,
  onMonthChange,
}) => {
  const [hoverDate, setHoverDate] = useState<Date | undefined>(undefined);
  const [focusDate, setFocusDate] = useState<Date | undefined>(undefined);

  const handleFocus = useCallback((date: Date) => {
    setFocusDate(date);
  }, []);

  const handleHover = useCallback((date: Date) => {
    setHoverDate(date);
  }, []);

  const setFocusDateAndHandleMonthChange = useCallback(
    (date: Date) => {
      if (typeof onMonthChange !== "undefined") {
        onMonthChange(date.getMonth(), date.getFullYear());
      }
      setHoverDate(date);
      setFocusDate(date);
    },
    [onMonthChange],
  );

  const handleDateSelection = useCallback(
    (range: Range) => {
      const { end } = range;

      setHoverDate(end);
      setFocusDate(new Date(end));
      onChange?.(range);
    },
    [onChange],
  );

  const handleMonthChangeClick = useCallback(
    (month: number, year: number) => {
      if (onMonthChange == null) {
        return;
      }
      setFocusDate(undefined);
      onMonthChange(month, year);
    },
    [onMonthChange],
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const { key } = event;

      const range = deriveRange(selected);
      const focusedDate =
        typeof focusDate !== "undefined"
          ? focusDate
          : typeof range !== "undefined"
          ? range.start
          : undefined;

      if (focusedDate == null) {
        return;
      }

      if (key === "ArrowUp") {
        const previousWeek = new Date(focusedDate);
        previousWeek.setDate(focusedDate.getDate() - 7);
        if (
          !(
            (typeof disableDatesBefore !== "undefined" &&
              isDateBefore(previousWeek, disableDatesBefore)) ||
            (typeof disableSpecificDates !== "undefined" &&
              isDateDisabled(previousWeek, disableSpecificDates))
          )
        ) {
          setFocusDateAndHandleMonthChange(previousWeek);
        }
      }

      if (key === "ArrowDown") {
        const nextWeek = new Date(focusedDate);
        nextWeek.setDate(focusedDate.getDate() + 7);
        if (
          !(
            (typeof disableDatesAfter !== "undefined" &&
              isDateAfter(nextWeek, disableDatesAfter)) ||
            (typeof disableSpecificDates !== "undefined" &&
              isDateDisabled(nextWeek, disableSpecificDates))
          )
        ) {
          setFocusDateAndHandleMonthChange(nextWeek);
        }
      }

      if (key === "ArrowRight") {
        const tomorrow = new Date(focusedDate);
        tomorrow.setDate(focusedDate.getDate() + 1);
        if (
          !(
            (typeof disableDatesAfter !== "undefined" &&
              isDateAfter(tomorrow, disableDatesAfter)) ||
            (typeof disableSpecificDates !== "undefined" &&
              isDateDisabled(tomorrow, disableSpecificDates))
          )
        ) {
          setFocusDateAndHandleMonthChange(tomorrow);
        }
      }

      if (key === "ArrowLeft") {
        const yesterday = new Date(focusedDate);
        yesterday.setDate(focusedDate.getDate() - 1);
        if (
          !(
            (typeof disableDatesBefore !== "undefined" &&
              isDateBefore(yesterday, disableDatesBefore)) ||
            (typeof disableSpecificDates !== "undefined" &&
              isDateDisabled(yesterday, disableSpecificDates))
          )
        ) {
          setFocusDateAndHandleMonthChange(yesterday);
        }
      }
    },
    [
      disableDatesAfter,
      disableDatesBefore,
      disableSpecificDates,
      focusDate,
      selected,
      setFocusDateAndHandleMonthChange,
    ],
  );

  useEffect(() => {
    setFocusDate(undefined);
  }, [selected]);

  const monthIsSelected = useMemo(() => deriveRange(selected), [selected]);

  const showNextYear = getNextDisplayYear(month, year);
  const showNextMonth = getNextDisplayMonth(month);

  const showPreviousYear = getPreviousDisplayYear(month, year);
  const showPreviousMonth = getPreviousDisplayMonth(month);

  const secondDatePicker =
    multiMonth === true ? (
      <Month
        allowRange={allowRange}
        disableDatesAfter={disableDatesAfter}
        disableDatesBefore={disableDatesBefore}
        disableSpecificDates={disableSpecificDates}
        focusedDate={focusDate}
        hoverDate={hoverDate}
        month={showNextMonth}
        selected={monthIsSelected}
        weekStartsOn={weekStartsOn}
        year={showNextYear}
        onChange={handleDateSelection}
        onFocus={handleFocus}
        onHover={handleHover}
      />
    ) : null;

  return (
    <div
      className="relative"
      id={id}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <div className="absolute top-0 flex w-full justify-between">
        <Button
          ghost
          icon={ChevronLeftIcon}
          size="sm"
          onClick={() => {
            handleMonthChangeClick(showPreviousMonth, showPreviousYear);
          }}
        />

        <Button
          ghost
          icon={ChevronRightIcon}
          size="sm"
          onClick={() => {
            handleMonthChangeClick(showNextMonth, showNextYear);
          }}
        />
      </div>
      <div className="flex flex-wrap">
        <Month
          allowRange={allowRange}
          disableDatesAfter={disableDatesAfter}
          disableDatesBefore={disableDatesBefore}
          disableSpecificDates={disableSpecificDates}
          focusedDate={focusDate}
          hoverDate={hoverDate}
          month={month}
          selected={deriveRange(selected)}
          weekStartsOn={weekStartsOn}
          year={year}
          onChange={handleDateSelection}
          onFocus={handleFocus}
          onHover={handleHover}
        />
        {secondDatePicker}
      </div>
    </div>
  );
};

function handleKeyDown(event: KeyboardEvent<HTMLElement>): void {
  const { key } = event;

  if (
    key === "ArrowUp" ||
    key === "ArrowDown" ||
    key === "ArrowLeft" ||
    key === "ArrowRight"
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
}

function deriveRange(selected?: Date | Range): Range | undefined {
  return selected instanceof Date
    ? { start: selected, end: selected }
    : selected;
}
