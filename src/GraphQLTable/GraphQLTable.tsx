"use client";

import { Popover, Transition } from "@headlessui/react";
import ArrowsUpDownIcon from "@heroicons/react/24/outline/ArrowsUpDownIcon";
import ChevronLeftIcon from "@heroicons/react/24/outline/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/24/outline/ChevronRightIcon";
import dayjs from "dayjs";
import compact from "lodash-es/compact";
import get from "lodash-es/get";
import omit from "lodash-es/omit";
import pick from "lodash-es/pick";
import trim from "lodash-es/trim";
import {
  Fragment,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import useUpdateEffect from "react-use/esm/useUpdateEffect";

import { Button } from "../Button";
import { EmptyState, type EmptyStateProps } from "../EmptyState";
import { Filter, type FilterItemProps } from "../Filter";
import { RadioGroup, type RadioGroupOption } from "../RadioGroup";
import { Table, type TableColumnProps, type TableProps } from "../Table";
import { type Field } from "../types";
import { OrderDirection } from "./OrderDirection";
import { OrderDirectionList } from "./OrderDirectionList";
import {
  type GraphQLTableEdge,
  type GraphQLTablePageInfo,
  type GraphQLTablePagination,
  type GraphQLTableValue,
} from "./types";

export interface ActionType {
  reloadAndRest: () => void;
}

export interface GraphQLTableProps<Node, OrderField> {
  emptyStateIcon?: EmptyStateProps["icon"];
  emptyStateTitle?: EmptyStateProps["title"];
  emptyStateDescription?: EmptyStateProps["description"];
  actionRef?: RefObject<ActionType>;
  edges?: Array<GraphQLTableEdge<Node>>;
  filters?: Array<FilterItemProps<Node>>;
  search?: { placeholder?: string };
  footer?: ReactNode;
  orderOptions?: Array<RadioGroupOption<OrderField>>;
  columns: Array<TableColumnProps<Node>>;
  pageSize?: number;
  pageInfo?: GraphQLTablePageInfo;
  loading?: boolean;
  value?: GraphQLTableValue<OrderField>;
  defaultFilterValue?: Record<Field<Node>, any>;
  onChange?: (value: GraphQLTableValue<OrderField>) => void;
  onRow?: TableProps<Node>["onRow"];
}

export function GraphQLTable<Node, OrderField extends string>({
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
  onChange,
  onRow,
}: GraphQLTableProps<Node, OrderField>): ReactElement {
  const [filterValues, setFilterValues] = useState<
    Record<Field<Node>, any> | undefined
  >(defaultFilterValue);
  const [pagination, setPagination] = useState<GraphQLTablePagination>(
    pick(value, ["first", "after", "last", "before"])
  );
  const [orderField, setOrderField] = useState(value?.orderBy?.field);
  const [orderDirection, setOrderDirection] = useState(
    value?.orderBy?.direction
  );

  // 一些可以手动触发的特殊操作
  useImperativeHandle(
    actionRef,
    () => ({
      reloadAndRest: () => {
        setPagination((prev) => ({ ...omit(prev, ["before", "after"]) }));
      },
    }),
    []
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
                    return `${filter.field}:${index === 0 ? ">=" : "<="}"${
                      index === 0
                        ? dayjs(item).toISOString()
                        : dayjs(item).endOf("day").toISOString()
                    }"`;
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
        }, "")
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
  }, [query, pagination, pageSize, orderField, orderDirection]);

  return (
    <div className="divide-y divide-gray-300 overflow-x-hidden rounded-md bg-white pt-3 shadow">
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
                    <Popover.Panel className="absolute right-0 z-10 mt-3 w-auto min-w-[160px] transform px-0">
                      <div className="flex flex-col gap-1 divide-y overflow-hidden rounded-md bg-white p-3 shadow-md ring-1 ring-black ring-opacity-5">
                        <RadioGroup
                          options={orderOptions}
                          value={orderField}
                          onChange={(value) => {
                            setPagination({});
                            setOrderField(value);
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
          queryPlaceholder={search?.placeholder}
          values={filterValues}
          onChange={(result) => {
            setFilterValues(result);
            setPagination((prev) => ({ ...omit(prev, ["before", "after"]) }));
          }}
        />
      </div>

      {typeof edges !== "undefined" && edges.length > 0 ? (
        <Table
          columns={columns}
          data={edges.map((edge) => edge.node)}
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
