import { startOfDay, startOfHour, startOfMinute } from "date-fns";
import React, { type FC, useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export interface TimePickerListProps {
  type: "hours" | "minutes" | "seconds";
  min: number;
  max: number;
  value?: number;
  onChange?: (value: number) => void;
}

export const TimePickerList: FC<TimePickerListProps> = ({
  type,
  min = 0,
  max,
  value,
  onChange,
}) => {
  const [ref, setRef] = useState<HTMLUListElement | null>(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (ref !== null) {
      if (typeof value === "number") {
        if (!init) {
          setInit(true);
        }

        ref.scrollTo({
          top: value * 32,
          behavior: init ? "smooth" : "auto",
        });
      }
    }
  }, [ref, value, init]);

  return (
    <ul
      className="h-[calc(theme(spacing.8)*6)] w-12 overflow-y-scroll scroll-auto px-1 scrollbar-none after:block after:h-[calc(theme(spacing.8)*5)]"
      ref={setRef}
    >
      {Array.from({ length: type === "hours" ? 24 : 60 }, (_, i) => i).map(
        (i) => {
          return (
            <li
              className={twMerge(
                "flex h-8 items-center justify-center rounded-md text-xs",
                i >= min && i <= max
                  ? "text-secondary-foreground cursor-pointer hover:bg-fill-primary-hover hover:text-primary-foreground"
                  : "text-gray-300 cursor-not-allowed",
                value === i && "bg-fill-primary text-primary-foreground",
              )}
              key={i}
              onClick={() => {
                if (i >= min && i <= max) {
                  onChange?.(i);
                }
              }}
            >
              {String(i).padStart(2, "0")}
            </li>
          );
        },
      )}
    </ul>
  );
};

export interface TimePickerProps {
  className?: string;
  min?: Date;
  max?: Date;
  value?: Date;
  onChange?: (date: Date) => void;
}

export const TimePicker: FC<TimePickerProps> = ({
  className,
  min,
  max,
  value,
  onChange,
}) => {
  const calcMaxHours = useCallback(
    (current?: Date) => {
      if (typeof max === "undefined") {
        return 23;
      }

      if (typeof current === "undefined") {
        current = value;
      }

      if (typeof current === "undefined") {
        return max.getHours();
      }

      return startOfDay(current) >= startOfDay(max) ? max.getHours() : 23;
    },
    [max, value],
  );

  const calcMaxMinutes = useCallback(
    (current?: Date) => {
      if (typeof max === "undefined") {
        return 59;
      }

      if (typeof current === "undefined") {
        current = value;
      }

      if (typeof current === "undefined") {
        return max.getMinutes();
      }

      return startOfHour(current) >= startOfHour(max) ? max.getMinutes() : 59;
    },
    [max, value],
  );

  const calcMaxSeconds = useCallback(
    (current?: Date) => {
      if (typeof max === "undefined") {
        return 59;
      }

      if (typeof current === "undefined") {
        current = value;
      }

      if (typeof current === "undefined") {
        return max.getSeconds();
      }

      return startOfMinute(current) >= startOfMinute(max)
        ? max.getSeconds()
        : 59;
    },
    [max, value],
  );

  const calcMinHours = useCallback(
    (current?: Date) => {
      if (typeof min === "undefined") {
        return 0;
      }

      if (typeof current === "undefined") {
        current = value;
      }

      if (typeof current === "undefined") {
        return min.getHours();
      }

      return startOfDay(min) >= startOfDay(current) ? min.getHours() : 0;
    },
    [min, value],
  );

  const calcMinMinutes = useCallback(
    (current?: Date) => {
      if (typeof min === "undefined") {
        return 0;
      }

      if (typeof current === "undefined") {
        current = value;
      }

      if (typeof current === "undefined") {
        return min.getMinutes();
      }

      return startOfHour(min) >= startOfHour(current) ? min.getMinutes() : 0;
    },
    [min, value],
  );

  const calcMinSeconds = useCallback(
    (current?: Date) => {
      if (typeof min === "undefined") {
        return 0;
      }

      if (typeof current === "undefined") {
        current = value;
      }

      if (typeof current === "undefined") {
        return min.getSeconds();
      }

      return startOfMinute(min) >= startOfMinute(current)
        ? min.getSeconds()
        : 0;
    },
    [min, value],
  );

  return (
    <div className={twMerge("flex divide-x -mx-1", className)}>
      <TimePickerList
        max={calcMaxHours(value)}
        min={calcMinHours(value)}
        type="hours"
        value={value?.getHours()}
        onChange={(newHour) => {
          const newDate = new Date(value ?? new Date());
          newDate.setHours(newHour);
          newDate.setMinutes(
            Math.min(
              calcMaxMinutes(newDate),
              Math.max(calcMinMinutes(newDate), newDate.getMinutes()),
            ),
          );
          newDate.setSeconds(
            Math.min(
              calcMaxSeconds(newDate),
              Math.max(calcMinSeconds(newDate), newDate.getSeconds()),
            ),
          );

          onChange?.(newDate);
        }}
      />

      <TimePickerList
        max={calcMaxMinutes(value)}
        min={calcMinMinutes(value)}
        type="minutes"
        value={value?.getMinutes()}
        onChange={(newMinutes) => {
          const newDate = new Date(value ?? new Date());
          newDate.setMinutes(newMinutes);
          newDate.setSeconds(
            Math.min(
              calcMaxSeconds(newDate),
              Math.max(calcMinSeconds(newDate), newDate.getSeconds()),
            ),
          );

          onChange?.(newDate);
        }}
      />

      <TimePickerList
        max={calcMaxSeconds(value)}
        min={calcMinSeconds(value)}
        type="seconds"
        value={value?.getSeconds()}
        onChange={(newSeconds) => {
          const newDate = new Date(value ?? new Date());
          newDate.setSeconds(newSeconds);

          onChange?.(newDate);
        }}
      />
    </div>
  );
};

export default TimePicker;
