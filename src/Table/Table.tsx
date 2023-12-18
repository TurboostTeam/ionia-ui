import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { type ReactElement, useMemo, useRef, useState } from "react";
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
}

export function Table<T>({
  columns,
  data,
  enableRowSelection = false,
  bodyHeight,
  loading,
  onRow,
}: TableProps<T>): ReactElement {
  const [rowSelection, setRowSelection] = useState({});

  const memoColumns = useMemo(() => {
    if (enableRowSelection) {
      columns.unshift({
        id: "rowSelect",
        size: 34,
        header: ({ table }) => (
          <Checkbox
            {...{
              label: "",
              checked: table.getIsAllRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
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

    return columns;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableRowSelection]);

  const table = useReactTable({
    data,
    columns: memoColumns,
    state: { rowSelection },
    enableRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
  });

  console.log(111, rowSelection);

  const tableHeaderRef = useRef<HTMLTableElement>(null);
  const tableFooterRef = useRef<HTMLTableElement>(null);

  return (
    <div className="min-w-full">
      <div className="overflow-hidden">
        <table className="w-full table-fixed" ref={tableHeaderRef}>
          <thead className="t-0 sticky border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
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
