import { Popover, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import forEach from "lodash-es/forEach";
import isPlainObject from "lodash-es/isPlainObject";
import omitBy from "lodash-es/omitBy";
import transform from "lodash-es/transform";
import {
  Fragment,
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { type ControllerProps } from "react-hook-form/dist/types";

import { Button } from "../button";
import { type Field } from "../common";
import { Input } from "../input";

const isEmpty = (value: unknown): boolean => {
  return (
    typeof value === "undefined" ||
    value === "" ||
    (value instanceof Array && value.length === 0)
  );
};

const omitEmpty = (obj: any): any => omitBy(obj, isEmpty);

const flattenObject = (obj: any): any => {
  return transform<any, any>(
    obj,
    (result, value, key) => {
      if (typeof key === "string" && isPlainObject(value)) {
        const nested = flattenObject(value);
        forEach(nested, (nestedValue, nestedKey) => {
          result[`${key}.${nestedKey}`] = nestedValue;
        });
      } else {
        result[key] = value;
      }
    },
    {}
  );
};

export interface FilterItemProps<T> {
  label: string;
  field: Field<T>;
  render: ControllerProps["render"];
  pinned?: boolean;
}

export interface FilterProps<T> {
  filters?: Array<FilterItemProps<T>>;
  extra?: ReactNode;
  queryPlaceholder?: string;
  values?: Record<Field<T>, any> & { query?: string };
  onChange?: (value: Record<Field<T>, any> & { query?: string }) => void;
}

export function Filter<T>({
  filters = [],
  extra,
  queryPlaceholder,
  values,
  onChange,
}: FilterProps<T>): ReactElement {
  const { control, setValue, watch } = useForm<any>();

  const fixedFilters = useMemo(
    () =>
      filters
        .filter((item) => item.pinned)
        .map((item) => ({
          ...item,
        })),
    [filters]
  );

  const handleChange = useCallback(() => {
    onChange?.(omitEmpty(flattenObject(watch())));
  }, [onChange, watch]);

  useEffect(() => {
    const oldValues = watch();

    if (typeof values !== "undefined") {
      for (const key in values) {
        if ((values as any)[key] !== oldValues[key]) {
          setValue(key, (values as any)[key]);
        }
      }
    }
  }, [values, setValue, watch]);

  return (
    <div>
      <div className="flex gap-2">
        <Controller<{ query: string }>
          control={control}
          name="query"
          render={({ field }) => (
            <Input
              className="flex-1"
              placeholder={queryPlaceholder}
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                handleChange();
              }}
            />
          )}
        />

        {extra}
      </div>

      <div className="mt-2 flex gap-1">
        {fixedFilters.map(({ field, label, render }) => {
          const fieldValue = watch(field);

          return (
            <Popover className="relative" key={field}>
              {({ close }) => (
                <>
                  <Button
                    rounded
                    as={Popover.Button}
                    className="pr-2"
                    size="sm"
                  >
                    <span className="flex items-center">
                      {isEmpty(fieldValue) ? (
                        <>
                          {label}
                          <ChevronDownIcon className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          {`${label}: ${String(fieldValue)}`}
                          <XMarkIcon
                            className="h-4 w-4"
                            onClick={(event) => {
                              event.stopPropagation();
                              close();
                              setValue(field, undefined as any);
                              handleChange();
                            }}
                          />
                        </>
                      )}
                    </span>
                  </Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-[240px] transform px-0">
                      <div className="overflow-hidden rounded-md bg-white p-3 shadow-md ring-1 ring-black ring-opacity-5">
                        <Controller
                          control={control}
                          name={field}
                          render={(renderProps) =>
                            render({
                              ...renderProps,
                              field: {
                                ...renderProps.field,
                                onChange: (value) => {
                                  renderProps.field.onChange(value);
                                  handleChange();
                                },
                              },
                            })
                          }
                        />
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          );
        })}

        {filters?.length > fixedFilters.length && (
          <Button rounded className="bg-gray-50 text-gray-600" size="sm">
            <span className="flex items-center">
              添加筛选条件
              <PlusIcon className="h-4 w-4" />
            </span>
          </Button>
        )}
      </div>
    </div>
  );
}
