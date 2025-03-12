import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import {
  format as formatFn,
  max as maxFn,
  min as minFn,
  subDays,
} from "date-fns";
import { useEffect, useState } from "react";

import { DatePicker } from "../date-picker";
import { Input, type InputProps } from "../input";
import { Popover } from "../popover";
import { TimePicker } from "../time-picker";
import { forwardRef } from "../utils";

export interface DateTimeInputProps
  extends Omit<InputProps, "value" | "onChange"> {
  format?: string;
  min?: Date;
  max?: Date;
  value?: Date;
  onChange?: (date: Date) => void;
}

export const DateTimeInput = forwardRef<DateTimeInputProps, "input">(
  (
    {
      format = "yyyy-MM-dd HH:mm:ss",
      disabled,
      min,
      max,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(
      // eslint-disable-next-line no-void
      value instanceof Date ? formatFn(value, format) : void 0,
    );

    const [{ month, year }, setDate] = useState({
      month: value != null ? value.getMonth() : new Date().getMonth(),
      year: value != null ? value.getFullYear() : new Date().getFullYear(),
    });

    useEffect(() => {
      if (value instanceof Date) {
        setInputValue(formatFn(value, format));
      }
    }, [format, value]);

    return (
      <Popover
        activator={
          <Input
            disabled={disabled}
            prefix={<CalendarIcon className="h-5 w-5" />}
            ref={ref}
            value={inputValue}
            onChange={setInputValue}
            {...props}
            className="min-w-[180px]"
          />
        }
        contentConfig={{
          sideOffset: 14,
        }}
      >
        <div className="flex max-w-md gap-2 divide-x">
          <DatePicker
            disableDatesAfter={max}
            disableDatesBefore={
              // eslint-disable-next-line no-void
              typeof min !== "undefined" ? subDays(min, 1) : void 0
            }
            month={month}
            selected={value}
            year={year}
            onChange={({ end }) => {
              setDate({
                month: end.getMonth(),
                year: end.getFullYear(),
              });

              let newValue = new Date(value ?? end);
              newValue.setFullYear(end.getFullYear());
              newValue.setMonth(end.getMonth());
              newValue.setDate(end.getDate());

              if (typeof min !== "undefined") {
                newValue = maxFn([min, newValue]);
              }

              if (typeof max !== "undefined") {
                newValue = minFn([max, newValue]);
              }

              onChange?.(newValue);
            }}
            onMonthChange={(month, year) => {
              setDate({ month, year });
            }}
          />

          <div className="flex items-center pl-2">
            <TimePicker max={max} min={min} value={value} onChange={onChange} />
          </div>
        </div>
      </Popover>
    );
  },
);
