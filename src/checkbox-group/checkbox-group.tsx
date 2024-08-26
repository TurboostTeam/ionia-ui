import { Checkbox } from "@/checkbox";
import { FormItem, type FormItemProps } from "@/form-item";
import { forwardRef } from "@/utils";

export interface CheckboxGroupOption {
  label: string;
  value: string;
}

export interface CheckboxGroupProps extends FormItemProps {
  options: CheckboxGroupOption[];
  disabled?: boolean;
  value?: string[];
  onChange?: (value: string[]) => void;
}

export const CheckboxGroup = forwardRef<CheckboxGroupProps, "div">(
  (
    { className, label, helpText, error, options, value, disabled, onChange },
    ref,
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
          <Checkbox
            checked={
              typeof onChange !== "undefined"
                ? value?.includes(option.value) ?? false
                : undefined
            }
            disabled={disabled}
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
  },
);
