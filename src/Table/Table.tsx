import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cloneDeep, groupBy, sum } from "lodash";
import {
  type ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

import { Action, type ActionProps } from "../Action";
import { Checkbox } from "../Checkbox";
import { Radio } from "../Radio";
import { Spinner } from "../Spinner";

const columnAlignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const columnWrapClass = {
  true: "break-words",
  false: "whitespace-nowrap",
};

export type TableColumnProps<T> = ColumnDef<T> & {
  align?: "left" | "center" | "right";
  pin?: "left" | "right" | false;
  wordWrap?: boolean;
};

export interface TableProps<T> {
  columns: Array<TableColumnProps<T>>;
  enableRowSelection?: boolean;
  singleSelection?: boolean;
  bulkActions?: ActionProps[];
  selectedItemsCountLabel?: string;
  data: T[];
  bodyHeight?: number;
  loading?: boolean;
  onRow?: (record: T) => {
    onClick?: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
  };
  onRowSelectionChange?: (rows: T[]) => void;
}

export function Table<T>({
  columns,
  data,
  enableRowSelection = false,
  singleSelection = false,
  selectedItemsCountLabel,
  bulkActions = [],
  bodyHeight,
  loading,
  onRow,
  onRowSelectionChange,
}: TableProps<T>): ReactElement {
  const batchActionTableHeaderRowRef = useRef<HTMLTableRowElement>(null);
  const tableHeaderRef = useRef<HTMLTableElement>(null);
  const tableFooterRef = useRef<HTMLTableElement>(null);

  const [rowSelection, setRowSelection] = useState<Record<string, any>>({});
  const [columnPinning, setColumnPinning] = useState({});

  const memoColumns = useMemo(() => {
    const cloneColumns = cloneDeep(columns);

    if (enableRowSelection) {
      cloneColumns.unshift({
        id: "rowSelect",
        size: 34,
        pin: cloneColumns.some(
          (column) =>
            typeof column.pin !== "undefined" &&
            typeof column.pin !== "boolean" &&
            ["left", "right"].includes(column.pin),
        )
          ? "left"
          : undefined,
        header: !singleSelection
          ? ({ table }) => {
              return (
                <Checkbox
                  {...{
                    label: "",
                    indeterminate: Object.keys(rowSelection).length > 0,
                    checked: table.getIsAllRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                  }}
                />
              );
            }
          : undefined,
        cell: ({ row, table }) =>
          singleSelection ? (
            <Radio
              {...{
                label: "",
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                onChange: () => {
                  table.setRowSelection({ [row.id]: true });
                },
              }}
            />
          ) : (
            <Checkbox
              {...{
                label: "",
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          ),
      });
    }

    return cloneColumns.map((column) =>
      typeof column.id === "undefined"
        ? {
            ...column,
            id: (column as any).accessorKey,
          }
        : column,
    );
  }, [columns, enableRowSelection, rowSelection, singleSelection]);

  const table = useReactTable({
    data,
    columns: memoColumns,
    state: { rowSelection, columnPinning },
    enableRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnPinningChange: setColumnPinning,
  });

  const columnsPinnedInfo = groupBy(
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

  useEffect(() => {
    if (enableRowSelection) {
      onRowSelectionChange?.(
        table.getSelectedRowModel().flatRows.map((item) => item.original),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, enableRowSelection, rowSelection]);

  useEffect(() => {
    memoColumns
      .filter(
        (column) =>
          typeof column.pin !== "undefined" &&
          typeof column.pin !== "boolean" &&
          ["left", "right"].includes(column.pin),
      )
      .forEach((column) => {
        if (typeof column.pin !== "undefined") {
          table.getColumn(column.id)?.pin(column.pin);
        }
      });
  }, [memoColumns, table]);

  return (
    <div
      className={twMerge(
        "min-w-full relative",
        loading === true && "overflow-hidden pointer-events-none select-none",
      )}
    >
      <div className="overflow-hidden" ref={tableHeaderRef}>
        <table className="w-full table-fixed">
          <thead className="relative border-b">
            {/* batch actions */}
            {!singleSelection &&
              Object.keys(rowSelection).length > 0 &&
              bulkActions.length > 0 && (
                <tr
                  className="absolute z-[2] flex w-full items-center space-x-2 border-b bg-white px-3 py-3.5"
                  ref={batchActionTableHeaderRowRef}
                >
                  <td className="h-[28px]">
                    <Checkbox
                      {...{
                        label: "",
                        indeterminate: Object.keys(rowSelection).length > 0,
                        checked: table.getIsAllRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler(),
                      }}
                    />
                  </td>

                  {typeof selectedItemsCountLabel !== "undefined" && (
                    <td className="text-sm text-gray-500">
                      {selectedItemsCountLabel}
                    </td>
                  )}

                  <td className="flex space-x-0.5">
                    {bulkActions?.map((action, index) => (
                      <Action key={index} {...action} link />
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
                        typeof (header.column.columnDef as TableColumnProps<T>)
                          ?.align !== "undefined" &&
                          columnAlignClass[
                            (header.column.columnDef as TableColumnProps<T>)
                              .align as keyof typeof columnAlignClass
                          ],
                        typeof (header.column.columnDef as TableColumnProps<T>)
                          ?.wordWrap !== "undefined" &&
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
            {table.getRowModel().rows.map((row) => (
              <tr
                className={twMerge(
                  "bg-white group hover:bg-gray-50",
                  onRow != null && "cursor-pointer",
                )}
                key={row.id}
                onClick={(e) => {
                  onRow?.(row.original)?.onClick?.(e);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    className={twMerge(
                      "break-words group-hover:bg-gray-50 bg-white px-3 py-4 text-sm text-gray-500",
                      typeof (cell.column.columnDef as TableColumnProps<T>)
                        ?.align !== "undefined" &&
                        columnAlignClass[
                          (cell.column.columnDef as TableColumnProps<T>)
                            .align as keyof typeof columnAlignClass
                        ],
                      typeof (cell.column.columnDef as TableColumnProps<T>)
                        ?.wordWrap !== "undefined" &&
                        columnWrapClass[
                          (cell.column.columnDef as TableColumnProps<T>)
                            .wordWrap as unknown as keyof typeof columnWrapClass
                        ],
                      cell.column.getIsPinned() !== false && "sticky z-[1]",
                      cell.column.getIsPinned() === "left" &&
                        cell.column.getPinnedIndex() ===
                          table.getLeftLeafColumns().length - 1 &&
                        "drop-shadow-[1px_0_0_#e5e7eb]",
                      cell.column.getIsPinned() === "right" &&
                        cell.column.getPinnedIndex() ===
                          table.getRightLeafColumns().length - 1 &&
                        "drop-shadow-[-1px_0_0_#e5e7eb]",
                    )}
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      left:
                        cell.column.getIsPinned() === "left" &&
                        columnsPinnedInfo.left?.length > 0
                          ? getColumnPinedOffset(
                              cell.column.getPinnedIndex(),
                              "left",
                            )
                          : undefined,
                      right:
                        cell.column.getIsPinned() === "right" &&
                        columnsPinnedInfo.right?.length > 0
                          ? getColumnPinedOffset(
                              cell.column.getPinnedIndex(),
                              "right",
                            )
                          : undefined,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
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
                        typeof (header.column.columnDef as TableColumnProps<T>)
                          ?.align !== "undefined"
                          ? columnAlignClass[
                              (header.column.columnDef as TableColumnProps<T>)
                                .align as keyof typeof columnAlignClass
                            ]
                          : columnAlignClass.left,
                        typeof (header.column.columnDef as TableColumnProps<T>)
                          ?.wordWrap !== "undefined" &&
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

      {loading === true && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <Spinner size="lg" />
        </div>
      )}
    </div>
  );
}
