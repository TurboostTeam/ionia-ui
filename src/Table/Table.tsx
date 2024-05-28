import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  type AccessorKeyColumnDef,
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import { cloneDeep, groupBy, reduce, sum } from "lodash";
import {
  type ReactElement,
  type RefObject,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

import { Action, type ActionProps } from "../Action";
import { Checkbox } from "../Checkbox";
import { Radio } from "../Radio";
import { Spinner } from "../Spinner";
import { DraggableRow } from "./components/DraggableRow";
import { RowDragHandleCell } from "./components/RowDragHandleCell";

const columnAlignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const columnWrapClass = {
  true: "break-words",
  false: "whitespace-nowrap",
};

export interface TableActionType {
  resetRowSelection: () => void;
}

export type TableColumnProps<T> = ColumnDef<T> & {
  align?: "left" | "center" | "right";
  pin?: "left" | "right" | false;
  wordWrap?: boolean;
};

export interface TableProps<T> {
  tableActionRef?: RefObject<TableActionType>;
  columns: Array<TableColumnProps<T>>;
  rowSelection?: {
    single?: boolean;
    allowSelectAll?: boolean;
    onSelectionChange?: (rows: T[]) => void;
    bulkActions?: (rows: T[], isSelectedAll: boolean) => ActionProps[];
  };
  rowDraggable?: {
    id?: string;
    onRowDragEndChange?: (rows: T[]) => void;
  };
  data: T[];
  rowKey?: keyof T;
  bodyHeight?: number;
  loading?: boolean;
  onRow?: (record: T) => {
    onClick?: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
  };
}

export function Table<T>({
  tableActionRef,
  columns,
  data,
  rowKey,
  rowSelection,
  loading = false,
  bodyHeight,
  rowDraggable,
  onRow,
}: TableProps<T>): ReactElement {
  const tableHeaderRef = useRef<HTMLTableElement>(null);
  const tableFooterRef = useRef<HTMLTableElement>(null);

  const [displayData, setDisplayData] = useState<T[]>(data);

  const dataRowIds = useMemo<UniqueIdentifier[]>(
    () =>
      typeof rowKey !== "undefined"
        ? (displayData.map((row) => row[rowKey]) as UniqueIdentifier[])
        : [],
    [displayData, rowKey],
  );

  const [internalRowSelection, setInternalRowSelection] =
    useState<RowSelectionState>({});

  // 不是当前页的选中全部
  const [isRowSelectedAll, setIsRowSelectedAll] = useState(false);

  const hasBulkActions = useMemo(() => {
    return (
      typeof rowSelection?.bulkActions !== "undefined" &&
      rowSelection.bulkActions([], false).length !== 0
    );
  }, [rowSelection]);

  const memoColumns = useMemo(() => {
    const cloneColumns = cloneDeep(columns);

    if (typeof rowSelection !== "undefined") {
      cloneColumns.unshift({
        id: "ionia-ui-row-select",
        maxSize: 40,
        pin: cloneColumns.some(
          (column) =>
            typeof column.pin !== "undefined" &&
            typeof column.pin !== "boolean" &&
            ["left", "right"].includes(column.pin),
        )
          ? "left"
          : undefined,
        header: !(rowSelection.single ?? false)
          ? ({ table }) => {
              return (
                <Checkbox
                  checked={table.getIsAllRowsSelected()}
                  indeterminate={table.getIsSomeRowsSelected()}
                  label=""
                  onChange={table.getToggleAllRowsSelectedHandler()}
                />
              );
            }
          : undefined,
        cell: ({ row, table }) =>
          typeof rowSelection.single !== "undefined" && rowSelection.single ? (
            <Radio
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              label=""
              onChange={() => {
                table.setRowSelection({ [row.id]: true });
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          ) : (
            <Checkbox
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              label=""
              onChange={row.getToggleSelectedHandler()}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          ),
      });
    }

    if (typeof rowDraggable !== "undefined" && typeof rowKey !== "undefined") {
      cloneColumns.splice(typeof rowSelection !== "undefined" ? 1 : 0, 0, {
        id: "ionia-ui-drag-handle",
        pin: cloneColumns.some(
          (column) =>
            typeof column.pin !== "undefined" &&
            typeof column.pin !== "boolean" &&
            ["left", "right"].includes(column.pin),
        )
          ? "left"
          : undefined,
        maxSize: 52,
        cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
      });
    }

    return cloneColumns.map((column) =>
      typeof column.id === "undefined"
        ? {
            ...column,
            id: (column as AccessorKeyColumnDef<T>).accessorKey,
          }
        : column,
    );
  }, [columns, rowDraggable, rowKey, rowSelection]);

  const table = useReactTable({
    data: displayData,
    columns: memoColumns as Array<ColumnDef<T>>,
    state: {
      rowSelection: internalRowSelection,
      columnPinning: reduce(
        memoColumns.filter(
          (column) => typeof column.pin !== "undefined" && column.pin !== false,
        ),
        (acc: Record<string, string[]>, column) => {
          if (
            (column.pin === "left" || column.pin === "right") &&
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            !acc[column.pin]
          ) {
            acc[column.pin] = [];
          }

          acc[column.pin as keyof typeof column.pin].push(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            (column as AccessorKeyColumnDef<T>).id!,
          );

          return acc;
        },
        {},
      ),
    },
    enableRowSelection: typeof rowSelection !== "undefined",
    getCoreRowModel: getCoreRowModel(),
    getRowId:
      typeof rowKey !== "undefined"
        ? (row) => row[rowKey] as string
        : undefined,
    onRowSelectionChange: (updater) => {
      setInternalRowSelection((old) => {
        const newRowSelection =
          updater instanceof Function ? updater(old) : updater;

        rowSelection?.onSelectionChange?.(
          Object.keys(newRowSelection).map((key) => table.getRow(key).original),
        );

        setIsRowSelectedAll(false);

        return newRowSelection;
      });
    },
  });

  const columnsPinnedInfo = useMemo(() => {
    return groupBy(
      table.getHeaderGroups().map((headerGroup) =>
        headerGroup.headers
          .filter((header) => header.column.getIsPinned() !== false)
          .map((header) => ({
            direction: header.column.getIsPinned(),
            size: header.column.getSize(),
          })),
      )[0],
      "direction",
    );
  }, [table]);

  const getColumnPinedOffset = useCallback(
    (pinnedIndex: number, direction: "left" | "right") => {
      if (direction === "left") {
        return sum(
          columnsPinnedInfo.left.map((item) => item.size).slice(0, pinnedIndex),
        );
      }

      if (direction === "right") {
        return sum(
          columnsPinnedInfo.right
            .map((item) => item.size)
            .reverse()
            .slice(0, table.getRightLeafColumns().length - pinnedIndex - 1),
        );
      }
    },
    [columnsPinnedInfo, table],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (
        typeof rowKey !== "undefined" &&
        over != null &&
        active.id !== over.id
      ) {
        setDisplayData((oldData) => {
          const activeIndex = oldData.findIndex(
            (record) => record[rowKey] === active.id,
          );

          const overIndex = oldData.findIndex(
            (record) => record[rowKey] === over.id,
          );

          const result = arrayMove(oldData, activeIndex, overIndex);

          rowDraggable?.onRowDragEndChange?.(result);

          return result;
        });
      }
    },
    [rowDraggable, rowKey],
  );

  // 一些可以手动触发的特殊操作
  useImperativeHandle(
    tableActionRef,
    () => ({
      resetRowSelection: () => {
        table.resetRowSelection();
      },
    }),
    [table],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    }),
  );

  return (
    <DndContext
      id={rowDraggable?.id}
      modifiers={[restrictToVerticalAxis]}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <div
        className={twMerge(
          "min-w-full relative",
          loading && "overflow-hidden pointer-events-none select-none",
        )}
      >
        <div className="overflow-hidden" ref={tableHeaderRef}>
          <table className="w-full table-fixed">
            <thead className="relative border-b">
              {/* batch actions */}
              {!(rowSelection?.single ?? false) &&
                Object.keys(internalRowSelection).length > 0 &&
                hasBulkActions && (
                  <tr className="absolute z-[2] flex w-full items-center space-x-2 bg-white px-3 py-3">
                    <td>
                      <Checkbox
                        checked={table.getIsAllRowsSelected()}
                        indeterminate={
                          Object.keys(internalRowSelection).length > 0
                        }
                        label=""
                        onChange={table.getToggleAllRowsSelectedHandler()}
                      />
                    </td>

                    <td className="text-sm text-gray-500">
                      {isRowSelectedAll
                        ? "已选择全部"
                        : `已选择 ${
                            Object.keys(internalRowSelection).length
                          } 行`}
                    </td>

                    {typeof rowSelection?.allowSelectAll !== "undefined" &&
                      rowSelection.allowSelectAll && (
                        <td
                          className="cursor-pointer text-sm text-indigo-600 hover:text-indigo-400"
                          onClick={() => {
                            if (isRowSelectedAll) {
                              setIsRowSelectedAll(false);
                            } else {
                              table.toggleAllRowsSelected(true);

                              setTimeout(() => {
                                setIsRowSelectedAll(true);
                              });
                            }
                          }}
                        >
                          {isRowSelectedAll ? "取消" : "选择全部"}
                        </td>
                      )}

                    <td
                      className="flex space-x-2"
                      style={{ marginLeft: "auto" }}
                    >
                      {rowSelection
                        ?.bulkActions?.(
                          Object.keys(internalRowSelection).map(
                            (key) => table.getRow(key).original,
                          ),
                          isRowSelectedAll,
                        )
                        ?.map((action, index) => (
                          <div key={index}>
                            <Action {...action} size="sm" />
                          </div>
                        ))}
                    </td>
                  </tr>
                )}

              {table.getHeaderGroups().map((headerGroup) => (
                <tr className="relative" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        className={twMerge(
                          "px-3 py-3.5 whitespace-nowrap bg-white text-left text-sm font-semibold text-gray-900",
                          typeof (
                            header.column.columnDef as TableColumnProps<T>
                          )?.align !== "undefined" &&
                            columnAlignClass[
                              (header.column.columnDef as TableColumnProps<T>)
                                .align as keyof typeof columnAlignClass
                            ],
                          typeof (
                            header.column.columnDef as TableColumnProps<T>
                          )?.wordWrap !== "undefined" &&
                            columnWrapClass[
                              (header.column.columnDef as TableColumnProps<T>)
                                .wordWrap as unknown as keyof typeof columnWrapClass
                            ],
                          header.column.getIsPinned() !== false &&
                            "sticky bg-white z-[1]",
                          header.column.getIsPinned() === "left" &&
                            header.column.getPinnedIndex() ===
                              table.getLeftLeafColumns().length - 1 &&
                            "drop-shadow-[1px_0_0_#e5e7eb]",
                          header.column.getIsPinned() === "right" &&
                            header.column.getPinnedIndex() ===
                              table.getRightLeafColumns().length - 1 &&
                            "drop-shadow-[-1px_0_0_#e5e7eb]",
                        )}
                        key={header.id}
                        style={{
                          width: header.getSize(),
                          left:
                            header.column.getIsPinned() === "left" &&
                            columnsPinnedInfo.left?.length > 0
                              ? getColumnPinedOffset(
                                  header.column.getPinnedIndex(),
                                  "left",
                                )
                              : undefined,
                          right:
                            header.column.getIsPinned() === "right" &&
                            columnsPinnedInfo.right?.length > 0
                              ? getColumnPinedOffset(
                                  header.column.getPinnedIndex(),
                                  "right",
                                )
                              : undefined,
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
          </table>
        </div>

        <div
          className={twMerge(
            typeof bodyHeight !== "undefined"
              ? "overflow-auto"
              : "overflow-y-hidden",
          )}
          style={{
            height:
              typeof bodyHeight !== "undefined" ? `${bodyHeight}px` : undefined,
          }}
          onScroll={(e) => {
            const scrollLeft = (e.target as HTMLElement).scrollLeft;

            if (tableHeaderRef.current != null) {
              tableHeaderRef.current.scrollLeft = scrollLeft;
            }

            if (tableFooterRef.current != null) {
              tableFooterRef.current.scrollLeft = scrollLeft;
            }
          }}
        >
          <table className="w-full table-fixed">
            <tbody className="relative divide-y divide-gray-200">
              <SortableContext
                items={dataRowIds}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow<T>
                    columnsPinnedInfo={columnsPinnedInfo}
                    getColumnPinedOffset={getColumnPinedOffset}
                    key={row.id}
                    row={row}
                    rowKey={rowKey}
                    table={table}
                    onRow={onRow}
                  />
                ))}
              </SortableContext>
            </tbody>
          </table>
        </div>

        {table.getAllColumns().filter((item) => item.columnDef?.footer).length >
          0 && (
          <div className="overflow-hidden" ref={tableFooterRef}>
            <table className="w-full table-fixed border-t">
              <tfoot className="relative">
                {table.getFooterGroups().map((footerGroup) => (
                  <tr key={footerGroup.id}>
                    {footerGroup.headers.map((header) => (
                      <th
                        className={twMerge(
                          "break-words bg-white px-3 py-4 text-sm text-gray-500",
                          typeof (
                            header.column.columnDef as TableColumnProps<T>
                          )?.align !== "undefined"
                            ? columnAlignClass[
                                (header.column.columnDef as TableColumnProps<T>)
                                  .align as keyof typeof columnAlignClass
                              ]
                            : columnAlignClass.left,
                          typeof (
                            header.column.columnDef as TableColumnProps<T>
                          )?.wordWrap !== "undefined" &&
                            columnWrapClass[
                              (header.column.columnDef as TableColumnProps<T>)
                                .wordWrap as unknown as keyof typeof columnWrapClass
                            ],
                          header.column.getIsPinned() !== false &&
                            "sticky bg-white z-[1]",
                          header.column.getIsPinned() === "left" &&
                            header.column.getPinnedIndex() ===
                              table.getLeftLeafColumns().length - 1 &&
                            "drop-shadow-[1px_0_0_#e5e7eb]",
                          header.column.getIsPinned() === "right" &&
                            header.column.getPinnedIndex() ===
                              table.getRightLeafColumns().length - 1 &&
                            "drop-shadow-[-1px_0_0_#e5e7eb]",
                        )}
                        key={header.id}
                        style={{
                          width: header.column.getSize(),
                          left:
                            header.column.getIsPinned() === "left" &&
                            columnsPinnedInfo.left?.length > 0
                              ? getColumnPinedOffset(
                                  header.column.getPinnedIndex(),
                                  "left",
                                )
                              : undefined,
                          right:
                            header.column.getIsPinned() === "right" &&
                            columnsPinnedInfo.right?.length > 0
                              ? getColumnPinedOffset(
                                  header.column.getPinnedIndex(),
                                  "right",
                                )
                              : undefined,
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext(),
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </tfoot>
            </table>
          </div>
        )}

        {loading && (
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <Spinner size="lg" />
          </div>
        )}
      </div>
    </DndContext>
  );
}
