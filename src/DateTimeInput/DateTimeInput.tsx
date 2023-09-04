import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import { format as formatFn, subDays } from "date-fns";
import { useEffect, useState } from "react";

import { DatePicker } from "../DatePicker";
import { Input, type InputProps } from "../Input";
import { Popover } from "../Popover";
import { TimePicker } from "../TimePicker";
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
          />
        }
      >
        <div className="flex max-w-md gap-2 divide-x p-2">
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

              const newValue = new Date(value ?? end);
              newValue.setFullYear(end.getFullYear());
              newValue.setMonth(end.getMonth());
              newValue.setDate(end.getDate());

              if (typeof min === "undefined") {
                onChange?.(newValue);
                return;
              }

              onChange?.(newValue.getTime() > min.getTime() ? newValue : min);
            }}
            onMonthChange={(month, year) => {
              setDate({ month, year });
            }}
          />

          <div className="flex items-end justify-end pl-2">
            <TimePicker max={max} min={min} value={value} onChange={onChange} />
          </div>
        </div>
      </Popover>
    );
  },
);
