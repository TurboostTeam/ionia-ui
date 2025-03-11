"use client";

import { Popover, Transition } from "@headlessui/react";
import {
  ArrowsUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { compact, get, omit, pick, trim } from "lodash-es";
import {
  Fragment,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useUpdateEffect } from "react-use";
import { twMerge } from "tailwind-merge";

import { type ActionProps } from "../action";
import { Button } from "../button";
import { EmptyState, type EmptyStateProps } from "../empty-state";
import {
  Filter,
  type FilterItemProps,
  type FilterSearchConfig,
} from "../filter";
import { RadioGroup, type RadioGroupOption } from "../radio-group";
import { Spinner } from "../spinner";
import {
  Table,
  type TableActionType,
  type TableColumnProps,
  type TableProps,
} from "../table";
import { type Field } from "../types";
import { OrderDirection } from "./order-direction";
import { OrderDirectionList } from "./order-direction-list";
import {
  type IndexTableEdge,
  type IndexTablePageInfo,
  type IndexTablePagination,
  type IndexTableValue,
} from "./types";

export interface ActionType {
  reloadAndRest: () => void;
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
  toolBarRender,
  onChange,
  onRow,
}: IndexTableProps<Node, OrderField>): ReactElement {
  console.log(111, filters);

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

  const tableActionRef = useRef<TableActionType>(null);

  // 一些可以手动触发的特殊操作
  useImperativeHandle(
    actionRef,
    () => ({
      reloadAndRest: () => {
        setPagination((prev) => ({ ...omit(prev, ["before", "after"]) }));
      },
    }),
    [],
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

  const handlePrevClick = useCallback(() => {
    setPagination({ last: pageSize, before: pageInfo?.startCursor });
  }, [pageSize, pageInfo?.startCursor]);

  const handleNextClick = useCallback(() => {
    setPagination({ first: pageSize, after: pageInfo?.endCursor });
  }, [pageSize, pageInfo?.endCursor]);

  useUpdateEffect(() => {
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
  }, [query, pagination, pageSize, orderField, orderDirection, tableActionRef]);

  return (
    <div className="divide-y divide-gray-300 rounded-md bg-surface pt-3 shadow last-of-type:rounded-lg">
      <div>
        {typeof toolBarRender !== "undefined" && (
          <div className="px-3 pb-3">{toolBarRender()}</div>
        )}

        <div className="w-full px-3 pb-3">
          <Filter<Node>
            extra={
              typeof orderOptions !== "undefined" && orderOptions.length > 0 ? (
                <Popover className="relative">
                  <>
                    <Button as={Popover.Button} className="p-2">
                      <ArrowsUpDownIcon className="h-5 w-5" />
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
                      <Popover.Panel className="absolute right-0 z-[1010] mt-3 w-auto min-w-[160px] transform px-0">
                        <div className="flex flex-col gap-1 divide-y overflow-hidden rounded-md bg-surface p-3 shadow-md ring-1 ring-black ring-opacity-5">
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
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                </Popover>
              ) : undefined
            }
            filters={filters}
            loading={loading}
            search={search}
            values={filterValues}
            onChange={(result) => {
              setFilterValues(result);
              setPagination((prev) => ({ ...omit(prev, ["before", "after"]) }));
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
            variant="ghost"
            onClick={handlePrevClick}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>

          <Button
            classNames={{ root: "p-2" }}
            disabled={!pageInfo?.hasNextPage || loading}
            variant="ghost"
            onClick={handleNextClick}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
