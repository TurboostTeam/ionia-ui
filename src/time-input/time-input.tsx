import { ClockIcon } from "@heroicons/react/24/outline";
import { format as formatFn, isValid, parse } from "date-fns";
import { useEffect, useState } from "react";

import { Input, type InputProps } from "@/input";
import { Popover } from "@/popover";
import { TimePicker } from "@/time-picker";
import { forwardRef } from "@/utils";

export interface TimeInputProps extends Omit<InputProps, "value" | "onChange"> {
  format?: string;
  min?: Date;
  max?: Date;
  value?: Date;
  onChange?: (value: Date) => void;
}

export const TimeInput = forwardRef<TimeInputProps, "input">(
  ({ format = "HH:mm:ss", min, max, value, onChange, ...props }, ref) => {
    const [inputValue, setInputValue] = useState(
      // eslint-disable-next-line no-void
      value instanceof Date ? formatFn(value, format) : void 0,
    );

    const handleBlur = (): void => {
      if (typeof inputValue === "string" && inputValue !== "") {
        const parsedTime = parse(inputValue, format, new Date());

        if (isValid(parsedTime)) {
          onChange?.(parsedTime);
        } else {
          setInputValue(
            // eslint-disable-next-line no-void
            value instanceof Date ? formatFn(value, format) : void 0,
          );
        }
      } else {
        // eslint-disable-next-line no-void
        setInputValue(void 0);
      }
    };

    useEffect(() => {
      if (value instanceof Date) {
        setInputValue(formatFn(value, format));
      }
    }, [format, value]);

    return (
      <Popover
        activator={
          <Input
            prefix={<ClockIcon className="h-5 w-5" />}
            ref={ref}
            {...props}
            value={inputValue}
            onBlur={handleBlur}
            onChange={setInputValue}
          />
        }
      >
        <TimePicker
          className="p-1"
          max={max}
          min={min}
          value={value}
          onChange={onChange}
        />
      </Popover>
    );
  },
);
