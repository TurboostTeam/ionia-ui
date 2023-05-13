import { type ReactElement } from "react";

import { Checkbox } from "../checkbox";
import { FormItem, type FormItemProps } from "../form-item/FormItem";

export interface CheckboxGroupOption<T> {
  label: string;
  value: T;
}

export interface CheckboxGroupProps<T> extends FormItemProps {
  options: Array<CheckboxGroupOption<T>>;
  value?: T[];
  onChange?: (value: T[]) => void;
}

export function CheckboxGroup<T extends string>({
  className,
  label,
  helpText,
  error,
  options,
  value,
  onChange,
}: CheckboxGroupProps<T>): ReactElement {
  return (
    <FormItem
      className={className}
      error={error}
      helpText={helpText}
      label={label}
    >
      {options.map((option) => (
        <Checkbox
          checked={
            typeof onChange !== "undefined"
              ? value?.includes(option.value) ?? false
              : undefined
          }
          key={option.label}
          label={option.label}
          onChange={
            typeof onChange !== "undefined"
              ? (event) => {
                  if (event.target.checked) {
                    onChange([...(value ?? []), option.value]);
                  } else {
                    if (typeof value !== "undefined") {
                      onChange(value.filter((item) => item !== option.value));
                    }
                  }
                }
              : undefined
          }
        />
      ))}
    </FormItem>
  );
}
