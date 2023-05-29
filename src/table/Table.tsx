import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { type ReactElement, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { Spinner } from "../spinner";

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
  data: T[];
  bodyHeight?: number;
  loading?: boolean;
}

export function Table<T>({
  columns,
  data,
  bodyHeight,
  loading,
}: TableProps<T>): ReactElement {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableHeaderRef = useRef<HTMLTableElement>(null);
  const tableFooterRef = useRef<HTMLTableElement>(null);

  return (
    <div className="min-w-full">
      <div className="loading relative">
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
                            ]
                        )}
                        key={header.id}
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
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
              : "overflow-x-auto overflow-y-scroll",
            typeof bodyHeight !== "undefined" && `h-[${bodyHeight}px]`
          )}
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
                <tr key={row.id}>
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
                          ]
                      )}
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
                            ]
                        )}
                        key={header.id}
                        style={{ width: header.column.getSize() }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext()
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
    </div>
  );
}
