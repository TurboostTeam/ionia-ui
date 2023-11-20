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
    ref,
  ) => {
    return (
      <Input
        max={max}
        min={min}
        ref={ref}
        value={value?.toString()}
        onChange={(val) => {
          onChange?.(Number(val));
        }}
        {...props}
        type="number"
      />
    );
  },
);
