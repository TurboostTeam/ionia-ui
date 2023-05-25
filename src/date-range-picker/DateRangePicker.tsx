import { Popover } from "@headlessui/react";
import dayjs from "dayjs";
import { type FC, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Card } from "../card";
import { DatePicker } from "../date-picker";
import { Input } from "../input";

export interface PresetRange {
  title: string;
  range: [Date, Date];
}

export interface DateRangePickerProps {
  range?: [Date, Date];
  presetRange?: PresetRange[];
  disabled?: boolean;
  disableDatesBefore?: Date;
  disableDatesAfter?: Date;
  disableSpecificDates?: Date[];
  onChange?: (range: Date[]) => void;
}

export const DateRangePicker: FC<DateRangePickerProps> = ({
  range,
  presetRange,
  disableDatesBefore,
  disableDatesAfter,
  disableSpecificDates,
  disabled,
  onChange,
}) => {
  const [activeDateRange, setActiveDateRange] = useState(
    typeof range !== "undefined" ? { title: "custom", range } : presetRange?.[0]
  );
  const [{ month, year }, setDate] = useState({
    month:
      activeDateRange != null
        ? activeDateRange.range[0].getMonth()
        : new Date().getMonth(),
    year:
      activeDateRange != null
        ? activeDateRange.range[0].getFullYear()
        : new Date().getFullYear(),
  });

  return (
    <Popover className="relative">
      <Popover.Button as="div" className="flex space-x-1" disabled={disabled}>
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
          value={
            activeDateRange != null
              ? dayjs(activeDateRange.range[0]).format("YYYY-MM-DD")
              : undefined
          }
        />
        <svg
          className="h-10 w-10 fill-gray-500 hover:fill-gray-700"
          focusable="false"
          viewBox="0 0 20 20"
        >
          <path d="m17.707 9.293-5-5a.999.999 0 1 0-1.414 1.414l3.293 3.293h-11.586a1 1 0 1 0 0 2h11.586l-3.293 3.293a.999.999 0 1 0 1.414 1.414l5-5a.999.999 0 0 0 0-1.414z" />
        </svg>
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
          value={
            activeDateRange != null
              ? dayjs(activeDateRange.range[1]).format("YYYY-MM-DD")
              : undefined
          }
        />
      </Popover.Button>

      <Popover.Panel className="z-1000 absolute left-1/2 top-12 w-full -translate-x-1/2">
        <Card>
          <div className="flex space-x-2">
            {typeof presetRange !== "undefined" && presetRange.length > 0 ? (
              <div className="space-y-1">
                {presetRange.map((range, index) => {
                  return (
                    <div
                      className={twMerge(
                        "cursor-pointer text-gray-600 whitespace-nowrap rounded p-1 text-sm hover:bg-gray-100",
                        range.title === activeDateRange?.title && "bg-gray-100"
                      )}
                      key={index}
                      onClick={() => {
                        setActiveDateRange(range);
                      }}
                    >
                      {range.title}
                    </div>
                  );
                })}
              </div>
            ) : undefined}

            <div>
              <DatePicker
                allowRange
                multiMonth
                disableDatesAfter={disableDatesAfter}
                disableDatesBefore={disableDatesBefore}
                disableSpecificDates={disableSpecificDates}
                month={month}
                selected={
                  typeof activeDateRange !== "undefined"
                    ? {
                        start: activeDateRange.range[0],
                        end: activeDateRange.range[1],
                      }
                    : undefined
                }
                year={year}
                onChange={({ start, end }) => {
                  const preset = (
                    typeof presetRange !== "undefined" ? presetRange : []
                  ).find((range) => {
                    return (
                      range.range[0].valueOf() === start.valueOf() &&
                      range.range[1].valueOf() === end.valueOf()
                    );
                  });

                  const newDateRange =
                    preset != null
                      ? preset
                      : {
                          title: "Custom",
                          range: [start, end],
                        };

                  setActiveDateRange(newDateRange as PresetRange);
                  onChange?.([start, end]);
                }}
                onMonthChange={(month, year) => {
                  setDate({ month, year });
                }}
              />
            </div>
          </div>
        </Card>
      </Popover.Panel>
    </Popover>
  );
};
