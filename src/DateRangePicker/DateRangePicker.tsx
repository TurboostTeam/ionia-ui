import { Popover } from "@headlessui/react";
import dayjs from "dayjs";
import { type FC, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Card } from "../Card";
import { DatePicker } from "../DatePicker";
import { Input, type InputProps } from "../Input";

export interface PresetRange {
  title: string;
  range: [Date, Date];
}

export interface DateRangePickerProps
  extends Omit<InputProps, "value" | "onChange"> {
  range?: [Date, Date];
  presetRange?: PresetRange[];
  disabled?: boolean;
  disableDatesBefore?: Date;
  disableDatesAfter?: Date;
  disableSpecificDates?: Date[];
  placeholder?: string;
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
  ...props
}) => {
  const [activeDateRange, setActiveDateRange] = useState<PresetRange>();

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

  useEffect(() => {
    setActiveDateRange(
      typeof range !== "undefined"
        ? { title: "custom", range }
        : presetRange?.[0],
    );
  }, [range, presetRange]);

  return (
    <Popover className="relative min-w-[240px]">
      <Popover.Button
        as={Input}
        disabled={disabled}
        {...props}
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
          typeof activeDateRange === "undefined"
            ? ""
            : `${
                activeDateRange != null
                  ? dayjs(activeDateRange.range[0]).format("YYYY-MM-DD")
                  : ""
              } ~ ${
                activeDateRange != null
                  ? dayjs(activeDateRange.range[1]).format("YYYY-MM-DD")
                  : ""
              }`
        }
      />

      <Popover.Panel className="absolute top-12 z-[1010]">
        <Card>
          <div className="flex space-x-2">
            {typeof presetRange !== "undefined" && presetRange.length > 0 ? (
              <div className="space-y-1">
                {presetRange.map((preset, index) => {
                  return (
                    <div
                      className={twMerge(
                        "cursor-pointer text-gray-600 whitespace-nowrap rounded p-1 text-sm hover:bg-gray-100",
                        preset.title === activeDateRange?.title &&
                          "bg-gray-100",
                      )}
                      key={index}
                      onClick={() => {
                        setActiveDateRange(preset);
                        onChange?.(preset.range);
                      }}
                    >
                      {preset.title}
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
