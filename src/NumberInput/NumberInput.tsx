import { useCallback, useState } from "react";

import { Input, type InputProps } from "../Input";
import { forwardRef } from "../utils";

export interface NumberInputProps
  extends Omit<InputProps, "value" | "onChange"> {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
}

export const NumberInput = forwardRef<NumberInputProps, "input">(
  (
    {
      min = Number.MIN_SAFE_INTEGER,
      max = Number.MAX_SAFE_INTEGER,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value?.toString());

    const handleBlur = useCallback(() => {
      const numberValue = Number(inputValue);

      if (typeof onChange !== "undefined") {
        if (isNaN(numberValue)) {
          setInputValue(value?.toString());
          return;
        }

        if (numberValue >= min && numberValue <= max) {
          onChange(numberValue);
          setInputValue(numberValue.toString());
        } else {
          setInputValue(Math.max(min, Math.min(max, numberValue)).toString());
        }
      }
    }, [inputValue, max, min, onChange, value]);

    return (
      <Input
        ref={ref}
        {...props}
        value={inputValue}
        onBlur={handleBlur}
        onChange={setInputValue}
      />
    );
  }
);
