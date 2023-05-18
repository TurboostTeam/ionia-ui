import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment, type ReactElement } from "react";
import { twMerge } from "tailwind-merge";

import { FormItem, type FormItemProps } from "../form-item";

export interface SelectOption<T> {
  label: string;
  value: T;
}

export interface SelectProps<T> extends FormItemProps {
  className?: string;
  label?: string;
  helpText?: string;
  error?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  options: Array<SelectOption<T>>;
  value?: T;
  onChange?: (value: T) => void;
}

const sizeMap = {
  sm: twMerge(`py-1`),
  md: twMerge(`py-2`),
  lg: twMerge(`py-2`),
};

export function Select<T extends string>({
  label,
  helpText,
  error,
  disabled = false,
  size = "md",
  className,
  options = [],
  value,
  onChange,
}: SelectProps<T>): ReactElement {
  return (
    <FormItem error={error} helpText={helpText} label={label}>
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button
              className={twMerge(
                "relative w-full cursor-default rounded-md bg-white pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm",
                sizeMap[size],
                disabled && "cursor-not-allowed",
                className
              )}
            >
              <span className="block truncate">
                {
                  (options.find((item) => item.value === value) ?? options?.[0])
                    ?.label
                }
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-400"
                />
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              show={open}
            >
              <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    className={({ active }) =>
                      twMerge(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    key={option.value}
                    value={option.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={twMerge(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {option.label}
                        </span>

                        {selected ? (
                          <span
                            className={twMerge(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon aria-hidden="true" className="h-5 w-5" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </FormItem>
  );
}
