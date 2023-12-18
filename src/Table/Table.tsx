import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cloneDeep } from "lodash";
import { type ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Checkbox } from "../Checkbox";
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
  wordWrap?: boolean;
};

export interface TableProps<T> {
  columns: Array<TableColumnProps<T>>;
  enableRowSelection?: boolean;
  data: T[];
  bodyHeight?: number;
  loading?: boolean;
  onRow?: (record: T) => {
    onClick?: (e: MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
  };
  onRowSelectionChange?: (rows: T[]) => void;
}

export function Table<T>({
  columns,
  data,
  enableRowSelection = false,
  bodyHeight,
  loading,
  onRow,
  onRowSelectionChange,
}: TableProps<T>): ReactElement {
  const tableHeaderRef = useRef<HTMLTableElement>(null);
  const tableFooterRef = useRef<HTMLTableElement>(null);

  const [rowSelection, setRowSelection] = useState<Record<string, any>>({});

  const memoColumns = useMemo(() => {
    const cloneColumns = cloneDeep(columns);

    if (enableRowSelection) {
      cloneColumns.unshift({
        id: "rowSelect",
        size: 34,
        header: ({ table }) => {
          const hasRowSelected = Object.keys(rowSelection).length > 0;

          return (
            <div
              className={twMerge(
                hasRowSelected &&
                  "absolute inset-0 pl-3 h-full w-full bg-red-500 flex items-center",
              )}
            >
              <Checkbox
                {...{
                  label: "",
                  checked: table.getIsAllRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler(),
                }}
              />

              {hasRowSelected && <div className="font-normal">123</div>}
            </div>
          );
        },
        cell: ({ row }) => (
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

    return cloneColumns;
  }, [columns, enableRowSelection, rowSelection]);

  const table = useReactTable({
    data,
    columns: memoColumns,
    state: { rowSelection },
    enableRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
  });

  useEffect(() => {
    if (onRowSelectionChange != null) {
      onRowSelectionChange(
        table.getSelectedRowModel().flatRows.map((item) => item.original),
      );
    }
  }, [table, rowSelection, onRowSelectionChange]);

  return (
    <div className="min-w-full">
      <div className="overflow-hidden">
        <table className="w-full table-fixed" ref={tableHeaderRef}>
          <thead className="t-0 sticky border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                className={twMerge(
                  Object.keys(rowSelection).length > 0 && "relative",
                )}
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className={twMerge(
                        "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
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
                      )}
                      key={header.id}
                      style={{ width: header.getSize() }}
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
          loading === true
            ? "overflow-hidden pointer-events-none select-none"
            : "overflow-x-auto overflow-y-auto",
        )}
        style={{
          height:
            typeof bodyHeight !== "undefined" ? `${bodyHeight}px` : undefined,
        }}
        onScroll={(e) => {
          const scrollLeft = (e.target as HTMLElement).scrollLeft;

          if (tableHeaderRef.current != null) {
            tableHeaderRef.current.style.transform = `translateX(-${scrollLeft}px)`;
          }
          if (tableFooterRef.current != null) {
            tableFooterRef.current.style.transform = `translateX(-${scrollLeft}px)`;
          }
        }}
      >
        <table className="w-full table-fixed">
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr
                className={twMerge(
                  "hover:bg-gray-50",
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
                      "break-words px-3 py-4 text-sm text-gray-500",
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
                    )}
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
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
        <div className="overflow-hidden">
          <table className="w-full table-fixed" ref={tableFooterRef}>
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th
                      className={twMerge(
                        "break-words px-3 py-4 text-sm text-gray-500",
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
                      )}
                      key={header.id}
                      style={{ width: header.column.getSize() }}
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
