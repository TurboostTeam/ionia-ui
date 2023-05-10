import { type FC } from "react";
import { twMerge } from "tailwind-merge";

import { Checkbox } from "../checkbox";
import { Radio } from "../radio";

export interface ChoiceListItem {
  label: string;
  value: string;
}

export interface ChoiceListBaseProps {
  label?: string;
  helpText?: string;
  error?: string;
  choices: ChoiceListItem[];
}

export interface ChoiceListSingleProps extends ChoiceListBaseProps {
  multiple?: false;
  value?: string;
  onChange?: (value: string) => void;
}

export interface ChoiceListMultipleProps extends ChoiceListBaseProps {
  multiple: true;
  value?: string[];
  onChange?: (value: string[]) => void;
}

export type ChoiceListProps = ChoiceListSingleProps | ChoiceListMultipleProps;

export const ChoiceList: FC<ChoiceListProps> = ({
  label,
  helpText,
  error,
  choices,
  multiple,
  value,
  onChange,
}) => {
  return (
    <div className="text-sm">
      {typeof label !== "undefined" && (
        <label
          className="block font-medium leading-6 text-gray-900"
          htmlFor={label}
        >
          {label}
        </label>
      )}

      {multiple === true
        ? choices.map((choice) => (
            <Checkbox
              checked={value?.includes(choice.value)}
              key={choice.label}
              label={choice.label}
              onChange={(event) => {
                if (event.target.checked) {
                  onChange?.([...(value ?? []), choice.value]);
                } else {
                  if (typeof value !== "undefined") {
                    onChange?.(value.filter((item) => item !== choice.value));
                  }
                }
              }}
            />
          ))
        : choices.map((choice) => (
            <Radio
              checked={value === choice.value}
              key={choice.label}
              label={choice.label}
              onChange={(event) => {
                onChange?.(event.target.value);
              }}
            />
          ))}

      {(typeof error !== "undefined" || typeof helpText !== "undefined") && (
        <p
          className={twMerge(
            `mt-2`,
            typeof error !== "undefined" && `text-red-600`,
            typeof error === "undefined" &&
              typeof helpText !== "undefined" &&
              `text-gray-500`
          )}
        >
          {error ?? helpText}
        </p>
      )}
    </div>
  );
};
