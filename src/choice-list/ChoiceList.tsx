import { type FC } from "react";
import { twMerge } from "tailwind-merge";

import { Checkbox } from "../checkbox";
import { Radio } from "../radio";

export interface ChoiceListItem {
  label: string;
  value: string;
}

export interface ChoiceListBaseProps {
  name?: string;
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
  name,
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

      <ul className={twMerge(typeof label !== "undefined" && "mt-2")}>
        {multiple === true
          ? choices.map((choice) => (
              <li key={choice.label}>
                <Checkbox
                  checked={
                    typeof onChange !== "undefined"
                      ? value?.includes(choice.value) ?? false
                      : undefined
                  }
                  label={choice.label}
                  onChange={
                    typeof onChange !== "undefined"
                      ? (event) => {
                          if (event.target.checked) {
                            onChange([...(value ?? []), choice.value]);
                          } else {
                            if (typeof value !== "undefined") {
                              onChange(
                                value.filter((item) => item !== choice.value)
                              );
                            }
                          }
                        }
                      : undefined
                  }
                />
              </li>
            ))
          : choices.map((choice) => (
              <Radio
                checked={
                  typeof onChange !== "undefined"
                    ? value === choice.value
                    : undefined
                }
                key={choice.label}
                label={choice.label}
                name={name}
                value={choice.value}
                onChange={
                  typeof onChange !== "undefined"
                    ? (event) => {
                        onChange(event.target.value);
                      }
                    : undefined
                }
              />
            ))}
      </ul>

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
