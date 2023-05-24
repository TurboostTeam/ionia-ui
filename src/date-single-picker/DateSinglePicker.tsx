import { Popover } from "@headlessui/react";
import dayjs from "dayjs";
import { type FC, Fragment, useState } from "react";

import { Card } from "../card";
import { DatePicker } from "../date-picker";
import { Input } from "../input";

export interface DateSinglePickerProps {
  disabled?: boolean;
  date?: Date;
  disableDatesBefore?: Date;
  disableDatesAfter?: Date;
  disableSpecificDates?: Date[];
  onChange?: (date: Date) => void;
}

export const DateSinglePicker: FC<DateSinglePickerProps> = ({
  disabled,
  disableDatesBefore,
  disableDatesAfter,
  disableSpecificDates,
  date,
  onChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);

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
    <Popover className="relative">
      <Popover.Button as={Fragment} disabled={disabled}>
        <Input
          disabled={disabled}
          prefix={
            <svg
              className="h-5 w-5 fill-gray-600"
              focusable="false"
              viewBox="0 0 20 20"
            >
              <path
                d="M7 2a1 1 0 0 1 1 1v1h4v-1a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h1v-1a1 1 0 0 1 1-1Zm-2 6v7h10v-7h-10Z"
                fillRule="evenodd"
              />
            </svg>
          }
          value={formattedValue}
        />
      </Popover.Button>

      <Popover.Panel className="z-1000 absolute left-1/2 top-12 w-full min-w-[254px] -translate-x-1/2">
        {({ close }) => (
          <Card>
            <DatePicker
              disableDatesAfter={disableDatesAfter}
              disableDatesBefore={disableDatesBefore}
              disableSpecificDates={disableSpecificDates}
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
                close();
              }}
              onMonthChange={(month, year) => {
                setDate({ month, year });
              }}
            />
          </Card>
        )}
      </Popover.Panel>
    </Popover>
  );
};
