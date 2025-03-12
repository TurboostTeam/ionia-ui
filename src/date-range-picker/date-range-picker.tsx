import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import dayjs from "dayjs";
import { type FC, useEffect, useState } from "react";

import { Button } from "../button";
import { DatePicker } from "../date-picker";
import { Input, type InputProps } from "../input";
import { Popover } from "../popover";

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
  onChange?: (range: [Date, Date]) => void;
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
    <Popover
      activator={
        <Input
          className="min-w-[200px]"
          disabled={disabled}
          {...props}
          prefix={<CalendarIcon className="h-5 w-5" />}
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
      }
      contentConfig={{ sideOffset: 14 }}
    >
      <div className="flex gap-2">
        {typeof presetRange !== "undefined" && presetRange.length > 0 ? (
          <div className="space-y-1">
            {presetRange.map((preset, index) => {
              return (
                <Button
                  classNames={{
                    root: "whitespace-nowrap",
                  }}
                  key={index}
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setActiveDateRange(preset);
                    onChange?.(preset.range);
                  }}
                >
                  {preset.title}
                </Button>
              );
            })}
          </div>
        ) : undefined}

        <div className="max-w-[230px]">
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
    </Popover>
  );
};
