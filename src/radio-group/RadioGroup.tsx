import { type ReactElement } from "react";

import { FormItem, type FormItemProps } from "../form-item/FormItem";
import { Radio } from "../radio";

export interface RadioGroupOption<T> {
  label: string;
  value: T;
}

export interface RadioGroupProps<T> extends FormItemProps {
  name?: string;
  options: Array<RadioGroupOption<T>>;
  value?: T;
  onChange?: (value: T) => void;
}

export function RadioGroup<T extends string>({
  className,
  name,
  label,
  helpText,
  error,
  options,
  value,
  onChange,
}: RadioGroupProps<T>): ReactElement {
  return (
    <FormItem
      className={className}
      error={error}
      helpText={helpText}
      label={label}
    >
      {options.map((option) => (
        <Radio
          checked={
            typeof onChange !== "undefined" ? value === option.value : undefined
          }
          key={option.label}
          label={option.label}
          name={name}
          value={option.value}
          onChange={
            typeof onChange !== "undefined"
              ? (event) => {
                  onChange(event.target.value as T);
                }
              : undefined
          }
        />
      ))}
    </FormItem>
  );
}
