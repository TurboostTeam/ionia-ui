import { Popover, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { omitBy } from "lodash";
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
import { Input } from "../input";

const isEmpty = (value: unknown): boolean => {
  return (
    typeof value === "undefined" ||
    value === "" ||
    (value instanceof Array && value.length === 0)
  );
};

const omitEmpty = (obj: any): any => omitBy(obj, isEmpty);

export type FilterValue = string | number | boolean | string[];

export type FilterObject = { query?: string } & Partial<
  Record<string, FilterValue>
>;

export interface FilterItemProps {
  label: string;
  field: string;
  render: ControllerProps["render"];
  pinned?: boolean;
}

export interface FilterProps<T extends FilterObject> {
  filters?: FilterItemProps[];
  extra?: ReactNode;
  queryPlaceholder?: string;
  values?: T;
  onChange?: (value: T) => void;
}

export function Filter<T extends FilterObject>({
  filters = [],
  extra,
  queryPlaceholder,
  values,
  onChange,
}: FilterProps<T>): ReactElement {
  const { control, setValue, resetField, watch } = useForm<any>({});

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
    onChange?.(omitEmpty(watch()));
  }, [onChange, watch]);

  useEffect(() => {
    const oldValues = watch();

    if (typeof values !== "undefined") {
      for (const key in values) {
        if (values[key] !== oldValues[key]) {
          setValue(key, values[key] as any);
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
              value={field.value ?? ""}
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
                  <Button rounded as={Popover.Button} size="sm">
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
                              resetField(field);
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
                      <div className="overflow-hidden rounded-md p-2 shadow-md ring-1 ring-black ring-opacity-5">
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
