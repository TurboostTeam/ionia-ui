import {
  ChevronDownIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { forEach, isPlainObject, omitBy, transform } from "lodash-es";
import {
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { Button } from "../button";
import { Dropdown } from "../dropdown";
import { Input } from "../input";
import { Popover } from "../popover";
import { Spinner } from "../spinner";
import { type Field } from "../types";

const isEmpty = (value: unknown): boolean => {
  return (
    typeof value === "undefined" ||
    value === "" ||
    (value instanceof Array && value.length === 0)
  );
};

const omitEmpty = (obj: any): any => omitBy(obj, isEmpty);

const formatRenderValue = (obj: any): any => {
  return transform<any, any>(
    obj,
    (result, value, key) => {
      if (isPlainObject(value) || Array.isArray(value)) {
        forEach(formatRenderValue(value), (flattenedValue, flattenedKey) => {
          if (Array.isArray(value)) {
            if (typeof result[key] === "undefined") {
              result[key] = [];
            }
          } else {
            if (typeof result[key] === "undefined") {
              result[key] = {};
            }
          }

          result[key][flattenedKey] =
            flattenedValue instanceof Date
              ? dayjs(flattenedValue).format("YYYY-MM-DD")
              : flattenedValue;
        });
      } else {
        result[key] =
          value instanceof Date ? dayjs(value).format("YYYY-MM-DD") : value;
      }
    },
    {},
  );
};

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
    {},
  );
};

export type FilterTypeValue =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | DateConstructor
  | ArrayConstructor;

export interface FilterItemProps<T> {
  label: string;
  field: Field<T>;
  render: ({
    field: { value, onChange },
  }: {
    field: {
      value: any;
      onChange: (value: any) => void;
    };
  }) => ReactElement;
  renderValue?: (options: {
    label: string;
    field: Field<T>;
    value: any;
  }) => ReactNode;
  pinned?: boolean;
  type?: FilterTypeValue;
  itemType?: FilterTypeValue;
}

export interface FilterSearchConfig {
  querySuffix?: ReactNode;
  queryPrefix?: ReactNode;
  queryPlaceholder?: string;
  disabled?: boolean;
}

export interface FilterProps<T> {
  loading?: boolean;
  filters?: Array<FilterItemProps<T>>;
  extra?: ReactNode;
  search?: false | FilterSearchConfig;
  values?: Record<Field<T>, any> & { query?: string };
  showFilterItems?: boolean;
  onChange?: (value: Record<Field<T>, any> & { query?: string }) => void;
}

export function Filter<T>({
  loading = false,
  filters = [],
  extra,
  search,
  values,
  showFilterItems = true,
  onChange,
}: FilterProps<T>): ReactElement {
  const { control, setValue, watch } = useForm<any>();

  // 将筛选条件分组为固定和非固定两类
  const [{ fixedFilters, unfixedFilters }, setFilterGroups] = useState({
    fixedFilters: filters.filter((item) => item.pinned),
    unfixedFilters: filters.filter((item) => item.pinned !== true),
  });

  const handleChange = useCallback(() => {
    onChange?.(omitEmpty(flattenObject(watch())));
  }, [onChange, watch]);

  // 设置筛选条件固定状态
  const setFilterFieldPinnedStatus = useCallback(
    (field: Field<T>, pinned: boolean) => {
      setFilterGroups((prev) => {
        return {
          ...prev,
          fixedFilters: pinned
            ? [
                ...prev.fixedFilters,
                ...prev.unfixedFilters
                  .filter((item) => item.field === field)
                  .map((item) => ({ ...item, pinned })),
              ]
            : prev.fixedFilters.filter((item) => item.field !== field),
          unfixedFilters: pinned
            ? prev.unfixedFilters.filter((item) => item.field !== field)
            : [
                ...prev.unfixedFilters,
                ...prev.fixedFilters
                  .filter((item) => item.field === field)
                  .map((item) => ({ ...item, pinned })),
              ],
        };
      });
    },
    [],
  );

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
    <div className={twMerge("space-y-3", showFilterItems && "flex-1")}>
      {!(
        (typeof search === "undefined" || search === false) &&
        typeof extra === "undefined"
      ) && (
        <div className="flex items-center gap-2">
          {typeof search !== "undefined" && search !== false && (
            <Controller<{ query: string }>
              control={control}
              name="query"
              render={({ field }) => (
                <Input
                  className="w-full"
                  disabled={field?.disabled ?? search?.disabled}
                  placeholder={search?.queryPlaceholder}
                  prefix={
                    search?.queryPrefix ?? (
                      <MagnifyingGlassIcon className="h-5 w-5" />
                    )
                  }
                  suffix={loading ? <Spinner /> : search?.querySuffix}
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && typeof search !== "undefined") {
                      e.preventDefault();
                      handleChange();
                    }
                  }}
                />
              )}
            />
          )}

          {extra}
        </div>
      )}

      {showFilterItems && filters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {fixedFilters.map(({ field, label, render, renderValue }) => {
            const originalFilter = filters.find((item) => item.field === field);
            const fieldValue = watch(field);

            return (
              <Popover
                activator={
                  <Button
                    rounded
                    classNames={{
                      root: "outline-none",
                    }}
                    size="sm"
                  >
                    <span className="flex items-center gap-1 whitespace-nowrap">
                      {isEmpty(fieldValue) ? (
                        <>
                          <span>{label}</span>

                          <ChevronDownIcon className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          <span>
                            {`${label}: ${String(
                              typeof renderValue !== "undefined"
                                ? renderValue({
                                    field,
                                    label,
                                    value: formatRenderValue({
                                      [field]: fieldValue,
                                    })[field],
                                  })
                                : formatRenderValue({ [field]: fieldValue })[
                                    field
                                  ],
                            )}`}
                          </span>

                          <XMarkIcon
                            className="h-4 w-4"
                            onClick={(event) => {
                              event.stopPropagation();
                              close();
                              setValue(field, undefined as any);

                              // 如果该筛选条件是非原固定筛选条件，则将其移除
                              if (originalFilter?.pinned !== true) {
                                setFilterFieldPinnedStatus(field, false);
                              }

                              handleChange();
                            }}
                          />
                        </>
                      )}
                    </span>
                  </Button>
                }
                config={{
                  defaultOpen: originalFilter?.pinned !== true,
                  onOpenChange: (open) => {
                    // 关闭筛选弹窗的时候如果该筛选条件没有值，则将其移除固定项
                    if (
                      !open &&
                      typeof fieldValue === "undefined" &&
                      originalFilter?.pinned !== true
                    ) {
                      setFilterFieldPinnedStatus(field, false);
                    }
                  },
                }}
                contentConfig={{
                  className: "p-3",
                }}
                key={field}
              >
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
              </Popover>
            );
          })}

          {unfixedFilters.length > 0 && (
            <Dropdown
              activator={
                <Button rounded size="sm">
                  <span className="flex items-center">
                    Add filter
                    <PlusIcon className="h-4 w-4" />
                  </span>
                </Button>
              }
              contentConfig={{
                className: "p-3",
              }}
              sections={[
                {
                  items: unfixedFilters.map(({ field, label }) => ({
                    key: field,
                    content: label,
                    size: "sm",
                    onClick: () => {
                      setFilterFieldPinnedStatus(field, true);

                      /**
                       * 指的是 sections 中点击的当前按钮。
                       * 因为点击 session 按钮后，新的筛选项会出来，但是老的 Popover 没有关闭。
                       * 所以暂时通过 blur 来关闭老的 Popover。
                       **/
                      (document.activeElement as HTMLElement)?.blur();
                    },
                  })),
                },
              ]}
            />
          )}
        </div>
      )}
    </div>
  );
}
