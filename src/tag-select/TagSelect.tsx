import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import pick from "lodash-es/pick";
import uniqBy from "lodash-es/uniqBy";
import { Fragment, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Badge } from "../badge";
import { forwardRef } from "../common";
import { FormItem, type FormItemProps } from "../form-item";
import { Input } from "../input";
import { Spinner } from "../spinner";

export interface SelectOption<T> {
  label: string;
  value: T;
}

export interface TagSelectProps<T> extends FormItemProps {
  className?: string;
  mode: "tag" | "multiple";
  label?: string;
  helpText?: string;
  error?: string;
  loading?: boolean;
  onSearch?: (value: string) => void;
  disabled?: boolean;
  options: Array<SelectOption<T>>;
  value?: T[];
  onChange?: (value: T[]) => void;
}

export const TagSelect = forwardRef<TagSelectProps<string>, "input">(
  (
    {
      className,
      mode,
      label,
      helpText,
      error,
      loading = false,
      disabled,
      options,
      value = [],
      onSearch,
      onChange,
      ...props
    },
    ref
  ) => {
    const [searchValue, setSearchValue] = useState<string>();

    const uniqInternalOptions = useMemo(() => {
      const result = uniqBy(
        options.concat(
          value
            .filter(
              (val) => options.findIndex((item) => item.value === val) === -1
            )
            .map((item) => ({ value: item, label: item }))
        ),
        "value"
      ).filter((item) => {
        if (typeof searchValue !== "undefined" && searchValue.length > 0) {
          return item.value.includes(searchValue);
        } else {
          return item;
        }
      });

      // tag 模式下
      if (
        mode === "tag" &&
        typeof searchValue !== "undefined" &&
        searchValue.length > 0 &&
        result.findIndex((item) => item.value === searchValue) === -1
      ) {
        result.unshift({ value: searchValue, label: searchValue });
      }

      return result;
    }, [options, searchValue, mode, value]);

    return (
      <div>
        <FormItem helpText={helpText} label={label}>
          <Combobox
            multiple
            disabled={disabled}
            value={value}
            onChange={(val) => {
              onChange?.(val);

              if (uniqInternalOptions.length > 0) {
                setSearchValue(undefined);
              }
            }}
          >
            <div className="relative mt-1">
              <Combobox.Input
                as={Input}
                className={className}
                error={error}
                ref={ref}
                value={searchValue}
                onChange={(val) => {
                  setSearchValue(val as unknown as string);
                  onSearch?.(val as unknown as string);
                }}
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    const trimValue = searchValue?.trim();

                    if (
                      typeof trimValue !== "undefined" &&
                      trimValue.length > 0
                    ) {
                      if (mode === "tag") {
                        if (!value.includes(trimValue)) {
                          onChange?.([...value, trimValue]);
                        }
                        setSearchValue(undefined);
                      }
                    }

                    if (
                      mode === "multiple" &&
                      uniqInternalOptions.length === 0
                    ) {
                      e.preventDefault();
                    }
                  }
                }}
                {...pick(props, ["placeholder", "maxLength", "minLength"])}
              />

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {loading ? (
                    <div className="flex items-center justify-center py-2">
                      <Spinner />
                    </div>
                  ) : uniqInternalOptions.length === 0 && searchValue !== "" ? (
                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    uniqInternalOptions.map((item) => (
                      <Combobox.Option
                        className={({ active }) =>
                          twMerge(
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        key={item.value}
                        value={item.value}
                      >
                        {({ selected, active }) => (
                          <>
                            <span className={twMerge("block truncate text-sm")}>
                              {item.label}
                            </span>

                            {selected ? (
                              <span
                                className={twMerge(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  aria-hidden="true"
                                  className="h-5 w-5"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </FormItem>

        {typeof mode !== "undefined" && value.length > 0 && (
          <div className="space-x-2">
            {value.map((val) => (
              <span className="mt-2 inline-block" key={val}>
                <Badge
                  disabled={disabled}
                  onRemove={() => {
                    onChange?.(value.filter((val2) => val2 !== val));
                  }}
                >
                  {/* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */}
                  {uniqInternalOptions.find((item) => item.value === val)
                    ?.label ?? val}
                </Badge>
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
);
