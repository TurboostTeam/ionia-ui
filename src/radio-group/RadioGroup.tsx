import { forwardRef } from "../common";
import { FormItem, type FormItemProps } from "../form-item";
import { Radio } from "../radio";

export interface RadioGroupOption {
  label: string;
  value: string;
}

export interface RadioGroupProps extends FormItemProps {
  name?: string;
  options: RadioGroupOption[];
  value?: string;
  onChange?: (value: string) => void;
}

export const RadioGroup = forwardRef<RadioGroupProps, "div">(
  (
    { className, name, label, helpText, error, options, value, onChange },
    ref
  ) => {
    return (
      <FormItem
        className={className}
        error={error}
        helpText={helpText}
        label={label}
        ref={ref}
      >
        {options.map((option) => (
          <Radio
            checked={
              typeof onChange !== "undefined"
                ? value === option.value
                : undefined
            }
            key={option.label}
            label={option.label}
            name={name}
            value={option.value}
            onChange={
              typeof onChange !== "undefined"
                ? (event) => {
                    onChange(event.target.value);
                  }
                : undefined
            }
          />
        ))}
      </FormItem>
    );
  }
);
