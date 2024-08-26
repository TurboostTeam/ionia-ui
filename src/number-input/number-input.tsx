import { Input, type InputProps } from "@/input";
import { forwardRef } from "@/utils";

export interface NumberInputProps
  extends Omit<InputProps, "value" | "onChange"> {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  onBlur?: (value: number) => void;
}

export const NumberInput = forwardRef<NumberInputProps, "input">(
  (
    {
      min = Number.MIN_SAFE_INTEGER,
      max = Number.MAX_SAFE_INTEGER,
      value,
      onChange,
      onBlur,
      ...props
    },
    ref,
  ) => {
    return (
      <Input
        max={max}
        min={min}
        ref={ref}
        value={value?.toString()}
        {...props}
        type="number"
        onBlur={(e) => {
          const val = Number(e.target.value);

          if (val <= min) {
            onChange?.(min);
          }

          onBlur?.(val);
        }}
        onChange={(value) => {
          const val = Number(value);

          onChange?.(val >= max ? max : val);
        }}
      />
    );
  },
);
