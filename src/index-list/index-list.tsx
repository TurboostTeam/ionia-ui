import {
  ArrowsUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { compact, get, isEmpty, isEqual, omit, pick, trim } from "lodash-es";
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

import { type ActionProps } from "../action";
import { Button } from "../button";
import { ButtonGroup } from "../button-group";
import { EmptyState, type EmptyStateProps } from "../empty-state";
import {
  Filter,
  type FilterItemProps,
  type FilterSearchConfig,
} from "../filter";
import { useUrlSearchParams } from "../hooks";
import { type ActionType, type SaveViewConfig } from "../index-table";
import { OrderDirection } from "../index-table/order-direction";
import { OrderDirectionList } from "../index-table/order-direction-list";
import { Popover } from "../popover";
import { RadioGroup, type RadioGroupOption } from "../radio-group";
import {
  type TableActionType,
  type TableColumnProps,
  type TableProps,
} from "../table";
import { Tooltip } from "../tooltip";
import { type Field } from "../types";
import { transformTypeValue } from "../utils";
import { View, type ViewProps } from "../view";
import { ListTable } from "./list-table";
import {
  type IndexTableEdge,
  type IndexTablePageInfo,
  type IndexTablePagination,
  type IndexTableValue,
} from "./types";

export interface IndexListProps<Node, OrderField> {
  emptyStateIcon?: EmptyStateProps["icon"];
  emptyStateTitle?: EmptyStateProps["title"];
  rowSelection?: {
    single?: boolean;
    allowSelectAll?: boolean;
    onSelectionChange?: (rows: Node[]) => void;
    bulkActions?: (rows: Node[], isSelectedAll: boolean) => ActionProps[];
  };
  emptyStateDescription?: EmptyStateProps["description"];
  actionRef?: RefObject<ActionType<Node>>;
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
    onSaveView?: (config: SaveViewConfig<OrderField>) => void;
  };
  toolBarRender?: () => ReactNode;
  onChange?: (value: IndexTableValue<OrderField>) => void;
  onRow?: TableProps<Node>["onRow"];
}

export function IndexList<Node, OrderField extends string>({
  emptyStateIcon,
  emptyStateTitle,
  actionRef,
  emptyStateDescription,
  defaultFilterValue,
  footer,
  filters = [],
  columns = [],
  search,
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
}: IndexListProps<Node, OrderField>): ReactElement {
  // 在视图模式下，是否显示过滤组件
  const [showFilterComponent, setShowFilterComponent] = useState(false);
  const [filterValues, setFilterValues] = useState<
    Record<Field<Node>, any> | undefined
  >(defaultFilterValue);

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

  const [searchParams, setSearchParams] = useUrlSearchParams();

  const reloadAndRest = useCallback(() => {
    setPagination((prev) => (isEqual(prev, {}) ? prev : {}));
  }, []);

  const tableActionRef = useRef<TableActionType>(null);

  // 一些可以手动触发的特殊操作
  useImperativeHandle(
    actionRef,
    () => ({
      reloadAndRest,
      setFilterValues: (filterValues: Record<Field<Node>, any>) => {
        enabledView
          ? setSearchParams(filterValues)
          : setFilterValues(filterValues);
      },
    }),
    [enabledView, reloadAndRest, setFilterValues, setSearchParams],
  );

  /* eslint-disable @typescript-eslint/restrict-template-expressions */
  const query = useMemo(() => {
    return compact([
      trim((filterValues as any)?.query),
      trim(
        filters.reduce((result, filter) => {
          const filterValue: any = get(filterValues ?? {}, filter.field);

          if (typeof filterValue !== "undefined") {
            if (typeof filterValue === "string") {
              return `${result} ${filter.field}: "${filterValue}"`;
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
                    return `${filter.field}: "${item}"`;
                  }

                  return `${filter.field}: "${item}"`;
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

  const handlePrevClick = useCallback(() => {
    setPagination({ last: pageSize, before: pageInfo?.startCursor });
  }, [pageSize, pageInfo?.startCursor]);

  const handleNextClick = useCallback(() => {
    setPagination({ first: pageSize, after: pageInfo?.endCursor });
  }, [pageSize, pageInfo?.endCursor]);

  // 处理视图保存
  const handleViewSave = useCallback(() => {
    const config: SaveViewConfig<OrderField> = {};

    const omitQueryFilter = omit(filterValues, "query");

    if (typeof (filterValues as Record<string, any>)?.query !== "undefined") {
      config.query = (filterValues as Record<string, any>).query;
    }

    if (typeof omitQueryFilter !== "undefined" && !isEmpty(omitQueryFilter)) {
      config.filter = omitQueryFilter as any;
    }

    if (
      typeof orderField !== "undefined" &&
      typeof orderDirection !== "undefined"
    ) {
      config.order = {
        field: orderField,
        direction: orderDirection,
      };
    }

    viewConfig?.onSaveView?.(config);
  }, [viewConfig, filterValues, orderDirection, orderField]);

  // 处理 url 参数
  const transformedParams = useMemo(() => {
    // 如果启用视图，并且 url 参数存在，则将 url 参数转换为对应的类型
    if (
      enabledView &&
      typeof searchParams !== "undefined" &&
      !isEmpty(searchParams)
    ) {
      const result = { ...searchParams };

      filters.forEach((filterItem) => {
        const { field, type, itemType } = filterItem;

        if (field in result && type != null) {
          result[field] = transformTypeValue(result[field], type, itemType);
        }
      });

      return result;
    } else {
      return filterValues;
    }
  }, [enabledView, searchParams, filters, filterValues]);

  // 当启用视图并且 searchParams 发生变化的时候，更新 filterValues
  useEffect(() => {
    if (!isEqual(transformedParams, filterValues)) {
      setFilterValues(transformedParams as any);
    }
  }, [filterValues, transformedParams]);

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
    <div className="divide-y divide-gray-300 rounded-md bg-white pt-3 shadow">
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
                          setShowFilterComponent(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        classNames={{
                          root: "[&>span>span]:flex-shrink-0",
                        }}
                        size="sm"
                        variant="ghost"
                        onClick={handleViewSave}
                      >
                        Save as
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
                        reloadAndRest();
                        setOrderField(value as OrderField);
                      }}
                    />
                    <OrderDirectionList
                      value={orderDirection}
                      onChange={(value) => {
                        reloadAndRest();
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
              reloadAndRest();

              // 根据是否开启视图来决定如何更新过滤项
              enabledView ? setSearchParams(result) : setFilterValues(result);
            }}
          />
        </div>
      </div>

      {typeof edges !== "undefined" && edges.length > 0 ? (
        <ListTable
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

      {footer}

      {(pageInfo?.hasPreviousPage === true ||
        pageInfo?.hasNextPage === true) && (
        <div className="flex justify-center gap-2 p-5">
          <Button
            className="p-2"
            disabled={!pageInfo?.hasPreviousPage}
            onClick={handlePrevClick}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>
          <Button
            className="p-2"
            disabled={!pageInfo?.hasNextPage}
            onClick={handleNextClick}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
