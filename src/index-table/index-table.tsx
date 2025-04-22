"use client";

import {
  ArrowsUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import {
  compact,
  get,
  isEmpty,
  isEqual,
  isNil,
  omit,
  omitBy,
  pick,
  trim,
} from "lodash-es";
import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsString,
  type ParserBuilder,
  useQueryStates,
} from "nuqs";
import {
  type ReactElement,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { type ActionProps } from "../action";
import { Button } from "../button";
import { ButtonGroup } from "../button-group";
import { EmptyState, type EmptyStateProps } from "../empty-state";
import {
  Filter,
  type FilterItemProps,
  type FilterSearchConfig,
  type FilterTypeValue,
} from "../filter";
import { Input } from "../input";
import { useModal } from "../modal";
import { Popover } from "../popover";
import { RadioGroup, type RadioGroupOption } from "../radio-group";
import { Spinner } from "../spinner";
import {
  Table,
  type TableActionType,
  type TableColumnProps,
  type TableProps,
} from "../table";
import { Tooltip } from "../tooltip";
import { type Field } from "../types";
import { View, type ViewProps } from "../view";
import { OrderDirection } from "./order-direction";
import { OrderDirectionList } from "./order-direction-list";
import {
  type IndexTableEdge,
  type IndexTablePageInfo,
  type IndexTablePagination,
  type IndexTableValue,
} from "./types";

const getFilterFiledTypeParse = (
  type: FilterTypeValue,
  itemType?: FilterTypeValue,
): ParserBuilder<any> => {
  switch (type) {
    case String:
      return parseAsString;
    case Number:
      return parseAsInteger;
    case Boolean:
      return parseAsBoolean;
    case Date:
      return parseAsIsoDateTime;
    case Array:
      return parseAsArrayOf(
        typeof itemType === "undefined"
          ? parseAsString
          : itemType === Date
          ? (parseAsIsoDateTime as unknown as ParserBuilder<string>)
          : getFilterFiledTypeParse(itemType),
      );
    default:
      return parseAsString;
  }
};

export interface SaveViewConfig {
  filters?: Record<string, any>;
  query?: string;
}

export interface ActionType {
  reloadAndRest: () => void;
  setFilterValues: (
    filterValues: Record<string, any>,
    syncToUrl?: boolean,
  ) => void;
}

export interface IndexTableProps<Node, OrderField> {
  emptyStateIcon?: EmptyStateProps["icon"];
  emptyStateTitle?: EmptyStateProps["title"];
  rowSelection?: {
    single?: boolean;
    allowSelectAll?: boolean;
    onSelectionChange?: (rows: Node[]) => void;
    bulkActions?: (rows: Node[], isSelectedAll: boolean) => ActionProps[];
  };
  bodyHeight?: {
    max?: number;
    min?: number;
  };
  emptyStateDescription?: EmptyStateProps["description"];
  actionRef?: RefObject<ActionType>;
  edges?: Array<IndexTableEdge<Node>>;
  filters?: Array<FilterItemProps<Node>>;
  search?: false | FilterSearchConfig;
  footer?: ReactNode;
  orderOptions?: RadioGroupOption[];
  columns: Array<TableColumnProps<Node>>;
  pageSize?: number;
  pageInfo?: IndexTablePageInfo;
  loading?: boolean;
  value?: IndexTableValue<OrderField>;
  defaultFilterValue?: Record<Field<Node>, any>;
  viewConfig?: ViewProps & {
    saveLoading?: boolean;
    onSave?: (viewKey: string, config: SaveViewConfig) => void;
  };
  toolBarRender?: () => ReactNode;
  onChange?: (value: IndexTableValue<OrderField>) => void;
  onRow?: TableProps<Node>["onRow"];
}

export function IndexTable<Node, OrderField extends string>({
  emptyStateIcon,
  emptyStateTitle,
  actionRef,
  emptyStateDescription,
  defaultFilterValue,
  footer,
  filters = [],
  columns = [],
  search,
  bodyHeight,
  edges,
  orderOptions,
  pageSize = 10,
  pageInfo,
  loading = false,
  value = {},
  rowSelection,
  viewConfig,
  toolBarRender,
  onChange,
  onRow,
}: IndexTableProps<Node, OrderField>): ReactElement {
  const modal = useModal();
  const { control, getValues, trigger, setValue } = useForm();

  // 在视图模式下，是否显示过滤组件
  const [showFilterComponent, setShowFilterComponent] = useState(false);

  // 当前进行过滤操作时选中的视图 key
  const currentSelectedViewKeyRef = useRef<string | undefined>();

  const [filterValues, setFilterValues] = useState<
    Record<Field<Node>, any> | undefined
  >(defaultFilterValue);

  /* eslint-disable @typescript-eslint/restrict-template-expressions */
  const query = useMemo(() => {
    return compact([
      trim((filterValues as any)?.query),
      trim(
        filters.reduce((result, filter) => {
          const filterValue: any = get(filterValues ?? {}, filter.field);

          if (typeof filterValue !== "undefined") {
            if (typeof filterValue === "string") {
              return `${result} ${filter.field}:"${filterValue}"`;
            }

            if (filterValue instanceof Array) {
              if (filterValue.length === 0) {
                return result;
              }

              if (
                filterValue[0] instanceof Date &&
                filterValue[1] instanceof Date
              ) {
                return `${result} (${filterValue
                  .map((item: Date, index) => {
                    return `${filter.field}:${index === 0 ? ">=" : "<="}${
                      index === 0
                        ? dayjs(item).toISOString()
                        : dayjs(item).endOf("day").toISOString()
                    }`;
                  })
                  .join(" ")})`;
              }

              return `${result} (${filterValue
                .map((item) => {
                  if (typeof item === "string") {
                    return `${filter.field}:"${item}"`;
                  }

                  return `${filter.field}:"${item}"`;
                })
                .join(" OR ")})`;
            }

            return `${result} ${filter.field}: ${
              filterValue instanceof Date
                ? filterValue.toISOString()
                : filterValue
            }`;
          }

          return result;
        }, ""),
      ),
    ])
      .map((item) => `(${item})`)
      .join(" ");
  }, [filterValues, filters]);

  const [pagination, setPagination] = useState<IndexTablePagination>(
    pick(value, ["first", "after", "last", "before"]),
  );

  const [orderField, setOrderField] = useState(value?.orderBy?.field);
  const [orderDirection, setOrderDirection] = useState(
    value?.orderBy?.direction,
  );

  // 是否启用视图
  const enabledView = useMemo(
    () => Boolean(viewConfig?.items?.length),
    [viewConfig],
  );

  const [urlQueryStates, setUrlQueryStates] = useQueryStates({
    query: parseAsString,
    selectedView: parseAsString,
    ...filters.reduce<Record<string, ParserBuilder<any>>>(
      (result, currentFilter) => {
        result[currentFilter.field] =
          typeof currentFilter?.type === "undefined"
            ? parseAsString
            : getFilterFiledTypeParse(
                currentFilter.type,
                currentFilter.itemType,
              );

        return result;
      },
      {},
    ),
  });

  // nuqs 包对监听的属性值默认设置为 null（无论是否存在于 url 上），所以需要过滤掉 null 和 undefined 的 url 查询参数，供过滤组件使用
  const usefulQueryStates = useMemo(() => {
    return omitBy(urlQueryStates, isNil);
  }, [urlQueryStates]);

  /**
   * 之所以不使用 setUrlQueryStates(null) 清除所有 url 参数是因为会触发一次状态更新
   * setUrlQueryStates 不支持直接覆盖所有 url 参数，所以需要手动清除
   * 后面设置 url 参数的时候选择 replace 这条路由记录，保持路由堆栈的正确
   */
  const clearUrlQueryStates = useCallback(() => {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", window.location.pathname);
    }
  }, []);

  const tableActionRef = useRef<TableActionType>(null);

  // 一些可以手动触发的特殊操作
  useImperativeHandle(
    actionRef,
    () => ({
      reloadAndRest: () => {
        setPagination({});
      },
      setFilterValues: async (
        filterValues: Record<Field<Node>, any>,
        syncToUrl = false,
      ) => {
        if (syncToUrl) {
          clearUrlQueryStates();
          await setUrlQueryStates(filterValues);
        } else {
          setFilterValues(filterValues);
        }
        setPagination({});
      },
    }),
    [clearUrlQueryStates, setUrlQueryStates, setPagination],
  );

  const handlePrevClick = useCallback(() => {
    setPagination({ last: pageSize, before: pageInfo?.startCursor });
  }, [pageSize, pageInfo?.startCursor]);

  const handleNextClick = useCallback(() => {
    setPagination({ first: pageSize, after: pageInfo?.endCursor });
  }, [pageSize, pageInfo?.endCursor]);

  // 处理视图保存
  const handleViewSave = useCallback(async () => {
    const config: SaveViewConfig = {};

    const omitQueryFilters = omit(filterValues, "query");

    if (typeof (filterValues as Record<string, any>)?.query !== "undefined") {
      config.query = (filterValues as Record<string, any>).query;
    }

    if (typeof omitQueryFilters !== "undefined" && !isEmpty(omitQueryFilters)) {
      config.filters = omitQueryFilters;
    }

    const generateNewView = (): void => {
      const viewNameInputMarker = "new_view_name";

      const close = modal({
        title: "Create new View",
        content: (
          <Controller
            control={control}
            name={viewNameInputMarker}
            render={({ field, fieldState: { error } }) => (
              <Input
                label="Name"
                maxLength={40}
                {...field}
                error={error?.message}
                onChange={(e) => {
                  field.onChange(e);

                  // 如果存在错误，输入的时候触发验证
                  if (typeof error !== "undefined") {
                    trigger(viewNameInputMarker).catch(() => {});
                  }
                }}
              />
            )}
            rules={{
              required: "view name is required",
            }}
          />
        ),
        primaryAction: {
          content: "Save",
          onClick: async () => {
            const validatedPass = await trigger(viewNameInputMarker);

            if (validatedPass) {
              clearUrlQueryStates();

              // eslint-disable-next-line @typescript-eslint/await-thenable
              await viewConfig?.onAdd?.(getValues(viewNameInputMarker), config);

              setValue(viewNameInputMarker, undefined);

              setShowFilterComponent(false);
              currentSelectedViewKeyRef.current = undefined;

              close();
            }
          },
        },
      });
    };

    if (typeof currentSelectedViewKeyRef.current !== "undefined") {
      if (
        typeof viewConfig !== "undefined" &&
        typeof viewConfig.items.find(
          (item) =>
            item.key === currentSelectedViewKeyRef.current &&
            item.canEdit !== false,
        ) !== "undefined"
      ) {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await viewConfig?.onSave?.(currentSelectedViewKeyRef.current, config);

        currentSelectedViewKeyRef.current = undefined;
      } else {
        generateNewView();
      }
    } else {
      generateNewView();
    }
  }, [
    filterValues,
    modal,
    control,
    trigger,
    clearUrlQueryStates,
    viewConfig,
    getValues,
    setValue,
  ]);

  // 处理 url 参数
  const transformedParams = useMemo(() => {
    // 如果启用视图，并且 url 不存在 selectedView 参数，则将 url 参数转换为对应的类型
    if (enabledView && typeof usefulQueryStates?.selectedView === "undefined") {
      return usefulQueryStates;
    }

    return filterValues;
  }, [enabledView, usefulQueryStates, filterValues]);

  // 当启用视图并且 searchParams 发生变化的时候，更新 filterValues
  useEffect(() => {
    if (!isEqual(transformedParams, filterValues)) {
      setFilterValues(transformedParams as any);
      setPagination({});
    }
  }, [filterValues, transformedParams]);

  // 如果 url 不存在 selectedView 参数，则根据过滤项和查询条件来决定是否显示过滤组件
  useEffect(() => {
    if (enabledView && typeof usefulQueryStates?.selectedView === "undefined") {
      if (
        filters.some(
          (item) => typeof usefulQueryStates?.[item.field] !== "undefined",
        ) ||
        typeof usefulQueryStates?.query !== "undefined"
      ) {
        if (!showFilterComponent) {
          setShowFilterComponent(true);
        }
      } else {
        // 没有符合的过滤项，则将视图参数设置为第一个视图
        clearUrlQueryStates();
        setUrlQueryStates({
          selectedView: viewConfig?.items[0].key,
        }).catch(() => {});
      }
    }
  }, [
    enabledView,
    filters,
    usefulQueryStates,
    viewConfig,
    showFilterComponent,
    clearUrlQueryStates,
    setUrlQueryStates,
  ]);

  // 当视图参数存在，但是视图参数不包含在配置项里面时，则将视图参数设置为第一个视图
  useEffect(() => {
    if (enabledView && typeof usefulQueryStates?.selectedView !== "undefined") {
      if (
        typeof viewConfig !== "undefined" &&
        !viewConfig.items.some(
          (item) => item.key === usefulQueryStates.selectedView,
        )
      ) {
        clearUrlQueryStates();
        setUrlQueryStates({
          selectedView: viewConfig.items[0].key,
        }).catch(() => {});
      } else if (typeof currentSelectedViewKeyRef.current === "undefined") {
        setShowFilterComponent(false);
      }
    }
  }, [
    enabledView,
    viewConfig,
    usefulQueryStates,
    clearUrlQueryStates,
    setUrlQueryStates,
  ]);

  useEffect(() => {
    onChange?.({
      query,
      ...(Object.keys(pagination).length > 0
        ? pagination
        : { first: pageSize }),
      ...(typeof orderField !== "undefined"
        ? {
            orderBy: {
              field: orderField,
              direction: orderDirection ?? OrderDirection.ASC,
            },
          }
        : {}),
    });

    tableActionRef.current?.resetRowSelection?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, pagination, pageSize, orderField, orderDirection, tableActionRef]);

  return (
    <div className="divide-y divide-gray-300 rounded-md bg-surface pt-3 shadow last-of-type:rounded-lg">
      <div>
        {typeof toolBarRender !== "undefined" && (
          <div className="px-3 pb-3">{toolBarRender()}</div>
        )}

        <div className="flex items-center px-3 pb-3">
          {enabledView && !showFilterComponent && (
            <div className="mr-2 flex-1 overflow-x-auto">
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
              <View {...viewConfig!} />
            </div>
          )}

          <Filter<Node>
            extra={
              <>
                {enabledView ? (
                  showFilterComponent ? (
                    <ButtonGroup>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          if (
                            (typeof currentSelectedViewKeyRef.current ===
                              "undefined" &&
                              typeof usefulQueryStates?.selectedView ===
                                "undefined") ||
                            currentSelectedViewKeyRef.current !==
                              usefulQueryStates?.selectedView
                          ) {
                            clearUrlQueryStates();
                            void setUrlQueryStates({
                              selectedView:
                                typeof currentSelectedViewKeyRef.current !==
                                "undefined"
                                  ? currentSelectedViewKeyRef.current
                                  : viewConfig?.items[0].key,
                            }).then(() => {
                              setShowFilterComponent(false);
                              currentSelectedViewKeyRef.current = undefined;
                            });
                          } else {
                            setFilterValues(
                              typeof filterValues === "undefined"
                                ? undefined
                                : { ...filterValues },
                            );
                            setShowFilterComponent(false);
                            currentSelectedViewKeyRef.current = undefined;
                          }
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        classNames={{
                          root: "[&>span>span]:flex-shrink-0",
                        }}
                        disabled={
                          typeof usefulQueryStates?.selectedView !== "undefined"
                        }
                        loading={viewConfig?.saveLoading}
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          void handleViewSave();
                        }}
                      >
                        Save
                      </Button>
                    </ButtonGroup>
                  ) : (
                    <Tooltip content="Search and filter">
                      <Button
                        classNames={{ root: "p-2" }}
                        icon={FunnelIcon}
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setShowFilterComponent(true);
                          currentSelectedViewKeyRef.current =
                            urlQueryStates?.selectedView ?? undefined;
                        }}
                      />
                    </Tooltip>
                  )
                ) : undefined}

                {typeof orderOptions !== "undefined" &&
                orderOptions.length > 0 ? (
                  <Popover
                    activator={
                      <div>
                        <Tooltip content="Sort">
                          <Button
                            classNames={{ root: "p-2" }}
                            icon={ArrowsUpDownIcon}
                            size="sm"
                            variant="ghost"
                          />
                        </Tooltip>
                      </div>
                    }
                    contentConfig={{
                      className: "p-2",
                    }}
                  >
                    <RadioGroup
                      options={orderOptions}
                      value={orderField}
                      onChange={(value) => {
                        setPagination({});
                        setOrderField(value as OrderField);
                      }}
                    />
                    <OrderDirectionList
                      value={orderDirection}
                      onChange={(value) => {
                        setPagination({});
                        setOrderDirection(value);
                      }}
                    />
                  </Popover>
                ) : undefined}
              </>
            }
            filters={filters}
            loading={loading}
            search={
              !enabledView || (enabledView && showFilterComponent)
                ? search
                : false
            }
            showFilterItems={
              !enabledView || (enabledView && showFilterComponent)
            }
            values={filterValues}
            onChange={(result) => {
              // 根据是否开启视图来决定如何更新过滤项
              if (enabledView) {
                if (!isEqual(result, filterValues)) {
                  clearUrlQueryStates();
                  void setUrlQueryStates(isEmpty(result) ? null : result);
                }
              } else {
                setFilterValues(result);
                setPagination({});
              }
            }}
          />
        </div>
      </div>

      <div className={twMerge("relative", loading && "pointer-events-none")}>
        {typeof edges !== "undefined" && edges.length > 0 ? (
          <Table
            bodyHeight={bodyHeight}
            columns={columns}
            data={edges.map((edge) => edge.node)}
            rowSelection={rowSelection}
            tableActionRef={tableActionRef}
            onRow={onRow}
          />
        ) : (
          <EmptyState
            className="py-10"
            description={emptyStateDescription}
            icon={emptyStateIcon}
            title={emptyStateTitle}
          />
        )}

        {loading && (
          <>
            <div className="absolute left-0 top-0 z-[2] h-full w-full bg-surface opacity-50" />
            <Spinner className="absolute bottom-0 left-0 right-0 top-0 z-10 m-auto" />
          </>
        )}
      </div>

      {footer !== undefined && <div>{footer}</div>}

      {(pageInfo?.hasPreviousPage === true ||
        pageInfo?.hasNextPage === true) && (
        <div className="flex justify-center gap-2 p-5">
          <Button
            classNames={{ root: "p-2" }}
            disabled={!pageInfo?.hasPreviousPage || loading}
            icon={ChevronLeftIcon}
            variant="ghost"
            onClick={handlePrevClick}
          />

          <Button
            classNames={{ root: "p-2" }}
            disabled={!pageInfo?.hasNextPage || loading}
            icon={ChevronRightIcon}
            variant="ghost"
            onClick={handleNextClick}
          />
        </div>
      )}
    </div>
  );
}
