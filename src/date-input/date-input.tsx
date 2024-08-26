import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import dayjs from "dayjs";
import { useState } from "react";

import { DatePicker } from "@/date-picker";
import { Input, type InputProps } from "@/input";
import { Popover } from "@/popover";
import { forwardRef } from "@/utils";

export interface DateInputProps extends Omit<InputProps, "value" | "onChange"> {
  min?: Date;
  max?: Date;
  value?: Date;
  onChange?: (date: Date) => void;
}

export const DateInput = forwardRef<DateInputProps, "input">(
  ({ disabled, min, max, value, onChange, ...props }, ref) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

    const [{ month, year }, setDate] = useState({
      month:
        selectedDate != null ? selectedDate.getMonth() : new Date().getMonth(),
      year:
        selectedDate != null
          ? selectedDate.getFullYear()
          : new Date().getFullYear(),
    });

    const formattedValue =
      selectedDate != null ? dayjs(selectedDate).format("YYYY-MM-DD") : "";

    return (
      <Popover
        activator={
          <Input
            disabled={disabled}
            prefix={<CalendarIcon className="h-5 w-5" />}
            ref={ref}
            value={formattedValue}
            {...props}
          />
        }
      >
        <div className="max-w-md p-2">
          <DatePicker
            disableDatesAfter={max}
            disableDatesBefore={min}
            month={month}
            selected={selectedDate}
            year={year}
            onChange={({ end }) => {
              setSelectedDate(end);

              setDate({
                month: end.getMonth(),
                year: end.getFullYear(),
              });

              onChange?.(end);
            }}
            onMonthChange={(month, year) => {
              setDate({ month, year });
            }}
          />
        </div>
      </Popover>
    );
  },
);
