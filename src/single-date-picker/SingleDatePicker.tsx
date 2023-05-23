import { Popover } from "@headlessui/react";
import { type FC, Fragment, useEffect, useState } from "react";

import { DatePicker } from "../date-picker";
import { Input } from "../input";

export interface SingleDatePickerProps {
  disabled?: boolean;
  onChange?: (date: Date) => void;
  date?: Date;
}

export const SingleDatePicker: FC<SingleDatePickerProps> = ({
  onChange,
  disabled,
  date,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    typeof date !== "undefined" ? date : new Date()
  );
  const [{ month, year }, setDate] = useState({
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear(),
  });

  const formattedValue = formatDate(selectedDate);

  useEffect(() => {
    setDate({
      month: selectedDate.getMonth(),
      year: selectedDate.getFullYear(),
    });

    onChange?.(selectedDate);
  }, [selectedDate, onChange]);

  return (
    <Popover className="relative">
      <Popover.Button as={Fragment} disabled={disabled}>
        <Input disabled={disabled} value={formattedValue} />
      </Popover.Button>

      <Popover.Panel className="z-1000 absolute top-12">
        {({ close }) => (
          <DatePicker
            month={month}
            selected={selectedDate}
            year={year}
            onChange={({ end }) => {
              setSelectedDate(end);
              close();
            }}
            onMonthChange={(month, year) => {
              setDate({ month, year });
            }}
          />
        )}
      </Popover.Panel>
    </Popover>
  );
};

function formatDate(date: Date): string {
  const yy = date.getFullYear();

  const mm = `${date.getMonth() + 1}`.padStart(2, "0");

  const dd = `${date.getDate()}`.padStart(2, "0");

  return `${yy}-${mm}-${dd}`;
}
